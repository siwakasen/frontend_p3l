import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Box, Grid, Typography, Button, Select, MenuItem } from "@mui/material";
import { API_URL, API_URL_IMAGE } from "@/utils/constants";
import CustomCheckbox from "@/components/shared/CustomCheckbox";
import { getCart } from "@/services/pesanan/pesanan";
import { getSingleProduk } from "@/services/produk/produk";
import { getSingleHampers } from "@/services/hampers/hampers";
import { getLimitByDate } from "@/services/limit/limit";
import Link from "next/link";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Toast from "@/components/shared/Toast";
import { useRouter } from "next/navigation";

export const Cart = () => {
  const [limit, setLimit] = useState();
  const [cart, setCart] = useState(null);
  const [produk, setProduk] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [limitHampers, setLimitHampers] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const { toastWarning } = Toast();

  const datePickerRef = useRef(null);
  const [buttonHeight, setButtonHeight] = useState("auto");
  const [date, setDate] = useState(dayjs().startOf("day").add(2, "day"));

  const findIsAllReady = () => {
    if (checklist.length === 0) return false;
    return checklist.every((item) => {
      if (item.stok > 0) return true;
      else return false;
    });
  };

  const findIsAvailReadyPO = () => {
    if (checklist.length === 0) return false;
    let isAvailReadyPO = checklist.every((item) => {
      if (item.stok > 0 && item.kouta > 0) {
        return true;
      }
    });

    return isAvailReadyPO;
  };

  const findIsOnlyPO = () => {
    if (checklist.length === 0) return false;
    return checklist.some((item) => {
      if (item.stok === 0 && item.kouta > 0) return true;
      else return false;
    });
  };

  useEffect(() => {
    const isAvailReadyPO = findIsAvailReadyPO();
    const isOnlyPO = findIsOnlyPO();
    const isAllReady = findIsAllReady();

    setSelectValue(
      isAvailReadyPO ? "" : isOnlyPO ? "PO" : isAllReady ? "Ready" : ""
    );
  }, [checklist]);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      setCart(cart?.data?.data?.detail_pesanan);
    };
    const fetchLimit = async () => {
      const limit = await getLimitByDate(
        date == null
          ? dayjs().startOf("day").add(2, "day").format("YYYY-MM-DD")
          : date.format("YYYY-MM-DD")
      );
      setLimit(limit.data);
    };

    if (datePickerRef.current) {
      setButtonHeight(datePickerRef.current.clientHeight);
    }
    fetchCart();
    fetchLimit();
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      if (cart?.length > 0) {
        const productPromises = cart.map(async (item) => {
          if (item.id_produk && item.id_hampers == undefined) {
            const data = await getSingleProduk(item.id_produk);
            return data;
          } else if (item.id_hampers && item.id_produk == undefined) {
            const data = await getSingleHampers(item.id_hampers);
            return data;
          }
        });

        const product = await Promise.all(productPromises);
        setProduk(product);
      }
    };

    fetchData();
  }, [cart]);

  function handleChangeDate(e) {
    setDate(e);
  }

  function handleChecklist(id_produk, id_hampers, id_kategori, stok) {
    let kouta;
    const isExist = checklist.find(
      (item) => item.id_produk === id_produk && item.id_hampers === id_hampers
    );
    if (id_kategori != 4 && id_produk != null) {
      kouta = getKoutaByDate(id_produk) || "0";
    }

    if (isExist) {
      const newChecklist = checklist.filter((item) => item !== isExist);
      setChecklist(newChecklist);
    } else {
      setChecklist((prev) => [
        ...prev,
        { id_produk, id_hampers, id_kategori, stok, kouta },
      ]);
    }
  }

  function handleCheckout() {
    let produkParams = checklist
      .map((item) => item.id_produk)
      .filter((id_produk) => id_produk !== null)
      .toString();

    let hampersParams = checklist
      .map((item) => item.id_hampers)
      .filter((id_hampers) => id_hampers !== null)
      .toString();

    return `?${
      produkParams.length === 0
        ? ""
        : `produk=${produkParams
            .split(",")
            .filter((item) => item !== "")
            .join("+")}`
    }${
      hampersParams.length === 0
        ? ""
        : produkParams.length !== 0
        ? `&hampers=${hampersParams
            .split(",")
            .filter((item) => item !== "")
            .join("+")}`
        : `hampers=${hampersParams
            .split(",")
            .filter((item) => item !== "")
            .join("+")}`
    }&date=${date.format(
      "YYYY-MM-DD"
    )}&statusPesanan=${selectValue}&isCart=true`;
  }

  function getKoutaByDate(id_produk) {
    const data = limit?.find((item) => item.id_produk === id_produk);
    return data?.limit ?? 0;
  }

  function getKoutaHampers(detail_hampers, date) {
    let minLimit = [];

    detail_hampers?.forEach((detail, index) => {
      const produk = detail.produk;
      if (produk && produk.limit_produk) {
        const limitDate = produk.limit_produk.find(
          (limit) => limit.tanggal == date
        );
        minLimit[index] = limitDate?.limit ?? 0;
      }
    });

    return minLimit;
  }

  function isDisable(item) {
    let result;


    if (item.data.id_kategori != 4 && item.data.id_produk) {
      if (item.data?.stok_produk > 0) {
        result = false;
      } else if (getKoutaByDate(item?.data.id_produk) > 0) {
        result = false;
      } else if (getKoutaByDate(item?.data.id_produk) === 0) {
        result = true;
      } else if (item.data?.stok_produk === 0) {
        result = true;
      } else {
        result = false;
      }
    } else if (item.data.id_hampers) {
      if (
        Math.min(
          ...getKoutaHampers(
            item.data.detail_hampers,
            date.format("YYYY-MM-DD")
          )
        ) > 0
      ) {
        result = false;
      } else {
        result = true;
      }
    } else {
      result = false;
    }

    return result;
  }

  function compareDate(date) {
    return date.isBefore(dayjs().startOf("day").add(2, "day"));
  }

  function handleSelectedValue(e) {
    setSelectValue(e.target.value);
  }

  console.log(checklist);
  console.log(selectValue);
  // console.log(compareDate(date));

  return (
    produk && (
      <Grid container item spacing={1} md={9} lg={9}>
        <Grid container item lg={12} xs={12}>
          <Grid container item>
            <Grid item lg={12} md={12} xs={12}>
              <Typography variant="h4" fontWeight={600} mb={1}>
                Keranjang Belanja
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} xs={12} mb={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "#DFE5EF solid 1px",
                  p: "1rem",
                  gap: 2,
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          ref={datePickerRef}
                          shouldDisableDate={(date) =>
                            findIsAllReady()
                              ? date.isBefore(dayjs().startOf("day"))
                              : date.isBefore(
                                  dayjs().startOf("day").add(2, "day")
                                )
                          }
                          value={date}
                          onChange={handleChangeDate}
                          sx={{ pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>

                  <Grid item>
                    <Select
                      disabled={checklist.length === 0 ? true : false}
                      placeholder="Pilih jenis pesanan"
                      value={selectValue}
                      onChange={handleSelectedValue}
                      sx={{ height: buttonHeight, mt: 1, width: "100px" }}
                    >
                      <MenuItem hidden value=""></MenuItem>
                      <MenuItem value="PO">PO</MenuItem>
                      <MenuItem value="Ready">Ready</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Button
                  disabled={
                    checklist.length === 0
                      ? true
                      : selectValue === null
                      ? true
                      : false
                  }
                  sx={{ height: buttonHeight }}
                >
                  <Link href={`/checkout` + handleCheckout()} sx={{ pt: 0 }}>
                    Checkout
                  </Link>
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid container item rowSpacing={2}>
            {produk.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    p: "1rem",
                    border: "#DFE5EF solid 1px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CustomCheckbox
                      onClick={() =>
                        handleChecklist(
                          item.data.id_produk ?? null,
                          item.data.id_hampers ?? null,
                          item.data.id_kategori ?? 5,
                          item.data.stok_produk ? item.data.stok_produk : 0
                        )
                      }
                      disabled={isDisable(item, selectValue)}
                    />
                    <Box
                      sx={{
                        width: "80px",
                        height: "80px",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={
                          API_URL_IMAGE +
                          (item.data.foto_produk || item.data.foto_hampers)
                        }
                        fill
                        sizes="100%"
                        className="bg-slate-700"
                        style={{ objectFit: "cover", borderRadius: 8 }}
                        alt="produk"
                        priority
                      />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6" fontWeight="600">
                        {item.data.nama_produk || item.data.nama_hampers}
                      </Typography>
                      {item.data.id_kategori != 4 ? (
                        item.data.id_hampers ? (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontSize: "12px" }}
                            >
                              Kuota :{" "}
                              {Math.min(
                                ...getKoutaHampers(
                                  item.data.detail_hampers,
                                  date.format("YYYY-MM-DD")
                                )
                              )}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontSize: "12px" }}
                            >
                              Kuota :{" "}
                              {getKoutaByDate(item?.data.id_produk) || "0"}
                            </Typography>

                            <Typography
                              variant="subtitle2"
                              sx={{ fontSize: "12px" }}
                            >
                              Stok : {item.data.stok_produk}
                            </Typography>
                          </>
                        )
                      ) : (
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "12px" }}
                        >
                          Ready Stok
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <Typography variant="subtitle2">
                        Rp.{" "}
                        {Intl.NumberFormat("id-ID").format(
                          item.data.harga_produk || item.data.harga_hampers
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

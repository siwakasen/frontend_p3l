import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Divider,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  ButtonGroup,
} from "@mui/material";

import TextFormField from "@/components/auth/shared/TextFormField";
import CustomSwitch from "@/components/shared/CustomSwitch";
import CustomFormLabel from "@/components/auth/shared/LabelFormField";
import Image from "next/image";
import { API_URL_IMAGE } from "@/utils/constants";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { getAlamatUser } from "@/services/data-customer/dataCustomer";
import { getProfile } from "@/services/user/profile/profile";
import Toast from "@/components/shared/Toast";
import { checkout } from "@/services/pesanan/pesanan";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/layout";

export const Checkout = ({ produk, user, date, isCart, statusPesanan }) => {
  const item = produk;
  const router = useRouter();
  const [datePesanan, setDatePesanan] = useState(dayjs(date));
  const { toastError, toastWarning, toastSuccess } = Toast();
  const [alamat, setAlamat] = useState([]);
  const [profile, setProfile] = useState();
  const [isPoin, setIsPoin] = useState(false);
  const [data, setData] = useState();
  const { change, setChange } = useContext(UserContext);

  // console.log(data);

  useEffect(() => {
    async function fetchDataAlamat() {
      const response = await getAlamatUser(user?.id);
      setAlamat(response.data);
    }
    async function fetchDataProfile() {
      const response = await getProfile();
      setProfile(response.data);
    }

    fetchDataAlamat().then(() => fetchDataProfile());

    let total_harga = 0;
    item.forEach((e) => {
      total_harga += e.data.harga_hampers || e.data.harga_produk;
    });

    setData({
      detail_pesanan: item?.map((_item) => {
        const harga = _item.data.harga_produk ?? _item.data.harga_hampers;
        const jumlah = _item.jumlah ?? 1;
        return {
          id_produk: _item.data.id_produk ?? null,
          id_hampers: _item.data.id_hampers ?? null,
          jumlah: jumlah,
          subtotal: harga * jumlah,
          status_pesanan: "PO",
        };
      }),
      total_harga: total_harga,
      poin_didapat: calculatePoint(total_harga),
      tanggal_diambil: datePesanan
        ? dayjs(date).format("YYYY-MM-DD HH:mm:ss")
        : datePesanan,
    });
    setDatePesanan(dayjs(date));
  }, [user, item]);

  function handleChangeInput(e) {
    if (e.$d !== undefined) {
      const parsedDate = dayjs(e.$d).format("YYYY-MM-DD HH:mm:ss");
      setData({
        ...data,
        ["tanggal_diambil"]: parsedDate,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  }

  const incrementJumlah = (id, type) => {
    const newDetailPesanan = data.detail_pesanan.map((item) => {
      if (
        (type === "produk" && item.id_produk === id) ||
        (type === "hampers" && item.id_hampers === id)
      ) {
        const newJumlah = item.jumlah + 1;
        const harga =
          type === "produk"
            ? produk.find((e) => e.data.id_produk === id).data.harga_produk
            : produk.find((e) => e.data.id_hampers === id).data.harga_hampers;
        return { ...item, jumlah: newJumlah, subtotal: newJumlah * harga };
      }
      return item;
    });
    const newData = { ...data, detail_pesanan: newDetailPesanan };
    delete newData.poin_dipakai;
    setData({
      ...newData,
      total_harga: calculateSubtotal(newData),
      poin_didapat: calculatePoint(calculateSubtotal(newData)),
    });
    setIsPoin(false);
  };

  const decrementJumlah = (id, type) => {
    const newDetailPesanan = data.detail_pesanan.map((item) => {
      if (
        (type === "produk" && item.id_produk === id) ||
        (type === "hampers" && item.id_hampers === id)
      ) {
        const newJumlah = item.jumlah > 1 ? item.jumlah - 1 : 1;
        const harga =
          type === "produk"
            ? produk.find((e) => e.data.id_produk === id).data.harga_produk
            : produk.find((e) => e.data.id_hampers === id).data.harga_hampers;
        return { ...item, jumlah: newJumlah, subtotal: newJumlah * harga };
      }
      return item;
    });
    const newData = { ...data, detail_pesanan: newDetailPesanan };
    delete newData.poin_dipakai;
    setData({
      ...newData,
      total_harga: calculateSubtotal(newData),
      poin_didapat: calculatePoint(calculateSubtotal(newData)),
    });
    setIsPoin(false);
  };

  const calculateSubtotal = (_data) => {
    return _data?.detail_pesanan.reduce((acc, item) => acc + item.subtotal, 0);
  };

  const cekUltah = (tanggal_pesanan, tanggal_lahir) => {
    const newUltah = new Date(
      tanggal_pesanan.getFullYear(),
      tanggal_lahir.getMonth(),
      tanggal_lahir.getDate()
    );

    const hMin3 = new Date(newUltah);
    hMin3.setDate(newUltah.getDate() - 3);

    const hPlus3 = new Date(newUltah);
    hPlus3.setDate(newUltah.getDate() + 3);

    return tanggal_pesanan >= hMin3 && tanggal_pesanan <= hPlus3;
  };

  const calculatePoint = (_subtotal) => {
    let subtotal = _subtotal;
    let point = 0;
    if (subtotal >= 1000000) {
      point = point + 200 * Math.floor(subtotal / 1000000);
      subtotal = subtotal % 1000000;
    }
    if (subtotal >= 500000) {
      point = point + 75 * Math.floor(subtotal / 500000);
      subtotal = subtotal % 500000;
    }
    if (subtotal >= 100000) {
      point = point + 15 * Math.floor(subtotal / 100000);
      subtotal = subtotal % 100000;
    }
    if (subtotal >= 10000) {
      point = point + 1 * Math.floor(subtotal / 10000);
      subtotal = subtotal % 10000;
    }
    const isDouble = cekUltah(new Date(), new Date(user?.tanggal_lahir));
    if (isDouble) point = point * 2;

    return point;
  };

  const handleIsTukarPoin = () => {
    setIsPoin(!isPoin);

    if (!isPoin) {
      setData((prev) => ({
        ...prev,
        poin_dipakai: profile?.data.poin,
        total_harga: prev.total_harga - profile?.data.poin * 100,
      }));
    } else {
      setData((prev) => {
        const updatedData = { ...prev };
        updatedData.total_harga += updatedData.poin_dipakai * 100;
        delete updatedData.poin_dipakai;
        return updatedData;
      });
    }
  };

  const handleTukarPoin = (e) => {
    if (e.target.value > profile?.data.poin)
      return toastWarning("Poin tidak cukup");
    else if (e.target.value < 1) return toastError("Poin tidak boleh kurang 1");
    else
      return setData((prev) => {
        const diffPoin = e.target.value - prev.poin_dipakai;
        return {
          ...prev,
          poin_dipakai: e.target.value,
          total_harga: prev.total_harga - diffPoin * 100,
        };
      });
  };

  const handlePesan = () => {
    if (
      data.metode_pemesanan === undefined ||
      data.metode_pengiriman === undefined
    )
      return toastWarning("Data belum lengkap");

    const dataPesanan = {
      ...data,
      id_user: user?.id,
      status_transaksi: data.metode_pengiriman === "Pick Up"
        ? "Menunggu Pembayaran"
        : "Menunggu Konfirmasi Pesanan",
      tanggal_pesanan: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    checkout(dataPesanan, isCart, statusPesanan).then((res) => {
      // console.log(res);
      if (res.code === 200) {
        toastSuccess("Pesanan berhasil dibuat");
        router.push("/user/menunggu-pembayaran");
        setChange((prev) => !prev);
      } else {
        toastError("Pesanan gagal dibuat");
      }
    });
  };

  // console.log(isCart);
  console.log(data);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Box sx={{ width: "100%", border: "#DFE5EF solid 1px", p: "1rem" }}>
          <Typography variant="h2" fontWeight="600">
            Checkout Pesanan
          </Typography>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel
                htmlFor="tanggal_diambil"
                sx={{ mt: 2, fontWeight: "400" }}
              >
                Tanggal Ambil Pesanan
              </CustomFormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]} sx={{ pt: 0 }}>
                  <DateTimePicker
                    shouldDisableDate={(date) =>
                      !date.isSame(datePesanan, "day")
                    }
                    id="tanggal_diambil"
                    name="tanggal_diambil"
                    value={
                      data?.tanggal_diambil
                        ? dayjs(data.tanggal_diambil)
                        : datePesanan
                    }
                    onChange={handleChangeInput}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel
                htmlFor="metode_pemesanan"
                sx={{ mt: 2, fontWeight: "400" }}
              >
                Metode Pembayaran
              </CustomFormLabel>
              <Select
                defaultValue="Transfer"
                fullWidth
                variant="outlined"
                id="metode_pemesanan"
                name="metode_pemesanan"
                value={data?.metode_pemesanan || ""}
                onChange={handleChangeInput}
              >
                <MenuItem value="Transfer">Transfer</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel
                htmlFor="metode_pengiriman"
                sx={{ mt: 2, fontWeight: "400" }}
              >
                Metode Pengiriman
              </CustomFormLabel>
              <Select
                fullWidth
                variant="outlined"
                id="metode_pengiriman"
                name="metode_pengiriman"
                value={data?.metode_pengiriman || ""}
                onChange={handleChangeInput}
              >
                <MenuItem value="Pick Up">Pick Up</MenuItem>
                <MenuItem value="Pick Up Ojek Online">
                  Pick Up Ojek Online
                </MenuItem>
                <MenuItem value="Pengantaran Kurir Toko">
                  Pengantaran Kurir Toko
                </MenuItem>
              </Select>
            </Grid>
            {data?.metode_pengiriman === "Pengantaran Kurir Toko" && (
              <Grid item xs={12} lg={6}>
                <CustomFormLabel
                  htmlFor="alamat_pengiriman"
                  sx={{ mt: 2, fontWeight: "400" }}
                >
                  Alamat Pengiriman
                </CustomFormLabel>
                <Select
                  fullWidth
                  variant="outlined"
                  id="alamat_pengiriman"
                  name="alamat_pengiriman"
                  value={data?.alamat_pengiriman || ""}
                  onChange={handleChangeInput}
                >
                  {alamat?.map((item, index) => (
                    <MenuItem key={index} value={item.alamat}>
                      {item.alamat}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Box component="div" className="border p-4 flex flex-col gap-2">
          {item?.map((item, index) => (
            <Box
              key={index}
              component="div"
              className="flex gap-2 items-center justify-between"
            >
              <Box component="div" className="flex gap-2 items-center">
                <Box
                  component="div"
                  className="w-16 h-16 bg-slate-200 relative"
                >
                  <Image
                    src={
                      API_URL_IMAGE +
                      (item.data.foto_produk || item.data.foto_hampers)
                    }
                    fill
                    sizes="100%"
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    alt="product-image"
                  />
                </Box>
                <Box component="div">
                  <Typography sx={{ m: 0, fontSize: "12px" }}>Cake</Typography>
                  <Typography sx={{ m: 0 }} fontWeight="600" variant="h6">
                    {item.data.nama_produk || item.data.nama_hampers}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <ButtonGroup
                  size="small"
                  color="secondary"
                  aria-label="small button group"
                  sx={{
                    "& .MuiButton-root": {
                      minWidth: "24px",
                      padding: "4px",
                      fontSize: "0.75rem",
                    },
                  }}
                >
                  <Button
                    key="one"
                    onClick={() =>
                      decrementJumlah(
                        item.data.id_produk ?? item.data.id_hampers,
                        item.data.id_produk !== undefined ? "produk" : "hampers"
                      )
                    }
                  >
                    <IconMinus size="1.1rem" />
                  </Button>
                  <Button key="two">
                    {data.detail_pesanan[index]?.jumlah}
                  </Button>
                  <Button
                    key="three"
                    onClick={() => {
                      incrementJumlah(
                        item.data.id_produk ?? item.data.id_hampers,
                        item.data.id_produk !== undefined ? "produk" : "hampers"
                      );
                    }}
                  >
                    <IconPlus size="1.1rem" />
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          ))}

          <Grid container mt={2}>
            <Grid item xs={12} my={1}>
              <Divider></Divider>
            </Grid>
            <Grid item xs={12}>
              <Box className="w-full flex justify-between items-center ">
                <Typography>Tukar poin</Typography>
                <CustomSwitch
                  checked={isPoin}
                  disabled={profile?.data.poin === 0}
                  disableRipple
                  onChange={handleIsTukarPoin}
                />
              </Box>
            </Grid>
            {isPoin && (
              <Grid item xs={12}>
                <TextFormField
                  onChange={handleTukarPoin}
                  value={data?.poin_dipakai}
                  type="number"
                  fullWidth
                  sx={{ pr: "12px", mb: "8px" }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Box className="flex justify-between items-center pr-3">
                <Typography fontWeight="400">Poin didapat</Typography>
                <Typography>{data?.poin_didapat}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box className="flex justify-between items-center pr-3 pt-2">
                <Typography fontWeight="600" variant="h4">
                  Subtotal
                </Typography>
                <Typography variant="h5" fontWeight="400">
                  Rp. {Intl.NumberFormat("id-ID").format(data?.total_harga)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: "1rem" }}>
          <Button fullWidth variant="contained" onClick={handlePesan}>
            Pesan sekarang
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

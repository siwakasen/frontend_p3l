import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  Divider,
  Stack,
  useTheme,
  List,
  ListItem,
  Tooltip,
} from "@mui/material";
import { IconCalendarEvent } from "@tabler/icons-react";
import { convertToSlug } from "@/utils/constants";
import { getLimitById } from "@/services/limit/limit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { checkToken } from "@/services/auth/auth";
import Toast from "@/components/shared/Toast";
import { addToCart } from "@/services/pesanan/pesanan";
import { UserContext } from "@/app/layout";

export const HampersDetail = ({ item, kategori, items, value, setValue }) => {
  const { toastInfo, toastWarning, toastSuccess } = Toast();
  const theme = useTheme();
  const router = useRouter();
  const { setChange } = useContext(UserContext);

  const [listLimit, setListLimit] = useState(null);
  const [limit, setLimit] = useState();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!item.id_produk) return;

    async function fetchData() {
      try {
        const response = await getLimitById(item.id_produk);
        setListLimit(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [item.id_produk]);

  useEffect(() => {
    function findKuota() {
      return (
        listLimit?.find(
          (item) => item.tanggal == dayjs(value.$d).format("YYYY-MM-DD")
        )?.limit || 0
      );
    }

    setLimit(findKuota());
  }, [listLimit, value]);

  useEffect(() => {
    async function checkLogin() {
      const data = await checkToken(null);
      setIsLogin(data);
    }
    checkLogin();
  }, []);

  const handleAddToCart = async () => {
    const cartItem = {
      id_produk: null,
      id_hampers: item.id_hampers ?? null,
    };

    const { data, code } = await addToCart(cartItem);
    if (code === 201) {
      setChange((prev) => prev + 1);
      return toastSuccess(data.message);
    } else {
      return toastWarning(data.message);
    }
  };

  function handleBeli() {
    if (isLogin.data?.role === "User") {
      if (limit <= 0) return toastWarning("Kuota produk tidak mencukupi");

      router.push(
        `/checkout?hampers=${item.id_hampers}&date=${value.format(
          "YYYY-MM-DD&statusPesanan=PO"
        )}`
      );
    } else {
      toastInfo("Silahkan login terlebih dahulu");
      router.push("/auth/login");
    }
  }

  function ButtonField(props) {
    const {
      setOpen,
      id,
      disabled,
      InputProps: { ref } = {},
      inputProps: { "aria-label": ariaLabel } = {},
    } = props;

    return (
      <Tooltip title="Lihat Kouta Lainnya">
        <IconCalendarEvent
          color="#2A3547"
          size="20px"
          variant="outlined"
          id={id}
          disabled={disabled}
          ref={ref}
          aria-label={ariaLabel}
          onClick={() => setOpen?.((prev) => !prev)}
        />
      </Tooltip>
    );
  }

  function ButtonDatePicker(props) {
    const [open, setOpen] = useState(false);

    const disablePastDates = (date) => {
      return item.id_kategori != 4
        ? date.isBefore(dayjs().startOf("day").add(2, "day"))
        : date.isBefore(dayjs().startOf("day"));
    };

    return (
      <DatePicker
        shouldDisableDate={disablePastDates}
        slots={{ ...props.slots, field: ButtonField }}
        slotProps={{ ...props.slotProps, field: { setOpen } }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    );
  }

  function PickerWithButtonField() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ButtonDatePicker
          label={value == null ? null : value.format("YYYY-MM-DD")}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </LocalizationProvider>
    );
  }

  return (
    <Box p={2}>
      {true ? (
        <>
          <Box display="flex" alignItems="center">
            <Chip
              label={item.stok_produk <= 0 ? "Out of Stock" : "In Stock"}
              color={item.stok_produk <= 0 ? "secondary" : "success"}
              variant={item.stok_produk <= 0 ? "outlined" : "filled"}
              size="small"
            />
            <Typography
              color="textSecondary"
              variant="caption"
              ml={1}
              textTransform="capitalize"
            >
              {kategori?.nama_kategori}
            </Typography>
          </Box>
          {/* ------------------------------------------- */}
          {/* Title and description */}
          {/* ------------------------------------------- */}
          <Typography fontWeight="600" variant="h4" mt={1}>
            {item.nama_produk || item.nama_hampers}
          </Typography>
          <Typography
            variant="subtitle2"
            mt={1}
            color={theme.palette.text.secondary}
          >
            {item.deskripsi_produk || item.deskripsi_hampers}
          </Typography>
          {/* ------------------------------------------- */}
          {/* Price */}
          {/* ------------------------------------------- */}
          <Typography sx={{ marginY: "1rem" }} variant="h2" fontWeight={700}>
            Rp.{" "}
            {Intl.NumberFormat("id-ID").format(
              item.harga_produk || item.harga_hampers
            )}
          </Typography>
          <Divider sx={{ marginBottom: "1rem" }} />
          <Grid container spacing={1} sx={{ marginBottom: "1rem" }}>
            {(item.nama_produk && item.nama_produk.includes("1/2")) ||
              (item.id_kategori == 4 && (
                <>
                  <Grid item xs={3}>
                    Stok
                  </Grid>
                  <Grid item xs={8}>
                    {item.id_kategori != 4 ? item.stok_produk : "Ready"}
                  </Grid>
                  {item.id_kategori == 4 && (
                    <Grid item xs={1}>
                      <PickerWithButtonField />
                    </Grid>
                  )}
                </>
              ))}
            {item.id_kategori != 4 && item.id_kategori != 5 ? (
              <>
                <Grid item xs={3}>
                  Kuota
                </Grid>
                <Grid item xs={8}>
                  {limit}
                </Grid>
                <Grid item xs={1}>
                  <PickerWithButtonField />
                </Grid>
              </>
            ) : null}
            {items?.find((item) => item.nama_produk?.includes("1/2")) ||
            item.nama_hampers?.includes("1/2") ? (
              <>
                <Grid item xs={3}>
                  <Box component="div" paddingY="8px" paddingRight="12px">
                    Jenis
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      border={1}
                      padding="4px 12px"
                      sx={{
                        backgroundColor:
                          !item.nama_produk.includes("1/2") &&
                          theme.palette.primary.light,
                        borderColor:
                          !item.nama_produk.includes("1/2") &&
                          theme.palette.primary.main,
                        color:
                          !item.nama_produk.includes("1/2") &&
                          theme.palette.primary.main,
                        transition: "border 1s, color 1s",
                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Link
                        href={`/produk/${
                          items.length === 1
                            ? convertToSlug(item.nama_produk).replace(
                                "-1-2",
                                ""
                              )
                            : convertToSlug(item.nama_produk)
                        }`}
                      >
                        1 Loyang
                      </Link>
                    </Box>

                    <Box
                      component="div"
                      border={1}
                      padding="4px 12px"
                      sx={{
                        backgroundColor:
                          item.nama_produk.includes("1/2") &&
                          theme.palette.primary.light,
                        borderColor:
                          item.nama_produk.includes("1/2") &&
                          theme.palette.primary.main,
                        color:
                          item.nama_produk.includes("1/2") &&
                          theme.palette.primary.main,
                        transition: "border 1s, color 1s",
                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Link
                        href={`/produk/${convertToSlug(
                          items?.find((item) =>
                            item.nama_produk.includes("1/2")
                          ).nama_produk
                        )}`}
                      >
                        1/2 Loyang
                      </Link>
                    </Box>
                  </Stack>
                </Grid>
              </>
            ) : null}
          </Grid>
          <Divider />
          {/* ------------------------------------------- */}
          {/* Buttons */}
          {/* ------------------------------------------- */}
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} lg={4} md={6}>
              <Button
                color="primary"
                size="medium"
                fullWidth
                variant="contained"
                onClick={() => handleBeli()}
              >
                Buy Now
              </Button>
            </Grid>
            <Grid item xs={12} lg={4} md={6}>
              <Button
                color="success"
                size="medium"
                fullWidth
                variant="outlined"
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
          <Typography color="textSecondary" variant="h6" mt={2}>
            Catatan :
          </Typography>
          <List sx={{ listStyleType: "disc", paddingLeft: 2 }}>
            <ListItem sx={{ display: "list-item", padding: 0 }}>
              Produk selain titipan akan dilakukan pre-order minimal h-2. Jika
              produk memiliki stok, akan langsung dikirim.
            </ListItem>
            <ListItem sx={{ display: "list-item", padding: 0 }}>
              Produk yang telah dibeli tidak dapat dikembalikan.
            </ListItem>
            <ListItem sx={{ display: "list-item", padding: 0 }}>
              Silahkan melakukan pengecekan kuota produk sebelum melakukan
              pembelian
            </ListItem>
          </List>
          {/* ------------------------------------------- */}
          {/* Alert When click on add to cart */}
          {/* ------------------------------------------- */}
          {/* <AlertCart handleClose={handleClose} openCartAlert={cartalert} /> */}
        </>
      ) : (
        "No product"
      )}
    </Box>
  );
};

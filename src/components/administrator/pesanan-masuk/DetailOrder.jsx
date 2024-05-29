import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  Divider,
  Button,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import ChildCard from "../shared/ChildCard";
import { getPesanan } from "@/services/pesanan-masuk/pesanan-masuk";
import { API_URL_IMAGE } from "@/utils/constants";
import { uniqueId } from "lodash";
import { IconArrowBack } from "@tabler/icons-react";

const DetailOrder = ({ id }) => {
  const [data, setData] = React.useState({});
  const [customizeId, setCustomizeId] = React.useState("");
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getPesanan(id);
      setData(response.data);
      const date = new Date(response.data.tanggal_pesanan);
      setCustomizeId(
        `${date.getFullYear().toString().slice(-2)}.${
          date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
        }.${response.data.id_pesanan}`
      );
    };
    fetchData();
  }, []);

  return (
    <>
      <Box my={3}>
        <ChildCard>
          <Box p={2}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="column">
                <Typography variant="h5" fontWeight={600}>
                  Detail Pesanan #{customizeId}
                </Typography>
                <Stack direction="row">
                  <Stack direction="column">
                    <Typography variant="subtitle1" fontWeight={400}>
                      Nama Pemesan
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {data.user && data.user.nama}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={400}>
                      Alamat Pemesan
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {data.alamat_pengiriman}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction="column" alignItems="flex-end">
                <Typography variant="subtitle1" fontWeight={400}>
                  Tanggal Pesanan
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  {new Date(data.tanggal_pesanan).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
                <Typography variant="subtitle1" fontWeight={400}>
                  Status Pesanan
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  {data.status_transaksi}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ my: 2 }} />
            {data.detail_pesanan &&
              data.detail_pesanan.map((detail) => {
                if (detail.produk !== null)
                  return (
                    <Box key={uniqueId()}>
                      <Stack
                        direction="row"
                        spacing={2}
                        mt={2}
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing={2}>
                          <Image
                            src={`${API_URL_IMAGE}${detail.produk.foto_produk}`}
                            width={80}
                            height={80}
                            alt="image-product"
                            style={{
                              borderRadius: "5px",
                            }}
                          />
                          <Box>
                            <Typography variant="h5" fontWeight={600}>
                              {detail.produk.nama_produk}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              fontWeight={500}
                              color="GrayText"
                            >
                              {detail.jumlah} Produk x{" "}
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(detail.produk.harga_produk)}
                            </Typography>
                          </Box>
                        </Stack>
                        {!smDown && (
                          <Stack direction="row" spacing={1}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={400}>
                                Subtotal Harga
                              </Typography>
                              <Typography variant="subtitle1" fontWeight={800}>
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(detail.subtotal)}
                              </Typography>
                            </Box>
                          </Stack>
                        )}
                      </Stack>
                      {smDown && (
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          mt={2}
                        >
                          <Box>
                            <Typography variant="subtitle1" fontWeight={400}>
                              Subtotal Harga
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={800}>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(detail.subtotal)}
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                    </Box>
                  );
                else
                  return (
                    <Box key={uniqueId()}>
                      <Stack
                        direction="row"
                        spacing={2}
                        mt={2}
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing={2}>
                          <Image
                            src={`${API_URL_IMAGE}${detail.hampers.foto_hampers}`}
                            width={80}
                            height={80}
                            alt="image-product"
                            style={{
                              borderRadius: "5px",
                            }}
                          />
                          <Box>
                            <Typography variant="h5" fontWeight={600}>
                              {detail.hampers.nama_hampers}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              fontWeight={500}
                              color="GrayText"
                            >
                              {detail.jumlah} Produk x{" "}
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(detail.hampers.harga_hampers)}
                            </Typography>
                          </Box>
                        </Stack>
                        {!smDown && (
                          <Stack direction="row" spacing={1}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={400}>
                                Subtotal Harga
                              </Typography>
                              <Typography variant="subtitle1" fontWeight={800}>
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(detail.subtotal)}
                              </Typography>
                            </Box>
                          </Stack>
                        )}
                      </Stack>
                      {smDown && (
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          mt={2}
                        >
                          <Box>
                            <Typography variant="subtitle1" fontWeight={400}>
                              Subtotal Harga
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={800}>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(detail.subtotal)}
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                    </Box>
                  );
              })}
            <Box my={5} />
            {/* Sub Total */}
            <Stack direction="row" justifyContent="space-between" mb={3}>
              <Typography variant="h6" fontWeight={400}>
                Subtotal
              </Typography>
              <Typography variant="h6">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(data.total_harga)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={3}>
              <Typography variant="h6" fontWeight={400}>
                Ongkos Kirim
              </Typography>
              <Typography variant="h6">
                {data.ongkir
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(data.ongkir)
                  : data.status_transaksi != "Pengantaran Kurir Toko"
                  ? "Rp0,00"
                  : "Ongkir Belum Ditentukan"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={3}>
              <Typography variant="h6" fontWeight={400}>
                Diskon
              </Typography>
              <Typography variant="h6" color="error">
                -
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(data.poin_dipakai * 100)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h5" color="success">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  data.total_harga + data.ongkir - data.poin_dipakai * 100
                )}
              </Typography>
            </Stack>
          </Box>
          <Button color="inherit" onClick={() => window.history.back()}>
            <IconArrowBack /> Back
          </Button>
        </ChildCard>
      </Box>
    </>
  );
};

export default DetailOrder;

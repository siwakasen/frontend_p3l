import React from "react";
import { Grid, Box, Typography, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import historyBuy from "../../../assets/icons/history_buy.png";
import changeProfile from "../../../assets/icons/change_profile.png";
import changeAddress from "../../../assets/icons/change_address.png";
import Image from "next/image";

const kategoriCard = [
    {
      title: "Snack",
      href: "/",
      bgcolor: "primary",
    },
    {
      title: "Hampers",
      href: "/",
      bgcolor: "warning",
    },
    {
      title: "Kue",
      href: "/",
      bgcolor: "secondary",
    },
    { 
      title: "Minuman",
      href: "/",
      bgcolor: "error",
    }
];

const ProfileBox = () => {
    const data = useSelector((state) => state.user);
    return (
        <Box sx={{ borderRadius: "10px", border: "1px solid #f0f0f0", p: 2, mt: 2, boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Kategori Produk</Typography>
                    <Grid container spacing={1}>
                        {kategoriCard.map((kategori, i) => (
                            <Grid item xs={6} sm={6} md={6} lg={6} key={i}>
                                <Box item="true" bgcolor={kategori.bgcolor + '.light'} textAlign={"center"}>
                                    <CardContent>
                                        <Typography
                                            color={kategori.bgcolor + ".main"}
                                            variant="subtitle1"
                                            fontWeight={600}
                                        >
                                            {kategori.title}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1}}>Akses Cepat Profil</Typography>
                    {data.user && (
                        <>
                            <Grid container spacing={1} marginBottom={1}>
                                <Grid item xs={3} sm={3} md={4} lg={4}>
                                    <Box item="true">
                                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 0, ":last-child": {paddingBottom: 0}}}>
                                            <Image src={historyBuy} alt="historyBuy" width={50} height={50} />
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                Histori Pemesanan
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} sm={3} md={4} lg={4}>
                                    <Box item="true">
                                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 0, ":last-child": {paddingBottom: 0}}}>
                                            <Image src={changeProfile} alt="historyBuy" width={50} height={50} />
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                Ubah Profil
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} sm={3} md={4} lg={4}>
                                    <Box item="true">
                                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 0, ":last-child": {paddingBottom: 0}}}>
                                            <Image src={changeAddress} alt="historyBuy" width={50} height={50} />
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                Ubah Alamat
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6} sm={6} md={6} lg={6} mt={"-2px"}>
                                    <Box item="true" bgcolor={"primary.light"} sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight={600} color={"primary.main"}>
                                            Saldo {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.user.saldo)}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6} mt={"-2px"}>
                                    <Box item="true" textAlign={"center"} bgcolor={"primary.light"}>
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight={600} color={"primary.main"}>
                                                Poin {data.user.poin}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                    )}
                    {!data.user && (
                    <>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={500} color={"rgba(0, 0, 0, 0.8)"}>
                                Atma Kitchen merupakan platform yang menyediakan berbagai macam produk makanan dan minuman yang berkualitas. Silahkan masuk atau daftar untuk melanjutkan pembelian produk atau akses fitur lainnya.
                            </Typography>
                        </Box>
                        <Grid container spacing={1} mt={"1px"}>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Box item="true" textAlign={"center"} border={"1px solid #f0f0f0"}>
                                    <CardContent component={"a"} href={"/auth/login"}>
                                        <Typography variant="subtitle1" fontWeight={600} color={"black"}>
                                            Masuk
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Box item="true" textAlign={"center"} border={"1px solid #f0f0f0"}>
                                    <CardContent component={"a"} href={"/auth/register"}>
                                        <Typography variant="subtitle1" fontWeight={600} color={"black"}>
                                            Register
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
 
export default ProfileBox;
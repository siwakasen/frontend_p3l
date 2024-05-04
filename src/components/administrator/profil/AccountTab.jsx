import React from "react";
import {
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

import BlankCard from "../../shared/BlankCard";
import CustomTextField from "../forms/CustomTextField";
import CustomFormLabel from "../forms/CustomFormLabel";

import { checkToken } from "@/services/auth/auth";
import Cookies from "js-cookie";
import { changePassword } from "./useChangeProfile";

import ResponsiveDialog from "../shared/ResponsiveDialog";

const AccountTab = () => {
  const token = Cookies.get("token");
  const [data, setData] = React.useState({});
  const { handleChangePassword, formik, handleChange, open, setOpen } = changePassword();

  React.useEffect(() => {
    async function checkAuthorize() {
      if (!token) return;
      const response = await checkToken(token);
      setData(response.data);
    }
    checkAuthorize();
  }, [token]);

  return (
    <>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <BlankCard>
            <CardContent>
                <Typography variant="h5" mb={1}>
                Informasi Akun
                </Typography>
                <Typography color="textSecondary" mb={3}>
                Tampilan informasi data akun.
                </Typography>
                <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                        sx={{
                        mt: 0,
                        }}
                        htmlFor="nama_karyawan"
                    >
                        Nama
                    </CustomFormLabel>
                    <CustomTextField
                        id="nama_karyawan"
                        value={data.nama_karyawan || ""}
                        disabled={true}
                        variant="outlined"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                        sx={{
                        mt: 0,
                        }}
                        htmlFor="tanggal_masuk"
                    >
                        Tanggal Masuk
                    </CustomFormLabel>
                    <CustomTextField
                        id="tanggal_masuk"
                        disabled={true}
                        variant="outlined"
                        value={data.tanggal_masuk || ""}
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                        sx={{
                        mt: 0,
                        }}
                        htmlFor="email"
                    >
                        Email
                    </CustomFormLabel>
                    <CustomTextField
                        id="email"
                        value={data.email || ""}
                        disabled={true}
                        variant="outlined"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                        sx={{
                        mt: 0,
                        }}
                        htmlFor="id_role"
                    >
                        Jabatan
                    </CustomFormLabel>
                    <CustomTextField
                        id="id_role"
                        disabled={true}
                        value={data.role || ""}
                        variant="outlined"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <CustomFormLabel
                        sx={{
                        mt: 0,
                        }}
                        htmlFor="bonus_gaji"
                    >
                        Bonus Gaji
                    </CustomFormLabel>
                    <CustomTextField
                        id="bonus_gaji"
                        value={new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        }).format(data.bonus_gaji || 0)}
                        disabled={true}
                        variant="outlined"
                        fullWidth
                    />
                    </Grid>
                </Grid>
                </form>
            </CardContent>
            </BlankCard>
        </Grid>
        {/*  Change Password */}
        <Grid item xs={12} lg={12}>
            <BlankCard>
            <CardContent>
                <Typography variant="h5" mb={1}>
                Ubah Password
                </Typography>
                <Typography color="textSecondary" mb={3}>
                Untuk mengubah password, isi form dibawah ini.
                </Typography>
                <form>
                <CustomFormLabel
                    sx={{
                    mt: 0,
                    }}
                    htmlFor="password"
                >
                    Password Lama
                </CustomFormLabel>
                <CustomTextField
                    id="password"
                    name="password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={formik.values.password}
                    onChange={handleChange}
                    placeholder="Masukkan password lama"
                    error={
                    formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={formik.touched.password && formik.errors.password}
                />
                <CustomFormLabel htmlFor="new_password">
                    Password baru
                </CustomFormLabel>
                <CustomTextField
                    id="new_password"
                    name="new_password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={formik.values.new_password}
                    onChange={handleChange}
                    placeholder="Masukkan password baru"
                    error={
                    formik.touched.new_password &&
                    Boolean(formik.errors.new_password)
                    }
                    helperText={
                    formik.touched.new_password && formik.errors.new_password
                    }
                />
                <CustomFormLabel htmlFor="confirm_password">
                    Konfirmasi Password
                </CustomFormLabel>
                <CustomTextField
                    id="confirm_password"
                    name="confirm_password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={formik.values.confirm_password}
                    onChange={handleChange}
                    placeholder="Konfirmasi password baru"
                    error={
                    formik.touched.confirm_password &&
                    Boolean(formik.errors.confirm_password)
                    }
                    helperText={
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                    }
                />
                </form>
                <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "start" }}
                mt={3}
                >
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => formik.handleSubmit()}
                >
                    Simpan Perubahan
                </Button>
                </Stack>
            </CardContent>
            </BlankCard>
        </Grid>
        </Grid>

        <ResponsiveDialog 
            open={{open, setOpen}}
            title="Ubah Password"
            content="Apakah anda yakin ingin mengubah password?"
            action={{
                text: "Ubah Password",
                onClick: () => handleChangePassword(data.id_karyawan),
                props: {
                    variant: "contained",
                    color: "primary"
                }
            }}
        />
    </>
  );
};

export default AccountTab;

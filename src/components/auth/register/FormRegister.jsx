import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import Link from "next/link";
import TextFormField from "../shared/TextFormField";
import CustomFormLabel from "../shared/LabelFormField";
import { Stack } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRegister } from "./useRegister";


export const FormRegister = ({ title, subtitle, subtext }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { formik, loading, handleInput, handleSubmit } = useRegister();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return ( 
    <>
        {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
            {title}
        </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <CustomFormLabel htmlFor="nama">Nama</CustomFormLabel>
                <TextFormField 
                    id="nama" 
                    variant="outlined" 
                    placeholder="Masukkan Nama"
                    fullWidth 
                    onChange={(e) => handleInput(e)}
                    error={formik.touched.nama && Boolean(formik.errors.nama)}
                    helperText={formik.touched.nama && formik.errors.nama}
                />
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <TextFormField 
                    id="email" 
                    variant="outlined" 
                    placeholder="Masukkan Email"
                    fullWidth 
                    onChange={(e) => handleInput(e)}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <TextFormField
                    id="password"
                    placeholder="Masukkan Password"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleClickShowPassword} disableRipple>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        )
                    }}
                    onChange={(e) => handleInput(e)}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <CustomFormLabel htmlFor="tanggal_lahir">Tanggal Lahir</CustomFormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={formik.values.tanggal_lahir}
                        onChange={(value) => {
                            formik.setFieldValue("tanggal_lahir", value);
                        }}
                        renderInput={(params) => <TextFormField {...params} id="tanggal_lahir"
                        error={formik.touched.tanggal_lahir && Boolean(formik.errors.tanggal_lahir)}
                        helperText={formik.touched.tanggal_lahir && formik.errors.tanggal_lahir}/>}
                    />
                </LocalizationProvider>
                <CustomFormLabel htmlFor="no_hp">Nomor Handphone</CustomFormLabel>
                <TextFormField 
                    id="no_hp" 
                    placeholder="Masukkan Nomor Handphone"
                    variant="outlined" 
                    fullWidth 
                    type="number"
                    onChange={(e) => handleInput(e)}
                    error={formik.touched.no_hp && Boolean(formik.errors.no_hp)}
                    helperText={formik.touched.no_hp && formik.errors.no_hp}
                />
            </Stack>
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                {...(loading && { disabled: true })}
                onClick={(e) => handleSubmit(e)}
            >
                Register
            </Button>
        </Box>
        {subtitle}
    </>
    );
}

import React, { useState, useRef } from 'react';
import { Box, Typography, Button } from "@mui/material";
import TextFormField from "../shared/TextFormField";
import CustomFormLabel from "../shared/LabelFormField";
import { Stack } from "@mui/system";

import { emailVerification, resendCode } from '@/services/auth/auth';
import Toast from '@/components/shared/Toast';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const Content = ({ token }) => {
    const { toastError, toastSuccess } = Toast();
    const [codes, setCodes] = useState(Array(6).fill(''));
    const inputRefs = useRef(Array(6).fill(null));
    const router = useRouter();

    const handleChange = (index, value) => {
        if (/^\d{0,1}$/.test(value)) {
        const newCodes = [...codes];
        newCodes[index] = value;

        if (value === '' && index > 0) {
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
            prevInput.focus();
            }
        }

        if (value !== '' && index < codes.length - 1) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) {
            nextInput.focus();
            }
        }

        setCodes(newCodes);
        }
    };
    return (
        <>
            <Box mt={4}>
                <Stack mb={3}>
                    <CustomFormLabel htmlFor="code">
                        Ketik kode keamanan 6 digit Anda{" "}
                    </CustomFormLabel>
                    <Stack spacing={2} direction="row">
                        {codes.map((code, index) => (
                            <TextFormField
                            key={index}
                            id={`code${index + 1}`}
                            variant="outlined"
                            fullWidth
                            value={code}
                            onChange={(e) => handleChange(index, e.target.value)}
                            maxLength={1} 
                            inputRef={(ref) => (inputRefs.current[index] = ref)} 
                            />
                        ))}
                    </Stack>
                </Stack>
                <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onClick={() => emailVerification(token, codes.join('')).then((e) => {
                    if(e.status === "error"){
                        toastError(e.message)   
                    }else{
                        toastSuccess(e.message);
                        Cookies.set("token", e.token);
                        router.push("/");
                    }
                })}
                >
                Verifikasi Akun
                </Button>

                <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Belum menerima kode?
                </Typography>
                <Typography
                    fontWeight="500"
                    sx={{
                    textDecoration: "none",
                    color: "primary.main",
                    }}
                    onClick={() => {
                        toastSuccess("Silahkan tunggu beberapa saat");
                        resendCode(token).then((e) => {
                            if(e.status === "error"){
                                toastError(e.message)
                            }else{
                                toastSuccess(e.message);
                            }
                        });
                    }}
                >
                    Kirim ulang kode
                </Typography>
                </Stack>
            </Box>
        </>
    );
}

"use client";
import React from "react";
import { Grid, Box, Card, Typography } from '@mui/material';
import { Content } from './Content';

export const Verification = ({ token, email }) => {
return(
    <Box
        sx={{
            position: 'relative',
            '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
            },
        }}
        >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
            <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
                <Typography variant="subtitle1" textAlign="center" color="textSecondary">
                    Kami telah mengirimkan kode verifikasi ke email Anda. Silahkan masukkan kode tersebut di bawah ini.
                </Typography>
                <Typography variant="subtitle1" textAlign="center" fontWeight="700" mb={1}>
                    {email}
                </Typography>
                <Content token={token} />
            </Card>
            </Grid>
        </Grid>
    </Box>
)};


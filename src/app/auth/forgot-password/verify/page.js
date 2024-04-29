"use client"
import { Grid, Box, Card, Typography } from '@mui/material';
import Image from "next/image";
import PageContainer from "@/components/container/PageContainer";
import AuthForgotPassword from '@/components/auth/forgot-password/AuthForgotPassword';
import Gambar from '@/../public/images/landingpage/favicon.png';
import { useState } from 'react';

export default function Page(props){
    const isEmailSent = props.isEmailSent || false;
    return (
      <PageContainer title="Forgot Password" description="this is Forgot Password page">
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
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                <Image src={Gambar} alt='logo' priority={true} />
                <Typography
                  color="textSecondary"
                  textAlign="center"
                  variant="h3"
                  fontWeight="bold"
                  sx={{ ml: 2 }}
                >
                  Forgot Password
                </Typography>
              </Box>
              { (!isEmailSent) ?
                  <>
                    <Typography
                      color="textSecondary"
                      textAlign="center"
                      variant="subtitle2"
                      fontWeight="400"
                    >
                      Please enter the email address associated with your account and We will email you a
                      link to reset your password.
                    </Typography>
                    <AuthForgotPassword />
                      </>
                :
                  <>
                  <Typography
                      color="textSecondary"
                      textAlign="center"
                      variant="subtitle2"
                      fontWeight="400"
                    >
                      Email have been sent to your email address. Please check your email.
                    </Typography>
                  </>
              }
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
    );
}

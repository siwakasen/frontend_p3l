"use client"
import { Grid, Box, Card, Typography,Button, Stack } from '@mui/material';
import PageContainer from "@/components/container/PageContainer";
import Logo from '@/../public/images/landingpage/favicon.png';
import Image from "next/image";
import { FormForgotPassword } from "@/components/auth/forgot-password/FormForgotPassword";
import { useSearchParams } from 'next/navigation'
import { useValidateToken } from '@/components/auth/forgot-password/useValidateToken';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import LoadingAnimation from '@/components/loading-animation/circular-loading';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParams = searchParams.get('token');
  const emailParams = searchParams.get('email');
  const { handleCheckToken } = useValidateToken();
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleCheckToken(tokenParams)
      .then(responseStatus => {
        setStatus(responseStatus);
      })
      .catch(error => {
        console.error('Error checking token:', error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingAnimation />; 
  }
  if(status=== 200){
    return (
        <PageContainer title="Change Password" description="this is Change Password page">
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
              <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px'}}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Image src={Logo} alt='logo' priority={true} />
                  <Typography
                    color="textSecondary"
                    textAlign="center"
                    variant="h3"
                    fontWeight="bold"
                    sx={{ ml: 2, mb: 1}}
                  >
                    Change Password
                  </Typography>
                </Box>
                    <Typography
                        color="textSecondary"
                        textAlign="center"
                        variant="subtitle2"
                        fontWeight="400"
                  >
                  Enter your new password here
                  </Typography>
                  <FormForgotPassword email = {emailParams}/>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
      );
  }else{
    return (
        <PageContainer title="Change Password" description="this is Change Password page">
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
              <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px'}}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography
                    color="textSecondary"
                    textAlign="center"
                    variant="h3"
                    fontWeight="bold"
                    sx={{ ml: 2, mb: 1}}
                  >
                    Not Found
                  </Typography>
                </Box>
                  <Stack spacing={2}>
                    <Typography
                        color="textSecondary"
                        textAlign="center"
                        variant="subtitle2"
                        fontWeight="400"
                    >
                    This link is invalid or has expired
                    </Typography>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        size="large" 
                        onClick={() => router.push('/auth/login')}
                    >
                        Back to Login
                    </Button>
                  </Stack>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
      );
  }
};

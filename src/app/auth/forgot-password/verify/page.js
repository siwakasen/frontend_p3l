"use client"
import { Grid, Box, Card, Typography,Button, Stack,TextField } from '@mui/material';
import Image from "next/image";
import PageContainer from "@/components/container/PageContainer";
import Logo from '@/../public/images/landingpage/favicon.png';
import { Link } from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Toast from "@/components/shared/Toast";
import  {requestForgot}  from "@/services/auth/auth";

export default function Page(){
  const router = useRouter();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toastSuccess, toastError, toastWarning } = Toast();
    
  function handleInput(event) {
      const { name, value } = event.target;
      if (name === "email") {
      setEmail(value);
      }
  }
  
  async function handleRequestForgot() {
      if (!email) {
      toastWarning("Please fill all the fields!");
          return;
      }else 
      if(!email.includes('@')){
          toastWarning("Please enter a valid email address!");
          return;
      }

      setLoading(true);
      const response = await requestForgot(email);
      const { message} = response.data;
      switch (response.status) {
          case 200:
              toastSuccess(message);
              setIsEmailSent(true);
              break;
          case 400:
              toastError(message);
              break;
          case 404:
              toastError(message);
              break;
          default:
              toastError("Something went wrong!");
              break;
      }
      setLoading(false);
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRequestForgot();
    }
  };

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
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px'}}>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                <Image src={Logo} alt='logo' priority={true} />
                <Typography
                  color="textSecondary"
                  textAlign="center"
                  variant="h3"
                  fontWeight="bold"
                  sx={{ ml: 2 }}
                >
                  {
                    !isEmailSent ? (
                      "Forgot Password"
                    ):
                    "Email Sent"
                  }
                </Typography>
              </Box>


              { //if email is not sent yet
                !isEmailSent ? (
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
                  <Stack mt={4} spacing={2}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      >
                      Email Address
                    </Typography>
                    <TextField 
                    type='email' 
                    name='email' 
                    id='email' 
                    onChange={(e) =>handleInput(e)} 
                    onKeyDown={handleKeyDown}/>

                    <Button 
                    color="primary" 
                    variant="contained" 
                    size="large" 
                    fullWidth component={Link} 
                    to="/" 
                    {...(loading && { disabled: true })}
                    onClick={()=>{
                      handleRequestForgot();
                    }}
                    >
                      Forgot Password
                    </Button>
                    
                    <Button 
                      color="primary" 
                      size="large"
                      fullWidth 
                      onClick={() => router.push('/auth/login')}
                      >
                      Back to Login
                    </Button>
                  </Stack>
                  </>
                ): //if email is sent
                <Typography
                      color="textSecondary"
                      textAlign="center"
                      variant="subtitle2"
                      fontWeight="400"
                      sx={{ mt: 2 }}
                >
                Verification to reset password has been sent to your email.
                </Typography>
              }


            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
    );
}

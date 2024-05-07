"use client"
import { Grid, Box, Card, Typography,Button, Stack,TextField, Divider } from '@mui/material';
import { Link } from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Toast from "@/components/shared/Toast";
import  {requestForgot}  from "@/services/auth/auth";
import { FormForgotPassword } from "@/components/auth/forgot-password/FormForgotPassword";
import { useSelector } from 'react-redux';


export default function Page(props){
    const data = useSelector((state) => state.user);
  const router = useRouter();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState(data.user.email);
  const [loading, setLoading] = useState(false);
  const { toastSuccess, toastError, toastWarning } = Toast();
  
  async function handleRequestForgot() {
      if (!email) {
      toastWarning("Email tidak boleh kosong!");
          return;
      }else 
      if(!email.includes('@')){
          toastWarning("Email tidak valid!");
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
              toastError("Gagal mengirimkan email!");
              break;
      }
      setLoading(false);
  }

  function handleResendEmail(){
    toastSuccess("Mohon tunggu beberapa saat!");
    handleRequestForgot();
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRequestForgot();
    }
  };

    return (
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '65vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={8}
            xl={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                <Typography
                  color="textSecondary"
                  textAlign="center"
                  variant="h4"
                  fontWeight="bold"
                  sx={{ ml: 2 }}
                >
                  {
                    !isEmailSent ? 'Pilih metode verifikasi' : 'Verifikasi terkirim'
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
                        fontWeight="300"
                  >
                  Pilih salah satu metode dibawah ini untuk melakukan ubah password.
                  </Typography>
                  <Button 
                     color="primary"
                    variant="contained" 
                    size="large"
                    sx={{ mt: 2 }} 
                    fullWidth component={Link} 
                    to="/" 
                    {...(loading && { disabled: true })}
                    onClick={()=>{
                      handleRequestForgot();
                    }}
                    >
                      {`Email ke: ${data.user.email}`} 
                    </Button>
                  </>
                ): //if email is sent
                <>
                  <Typography
                        color="textSecondary"
                        textAlign="center"
                        variant="subtitle2"
                        fontWeight="400"
                        sx={{ mt: 2 }}
                  >
                  Verifikasi telah dikirim ke email anda. Silahkan cek email anda untuk melanjutkan proses ubah password.
                  </Typography>
                  <Divider sx={{mt: 2}}/>
                  <Typography
                        color="textSecondary"
                        textAlign="justify"
                        variant="subtitle2"
                        fontWeight="400"
                        sx={{ mt: 2}}
                  >
                  {'Belum menerima email? '}
                  <Typography
                    fontWeight="500"
                    sx={{
                    textDecoration: "none",
                    color: "primary.main",
                    cursor: "pointer",
                    display: "inline",
                    
                    }}
                    onClick={() => {
                      handleResendEmail();
                    }}
                >
                    kirim ulang
                </Typography>
                  </Typography>
                </>
                
              }


            </Card>
          </Grid>
         </Grid>
       </Box>
    );
}

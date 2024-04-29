import { Button, Stack, Typography,TextField } from '@mui/material';
import { Link } from 'next/link';
import { useRequestForgot } from './useRequestForgot';
import { useRouter } from 'next/navigation'


export const AuthForgotPassword = () => {
  const { handleRequestForgot, handleInput, loading } = useRequestForgot();
  const router = useRouter();
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRequestForgot();
    }
  };
  return(
  <>
    <Stack mt={4} spacing={2}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        component="label"
        >
            Email Address
            </Typography>
        <TextField type='email' name='email' id='email' onChange={(e) =>handleInput(e)} onKeyDown={handleKeyDown}/>

      <Button 
      color="primary" 
      variant="contained" 
      size="large" 
      fullWidth component={Link} 
      to="/" 
      {...(loading && { disabled: true })}
      onClick={()=>{
        handleRequestForgot();
        setIsEmailSent(true);
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

  );
};

export default AuthForgotPassword;

import { Button, Stack, Typography,TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormField from "../shared/OutlineTextFormField";
import { Link } from 'next/link';
import { useChangePassword } from './useChangePassword';
import { useState } from 'react';
import { useRouter } from 'next/navigation'


export const FormForgotPassword = (props) => {
  const router = useRouter();
  const { handleInput, handleChangePassword, loading } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleChangePassword();
    }
  };
  return (
    <Stack spacing={2}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        component="label"
        >
        Password
      </Typography>
      <FormField
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          onChange={(e) => handleInput(e, props.email)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disableRipple
                sx={{ marginRight: "-10px" }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      <Typography
        variant="subtitle1"
        fontWeight={600}
        component="label"
        >
        Confirm Password
      </Typography>
      <FormField
          type={showConfirmPassword ? "text" : "password"}
          name="confirm_password"
          id="confirm_password"
          onChange={(e) => handleInput(e,props.email)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                disableRipple
                sx={{ marginRight: "-10px" }}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />

      <Button 
      color="primary" 
      variant="contained" 
      size="large" 
      fullWidth component={Link} 
      to="/" 
      {...(loading && { disabled: true })}
      onClick={()=>{
        handleChangePassword(props.email);
      }}
      >
        Change Password
      </Button>
        <Button 
          color="primary" 
          size="large"
          fullWidth 
          onClick={() => router.push('/auth/login')}
          onKeyDown={handleKeyDown}
          >
          Back to Login
      </Button>

      
    </Stack>
  );
}


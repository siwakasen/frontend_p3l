import {
  Box,
  Button,
  Stack,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import LabelForm from "../shared/LabelFormField";
import FormField from "../shared/OutlineTextFormField";
import { useLogin } from "./useLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

export const FormLogin = ({ title, subtitle, subtext }) => {
  const { handleLogin, handleInput, loading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <Stack>
        <LabelForm htmlFor="email">Email</LabelForm>
        <FormField
          type="email"
          name="email"
          id="email"
          onChange={(e) => handleInput(e)}
        />
        <LabelForm htmlFor="password">Password</LabelForm>
        <FormField
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          onChange={(e) => handleInput(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disableRipple
                sx={{ marginRight: "-10px" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Stack direction="row" alignItems="end" justifyContent="end" my={2}>
          <Link href="/forgot-password/requestEmail">
            <Typography color="primary" variant="subtitle2">
              Forgot Password?
            </Typography>
          </Link>
        </Stack>
      </Stack>

      <Box>
        <Button
          color="primary"
          {...(loading && { disabled: true })}
          variant="contained"
          size="large"
          fullWidth
          to="/"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          Sign in
        </Button>
      </Box>

      <Divider />
      {subtitle}
    </>
  );
};

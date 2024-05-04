import { Grid, Box, Typography, Stack } from "@mui/material";
import LoginImage from "@/assets/svgs/login-bg.svg";
import React from "react";
import Image from "next/image";
import { FormLogin } from "./FormLogin";
import Link from "next/link";

export const Login = () => {
  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      <Grid
        item
        sm={0}
        lg={7}
        xl={8}
        className="bg-slate-50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <Box>
          <Image
            src={LoginImage}
            alt="Login Illustration"
            width={500}
            height={500}
          ></Image>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ width: { md: "60%" } }}>
          <FormLogin
            title={"Welcome to Atma Kitchen"}
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Login to access your account
              </Typography>
            }
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  New to Atma Kitchen?
                </Typography>
                <Typography
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  <Link href="/auth/register">Create an account</Link>
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
};

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import Cookies from "js-cookie";
import * as dropdownData from "./data";

import { IconMail } from "@tabler/icons-react";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


const Profile = () => {
  const [anchorEl, setanchorEl] = useState(null);
  const handleClick2 = (event) => {
    setanchorEl(event.currentTarget);
  };
  const router = useRouter();
  const data = useSelector((state) => state.user);

  const handleClose = () => {
    setanchorEl(null);
  };

  function handleLogout() {
    Cookies.remove("token");
    router.push("/auth/login");
  }

  return (
    <Box>
      { data.user === null && (
        <Link href="/auth/login">
          <Button variant="outlined" color="primary">
            Masuk
          </Button>
        </Link>
      )}
      { data.user === null && (
        <Link href="/auth/register">
          <Button variant="contained" color="primary" sx={{ ml: 2 }}>
            Daftar
          </Button>
        </Link>
      )}
      { data.user !== null && (
        <>
          <IconButton
            size="large"
            color="inherit"
            aria-haspopup="true"
            sx={{
              ...(typeof anchorEl === "object" && {
                color: "primary.main",
              }),
            }}
            onClick={handleClick2}
          >
            <Avatar
              alt={"ProfileImg"}
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </IconButton>
          {/* ------------------------------------------- */}
          {/* Message Dropdown */}
          {/* ------------------------------------------- */}
          <Menu
            id="msgs-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{
              "& .MuiMenu-paper": {
                width: "360px",
                p: 4,
              },
            }}
          >
            <Typography variant="h5">Profil Saya</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar
                alt={"ProfileImg"}
                sx={{ width: 95, height: 95 }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  fontWeight={600}
                >
                  {data.user.nama}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {data.user.email}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            {dropdownData.profile.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                  <Link href={profile.href} onClick={handleClose}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        width="45px"
                        height="45px"
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink="0"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="textPrimary"
                          className="text-hover"
                          noWrap
                          sx={{
                            width: "240px",
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: "240px",
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box mt={2}>
              <Button
                onClick={() => handleLogout()}
                variant="outlined"
                color="primary"
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default Profile;

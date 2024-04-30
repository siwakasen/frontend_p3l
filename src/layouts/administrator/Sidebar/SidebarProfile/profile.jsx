import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { IconPower } from "@tabler/icons-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { DataContext } from "@/app/administrator/layout";

export const Profile = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const customizer = useSelector((state) => state.customizer);
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  let { userData } = useContext(DataContext);

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
      borderRadius={`${customizer.borderRadius}px`}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={"/images/profile/user-1.jpg"}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">
              {userData.nama_karyawan == undefined
                ? ""
                : userData.nama_karyawan}
            </Typography>
            <Typography sx={{ fontWeight: 400, fontSize: "0.5rem" }}>
              {userData.role == undefined ? "" : userData.role}
            </Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                href="/auth/auth1/login"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

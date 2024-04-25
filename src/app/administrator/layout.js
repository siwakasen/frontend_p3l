"use client";
import { styled, Box, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import Sidebar from "@/layouts/administrator/Sidebar";
import Header from "@/layouts/administrator/Header";
import React, { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { checkToken } from "@/services/auth/auth";

const MainWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  overflow: "auto",
}));

export const DataContext = createContext();

const AdminLayout = ({ children }) => {
  const [token, _] = useState(Cookies.get("token"));
  const [userData, setUserData] = useState({ nama_karyawan: "", role: "" });
  useEffect(() => {
    async function getUserData() {
      const response = await checkToken(token);
      setUserData(response.data);
    }
    getUserData();
  }, [token]);

  const theme = useTheme();
  const customizer = useSelector((state) => state.customizer);

  return (
    <MainWrapper>
      <DataContext.Provider value={{ userData }}>
        <Sidebar />
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(customizer.isCollapse && {
              [theme.breakpoints.up("lg")]: {
                ml: `${customizer.MiniSidebarWidth}px`,
              },
            }),
          }}
        >
          <Header />
          <Container
            sx={{
              maxWidth:
                customizer.isLayout === "boxed" ? "lg" : "100%!important",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          </Container>
        </PageWrapper>
      </DataContext.Provider>
    </MainWrapper>
  );
};

export default AdminLayout;

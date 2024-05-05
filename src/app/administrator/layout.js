"use client";
import { styled, Box, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import Sidebar from '@/layouts/administrator/Sidebar';
import Header from '@/layouts/administrator/Header';
import React from 'react';
import { useSelector } from 'react-redux';

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


const AdminLayout = ({ children }) => {
    const theme = useTheme();
    const customizer = useSelector((state) => state.customizer);

    return (
        <MainWrapper>
            <Sidebar />
            <PageWrapper className="page-wrapper"
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
                        maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
                    }}
                >
                    <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                        {children}
                    </Box>
                </Container>
            </PageWrapper>
        </MainWrapper>
    );
};

export default AdminLayout;

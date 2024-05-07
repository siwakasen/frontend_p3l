'use client';
import { styled, Box, useTheme } from '@mui/material';
import Container from "@mui/material/Container";
import Header from '@/layouts/user/Header';
import Navigation from '@/layouts/user/Navbar';
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { checkToken } from '@/services/auth/auth';
import { setUserLogin } from '@/utils/constants';

const MainWrapper = styled(Box)(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%'
}));

const PageWrapper = styled(Box)(() => ({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent",
    paddingBottom: "60px"
}));

const UserLayout = ({ children }) => {
    const theme = useTheme();
    const customizer = useSelector((state) => state.customizer);

    const dispatch = useDispatch();
    const token = Cookies.get("token");

    if(!token) dispatch(setUserLogin(null));

    useEffect(() => {
        async function check() {
            if (token) {
                const data = await checkToken(token);
                if(data.data.role != "User") dispatch(setUserLogin(null));
                else dispatch(setUserLogin(data.data));
            }
        }
        check();
    }, [token]);

    return (
        <MainWrapper>
            <PageWrapper className="page-wrapper">
                <Header />
                <Navigation />
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
}

export default UserLayout;
import { styled, Container, Box, useTheme } from '@mui/material';
import React, { useState } from 'react';

const MainWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%'
}));

const PageWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexGrow: 1,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent"
}));

const AdminLayout = ({ children }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <MainWrapper>
            <PageWrapper>
                {children}
            </PageWrapper>
        </MainWrapper>
    );
}
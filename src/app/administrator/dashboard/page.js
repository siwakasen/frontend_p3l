"use client";
import React from "react";
import PageContainer from '@/components/container/PageContainer';
import { Box, Grid } from '@mui/material';
import TopCards from '@/components/administrator/dashboard/TopCards';

const Page = () => {
    return (
        <PageContainer title="Dashboard" description="Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <TopCards />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}

export default Page;
"use client";
import React, { useEffect, useState } from "react";
import PageContainer from '@/components/container/PageContainer';
import { Box, Grid } from '@mui/material';
import TopCards from '@/components/administrator/dashboard/TopCards';
import RevenueUpdates from "@/components/administrator/dashboard/RevenueUpdates";
import YearlyBreakup from "@/components/administrator/dashboard/YearlyBreakup";
import MonthlyEarnings from "@/components/administrator/dashboard/MonthlyEarnings";

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
    }, []);
    return (
    <PageContainer title="Dashboard" description="Dashboard">
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <TopCards />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <RevenueUpdates isLoading={isLoading} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={12}>
                        <YearlyBreakup isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                        <MonthlyEarnings isLoading={isLoading} />
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </PageContainer>
    );
}

export default Page;
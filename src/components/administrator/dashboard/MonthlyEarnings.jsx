import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar, IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '../shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from "./skeleton/MonthlyEarningsTwoCard";
import { getDefaultData } from "@/services/dashboard/getData";


const MonthlyEarnings = ({isLoading}) => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    getDefaultData().then((response) => {
      setData(response.data);
    });
  }, []);

  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const errorlight = theme.palette.error.light;
  const successlight = theme.palette.success.light;

  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      // theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      enabled: false,
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20]
    },
  ];

  return (
    <>
      {
        isLoading ? (
          <SkeletonMonthlyEarningsTwoCard />
        ) : (
          <DashboardCard
            title="Rata-rata Pendapatan Bulanan"
            action={
              <Fab color="secondary" size="medium">
                <IconCurrencyDollar width={24} />
              </Fab>
            }
            footer={
              <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
            }
          >
            <>
              <Typography variant="h3" fontWeight="700" mt="-20px">
                {
                  data.hasOwnProperty('averageMonthlyEarning') ? (
                    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data['averageMonthlyEarning'])
                  ) : (
                    "Rp 0"
                  )
                }
              </Typography>
              <Stack direction="row" spacing={1} my={1} alignItems="center">
                <Avatar sx={{ bgcolor: data['averageMonthlyEarning'] > data['lastYearAverageMonthlyEarning'] ? successlight : errorlight, width: 23, height: 23 }}>
                    {data['averageMonthlyEarning'] > data['lastYearAverageMonthlyEarning'] ? (
                      <IconArrowUpLeft size={18} color="#39B69A" />
                    ) : (
                      <IconArrowDownRight size={18} color="#FF5B5B" />
                    )}
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600">
                  {data.hasOwnProperty('averageMonthlyEarning') && data['lastYearAverageMonthlyEarning'] > 0 ? (
                    <>
                      {data['averageMonthlyEarning'] > data['lastYearAverageMonthlyEarning'] ? (
                        <>
                          <span>+{((data['averageMonthlyEarning'] - data['lastYearAverageMonthlyEarning']) / data['lastYearAverageMonthlyEarning'] * 100).toFixed(2)}%</span>
                        </>
                      ) : (
                        <>
                          <span>-{((data['lastYearAverageMonthlyEarning'] - data['averageMonthlyEarning']) / data['lastYearAverageMonthlyEarning'] * 100).toFixed(2)}%</span>
                        </>
                      )}
                    </>
                  ) : (
                    data['averageMonthlyEarning'] > 0 ? (
                      <>
                        <span>+100%</span>
                      </>
                    ) : (
                      <>
                        <span>0%</span>
                      </>
                    )
                  )}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  last year
                </Typography>
              </Stack>
            </>
          </DashboardCard>
        )}
    </>
  );
};

export default MonthlyEarnings;

import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft, IconArrowDownRight } from '@tabler/icons-react';

import DashboardCard from '../shared/DashboardCard';
import SkeletonYearlyBreakupCard from "./skeleton/YearlyBreakupCard";

import { getDashboardData } from "@/services/administrator/dashboard/getData";


const YearlyBreakup = ({ isLoading }) => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    getDashboardData().then((response) => {
      setData(response.data.ppTahunan);
    });
  }, []);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: ['Tahun Ini', 'Tahun Lalu'],
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  
  let seriescolumnchart = [0,0];

  if (Object.keys(data).length > 0) {
    seriescolumnchart = [data.tahun_ini, data.tahun_lalu];
  }

  return (
    <>
      {
        isLoading ? (
          <SkeletonYearlyBreakupCard />
        ) : (
          <DashboardCard title="Pesanan Tahunan">
            <Grid container spacing={3}>
              {/* column */}
              <Grid item xs={7} sm={8}>
                <Typography variant="h3" fontWeight="700">{
                  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.tahun_ini)
                }
                </Typography>
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <Avatar sx={{ bgcolor: data.tahun_ini > data.tahun_lalu ? successlight : errorlight, width: 23, height: 23 }}>
                    {data.tahun_ini > data.tahun_lalu ? (
                      <IconArrowUpLeft size={18} color="#39B69A" />
                    ) : (
                      <IconArrowDownRight size={18} color="#FF5B5B" />
                    )}
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="600">
                    {data.tahun_lalu > 0 ? (
                      <>
                        {data.tahun_ini > data.tahun_lalu ? (
                          <>
                            <span>+{((data.tahun_ini - data.tahun_lalu) / data.tahun_lalu * 100).toFixed(2)}%</span>
                          </>
                        ) : (
                          <>
                            <span>-{((data.tahun_lalu - data.tahun_ini) / data.tahun_lalu * 100).toFixed(2)}%</span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {data.tahun_ini > 0 ? (
                          <>
                            <span>+100%</span>
                          </>
                        ) : (
                          <>
                            <span>0%</span>
                          </>
                        )}
                      </>
                    )}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    dari tahun lalu
                  </Typography>
                </Stack>
                <Stack spacing={3} mt={5} direction="row">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
                    ></Avatar>
                    <Typography variant="subtitle2" color="textSecondary">
                      {new Date().getFullYear()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
                    ></Avatar>
                    <Typography variant="subtitle2" color="textSecondary">
                      {new Date().getFullYear() - 1}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              {/* column */}
              <Grid item xs={1} sm={4}>
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="donut"
                  height={120}
                  width={"100%"}
                />
              </Grid>
            </Grid>
          </DashboardCard>
        )}
    </>

  );
};

export default YearlyBreakup;
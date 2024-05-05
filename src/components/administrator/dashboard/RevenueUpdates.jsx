import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { MenuItem, Grid, Stack, Typography, Button, Avatar, Box } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import CustomSelect from '../forms/CustomSelect';
import SkeletonRevenueUpdatesTwoCard from './skeleton/RevenueUpdatesTwoCard';

import { getDefaultData } from '@/services/administrator/dashboard/getData';

const RevenueUpdates = ({isLoading}) => {
  const [defaultMonth, setdefaultMonth] = React.useState(
    new Date().getMonth() + 1
  )
  
  const [month, setMonth] = React.useState([]);

  React.useEffect(() => {
    getDefaultData().then((response) => {
      setMonth(response.data.ppBulanan);
    });
  }, []);

  const handleChange = (event) => {
    setdefaultMonth(event.target.value);
  };

  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState([]);

  React.useEffect(() => {
    getDefaultData().then((response) => {
      setData(response.data.ppHarian);
      setDate(response.data.ppHarian.map((item) => item.tanggal));
    });
  }, []);
  
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 360,
      stacked: true,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '10%',
        borderRadius: [0],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
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
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
        },
      },
      tickAmount: 5,
    },
    xaxis: {
      categories: date,
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const pendapatan = [];
  const pengeluaran = [];

  data.map((item) => {
    pendapatan.push(item.total_pendapatan);
    pengeluaran.push(item.total_pengeluaran);
  });

  pengeluaran.map((item, index) => {
    pengeluaran[index] = -item;
  });

  const seriescolumnchart = [
    {
      name: 'Pengeluaran hari ini',
      data: pengeluaran
    },
    {
      name: 'Pendapatan hari ini',
      data: pendapatan
    },
  ];

  return (
    <>
      {
        isLoading ? (
          <SkeletonRevenueUpdatesTwoCard />
        ) : (
          <DashboardCard
            title="Pendapatan Bulanan"
            subtitle="Pendapatan bulanan dan pengeluaran bulanan"
            action={
              <CustomSelect
                labelId="month-dd"
                id="month-dd"
                size="small"
                value={month.length > 0 ? defaultMonth : 0 }
                onChange={handleChange}
              >
                {
                month.length > 0 ?
                  month.map((item, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {item.bulan}
                    </MenuItem>
                  ))
                  : 
                  <MenuItem value={0}>No Data</MenuItem>
                }
              </CustomSelect>
            }
          >
            <Grid container spacing={3}>
              {/* column */}
              <Grid item xs={12} sm={8}>
                <Box className="rounded-bars">
                  <Chart
                    options={optionscolumnchart}
                    series={seriescolumnchart}
                    type="bar"
                    height={360}
                    width={"100%"}
                  />
                </Box>
              </Grid>
              {/* column */}
              <Grid item xs={12} sm={4}>
                <Stack spacing={3} mt={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box>
                      <Typography variant="h3" fontWeight="700">
                        {
                          month.length > 0 && month[defaultMonth - 1] !== undefined ?
                            (month[defaultMonth - 1].total_pendapatan - month[defaultMonth - 1].total_pengeluaran) > 0 ?
                              new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(month[defaultMonth - 1].total_pendapatan - month[defaultMonth - 1].total_pengeluaran) 
                            : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0)
                          : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0)
                        }
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Total Pendapatan
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <Stack spacing={3} my={5}>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      sx={{ width: 9, mt: 1, height: 9, bgcolor: primary, svg: { display: 'none' } }}
                    ></Avatar>
                    <Box>
                      <Typography variant="subtitle1" color="textSecondary">
                        Pendapatan bulan ini
                      </Typography>
                      <Typography variant="h5">
                        {
                          month.length > 0 && month[defaultMonth - 1] !== undefined ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(month[defaultMonth - 1].total_pendapatan) 
                          : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0)
                        }
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      sx={{ width: 9, mt: 1, height: 9, bgcolor: secondary, svg: { display: 'none' } }}
                    ></Avatar>
                    <Box>
                      <Typography variant="subtitle1" color="textSecondary">
                        Pengeluaran bulan ini
                      </Typography>
                      <Typography variant="h5">
                        {
                          month.length > 0 && month[defaultMonth - 1] !== undefined ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(month[defaultMonth - 1].total_pengeluaran) 
                          : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0)
                        }
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <Button color="primary" variant="contained" fullWidth>
                  View Full Report
                </Button>
              </Grid>
            </Grid>
          </DashboardCard>
        )}


    </>
  );
};

export default RevenueUpdates;

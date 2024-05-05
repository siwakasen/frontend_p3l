import Image from "next/image";
import { Box, CardContent, Grid, Typography } from "@mui/material";

import { useEffect, useState } from "react";

// api services
import { getDefaultData } from "@/services/administrator/dashboard/getData";

const topcards = [
  {
    title: "Karyawan",
    digits: "0",
    bgcolor: "primary",
  },
  {
    title: "Penitip",
    digits: "0",
    bgcolor: "warning",
  },
  {
    title: "Produk",
    digits: "0",
    bgcolor: "secondary",
  },
  { 
    title: "Pesanan",
    digits: "0",
    bgcolor: "error",
  }
];

const TopCards = () => {
  const fetchData = getDefaultData();
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    fetchData.then((result) => {
      setDashboardData(result.data);
    });
  }, []);

  return (
    <Grid container spacing={3} mt={1}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={3} key={i}>
          <Box bgcolor={topcard.bgcolor + ".light"}>
            <CardContent>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="h4"
                fontWeight={600}
              >
                {dashboardData[topcard.title.toLowerCase()] || topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;

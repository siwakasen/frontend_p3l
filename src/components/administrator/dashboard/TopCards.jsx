import Image from "next/image";
import { Box, CardContent, Grid, Typography } from "@mui/material";

import icon2 from "/public/images/svgs/icon-user-male.svg";
import icon3 from "/public/images/svgs/icon-briefcase.svg";
import icon4 from "/public/images/svgs/icon-mailbox.svg";
import icon5 from "/public/images/svgs/icon-favorites.svg";

import { useEffect, useState } from "react";

// api services
import { getDashboardData } from "@/services/administrator/dashboard/getData";

const topcards = [
  {
    icon: icon2,
    title: "Karyawan",
    digits: "0",
    bgcolor: "primary",
  },
  {
    icon: icon3,
    title: "Penitip",
    digits: "0",
    bgcolor: "warning",
  },
  {
    icon: icon4,
    title: "Produk",
    digits: "0",
    bgcolor: "secondary",
  },
  { 
    icon: icon5,
    title: "Pesanan",
    digits: "0",
    bgcolor: "error",
  }
];

const TopCards = () => {
  const fetchData = getDashboardData();
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

import React from "react";
import { useSelector } from "react-redux";
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  ListItemIcon,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import {
  IconCake,
  IconCircles,
  IconBread,
  IconBeer,
  IconGift,
  IconFriends,
  IconSortAscending2,
  IconSortDescending2,
  IconAd2,
} from "@tabler/icons-react";
import CustomTextField from "@/components/administrator/forms/CustomTextField";

const ProductFilter = ({ setSortBy, setFilters }) => {
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const filterCategory = [
    {
      id: 1,
      filterbyTitle: "Filter by Category",
    },
    {
      id: 2,
      name: "All",
      sort: "All",
      icon: IconCircles,
    },
    {
      id: 3,
      name: "Cake",
      sort: "cake",
      icon: IconCake,
    },
    {
      id: 9,
      name: "Roti",
      sort: "roti",
      icon: IconBread,
    },
    {
      id: 10,
      name: "Minuman",
      sort: "minuman",
      icon: IconBeer,
    },
    {
      id: 11,
      name: "Hampers",
      sort: "hampers",
      icon: IconGift,
    },
    {
      id: 12,
      name: "Titipan",
      sort: "titipan",
      icon: IconFriends,
    },
    {
      id: 6,
      devider: true,
    },
  ];
  const filterbySort = [
    { id: 1, value: "newest", label: "Newest", icon: IconAd2 },
    {
      id: 2,
      value: "priceDesc",
      label: "Price: High-Low",
      icon: IconSortAscending2,
    },
    {
      id: 3,
      value: "priceAsc",
      label: "Price: Low-High",
      icon: IconSortDescending2,
    },
  ];

  function handlePriceFilter(e) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <List>
        {/* ------------------------------------------- */}
        {/* Category filter */}
        {/* ------------------------------------------- */}
        {filterCategory.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <Typography
                variant="subtitle2"
                fontWeight={600}
                px={3}
                mt={2}
                pb={2}
                key={filter.id}
              >
                {filter.filterbyTitle}
              </Typography>
            );
          } else if (filter.devider) {
            return <Divider key={filter.id} />;
          }

          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              onClick={() =>
                setFilters((prev) => ({ ...prev, category: filter.name }))
              }
              key={filter.id}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <filter.icon stroke="1.5" size="19" />
              </ListItemIcon>
              <ListItemText>{filter.name}</ListItemText>
            </ListItemButton>
          );
        })}
        {/* ------------------------------------------- */}
        {/* Sort by */}
        {/* ------------------------------------------- */}
        <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
          Sort By
        </Typography>
        {filterbySort.map((filter) => {
          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              onClick={() => setSortBy(filter.value)}
              key={filter.id + filter.label + filter.value}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <filter.icon stroke="1.5" size={19} />
              </ListItemIcon>
              <ListItemText>{filter.label}</ListItemText>
            </ListItemButton>
          );
        })}
        <Divider></Divider>
        <Typography variant="h6" px={3} mt={3} pb={2}>
          By Pricing
        </Typography>
        <Box p={3} pt={0}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CustomTextField
              placeholder="Rp MIN"
              name="minPrice"
              type="number"
              onChange={handlePriceFilter}
            />
            <Box>-</Box>
            <CustomTextField
              placeholder="Rp MAX"
              name="maxPrice"
              type="number"
              onChange={handlePriceFilter}
            />
          </Stack>
        </Box>
        <Divider></Divider>
        <Box p={3}>
          <Button
            variant="contained"
            onClick={() => {
              setSortBy("newest");
              setFilters({ category: "All", minPrice: "", maxPrice: "" });
            }}
            fullWidth
          >
            Reset Filters
          </Button>
        </Box>
      </List>
    </>
  );
};

export default ProductFilter;

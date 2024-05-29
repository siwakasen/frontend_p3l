import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import Link from "next/link";
import {
  Box,
  Grid,
  Stack,
  CardContent,
  useMediaQuery,
  Typography,
  Rating,
  Fab,
  Tooltip,
  Button,
  Skeleton,
  CardMedia,
  Chip,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import { IconBasket, IconMenu2 } from "@tabler/icons-react";
import BlankCard from "@/components/shared/BlankCard";
import { API_URL_IMAGE } from "@/utils/constants";
import { convertToSlug } from "@/utils/constants";

const ProductList = ({
  onClick,
  hampers,
  produk,
  isLoading,
  sortBy,
  filters,
  kategori,
}) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const getVisibleProduct = (rows, sortBy, filters, search) => {
    // SORT BY
    if (sortBy === "newest") {
      rows = orderBy(rows, ["created_at"], ["desc"]);
    }
    if (sortBy === "priceDesc") {
      rows = orderBy(rows, ["harga"], ["desc"]);
    }
    if (sortBy === "priceAsc") {
      rows = orderBy(rows, ["harga"], ["asc"]);
    }

    // FILTER PRODUCTS
    if (filters.category !== "All") {
      const findKategori = kategori.find(
        (_kategori) => _kategori.nama_kategori === filters.category
      );

      if (filters.category !== "Hampers")
        rows = rows.filter(
          (_product) => _product.id_kategori == findKategori.id_kategori
        );
      else rows = rows.filter((_product) => _product.id_kategori == null);
    }

    //FILTER PRODUCTS BY Search
    if (search !== "") {
      rows = rows.filter((_row) =>
        _row.nama.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    //FILTER PRODUCTS BY Price
    if (filters.minPrice !== "" && filters.maxPrice !== "") {
      rows = rows.filter(
        (_product) =>
          _product.harga >= filters.minPrice &&
          _product.harga <= filters.maxPrice
      );
    } else if (filters.minPrice !== "") {
      rows = rows.filter((_product) => _product.harga >= filters.minPrice);
    } else if (filters.maxPrice !== "") {
      rows = rows.filter((_product) => _product.harga <= filters.maxPrice);
    }

    return rows;
  };

  const [cartalert, setCartalert] = useState(false);

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCartalert(false);
  };

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  function renameKeys(data) {
    return data.map((item) => {
      if (item.nama_produk) {
        return {
          ...item,
          nama: item.nama_produk,
          harga: item.harga_produk,
          foto: item.foto_produk,
          status: item.status_produk,
        };
      } else if (item.nama_hampers) {
        return {
          ...item,
          nama: item.nama_hampers,
          harga: item.harga_hampers,
          foto: item.foto_hampers,
          status: item.status_hampers,
        };
      }
      return item;
    });
  }

  useEffect(() => {
    setRows(renameKeys([...produk, ...hampers]));
  }, [produk, hampers]);

  useEffect(() => {
    const visibleProduct = getVisibleProduct(rows, sortBy, filters, search);
    setFilteredRows(visibleProduct);
  }, [search, sortBy, filters, rows]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  // console.log(produk);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">Products</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          <ProductSearch handleSearch={handleSearch} />
        </Box>
      </Stack>
      <Grid container spacing={3}>
        {filteredRows.length > 0 ? (
          <>
            {filteredRows.map((product) => {
              if (product.status == 1)
                return (
                  <Grid
                    item
                    xs={12}
                    lg={4}
                    md={4}
                    sm={6}
                    display="flex"
                    alignItems="stretch"
                    key={product.nama}
                  >
                    <BlankCard className="hoverCard">
                      <Link
                        href={
                          product.nama_produk
                            ? `/produk/${convertToSlug(product.nama)}`
                            : `/hampers/${convertToSlug(product.nama)}`
                        }
                      >
                        {isLoading || !product.foto ? (
                          <>
                            <Skeleton
                              variant="square"
                              width={270}
                              height={300}
                            ></Skeleton>
                          </>
                        ) : (
                          <Box
                            component="div"
                            sx={{ position: "relative", height: 286.66 }}
                            className="bg-slate-300"
                            width="100%"
                            key={product.id_produk || product.id_hampers}
                          >
                            <CardMedia
                              component="img"
                              image={API_URL_IMAGE + product.foto}
                              alt="products"
                              sx={{
                                height: 286.66,
                              }}
                            />

                            {product.nama_produk ? (
                              <Chip
                                label={
                                  product.limit_produk_hari_ini == null
                                    ? product.id_kategori != 4
                                      ? "Kuota 0"
                                      : "Ready Stok"
                                    : `Kuota ${product.limit_produk_hari_ini.limit}`
                                }
                                sx={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  zIndex: 10,
                                  bgcolor: (theme) =>
                                    theme.palette.primary.light,
                                  color: (theme) => theme.palette.primary.main,
                                  borderRadius: "6px",
                                  margin: "12px",
                                }}
                                size="small"
                              />
                            ) : null}
                          </Box>
                        )}
                      </Link>
                      <Tooltip title="Add To Cart">
                        <Fab
                          size="small"
                          color="primary"
                          onClick={() =>
                            dispatch(addToCart(product)) && handleClick()
                          }
                          sx={{
                            bottom: "75px",
                            right: "15px",
                            position: "absolute",
                          }}
                        >
                          <IconBasket size="16" />
                        </Fab>
                      </Tooltip>
                      <CardContent sx={{ p: 3, pt: 2 }}>
                        <Typography variant="h6">{product.nama}</Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          mt={1}
                        >
                          <Typography variant="h6">
                            Rp.{" "}
                            {Intl.NumberFormat("id-ID").format(product.harga)}
                          </Typography>
                          {product.status_produk &&
                            product.id_kategori != 4 && (
                              <Typography sx={{ mt: "1px" }}>
                                Stok: {product.stok_produk}
                              </Typography>
                            )}
                        </Stack>
                      </CardContent>
                    </BlankCard>
                  </Grid>
                );
            })}
          </>
        ) : (
          <>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <Box textAlign="center" mt={6}>
                {/* <img src={""} alt="cart" width="200px" /> */}
                <Typography variant="h2">There is no Product</Typography>
                <Typography variant="h6" mb={3}>
                  The Product you are searching is no longer available.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => dispatch(filterReset())}
                >
                  Try Again
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;

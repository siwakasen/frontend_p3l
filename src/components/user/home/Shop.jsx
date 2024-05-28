import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ProductList from "./skeleton/ProductList";
import ProductSidebar from "./skeleton/ProductSidebar";
import AppCard from "@/components/shared/AppCard";
import { getAllProduk } from "@/services/produk/produk";
import { getAllHampers } from "@/services/hampers/hampers";
import { getAllKategori } from "@/services/kategori/kategori";

const Shop = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const [produk, setProduk] = useState([]);
  const [hampers, setHampers] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    async function fetchDataProduk() {
      const response = await getAllProduk();
      setProduk(
        response.data?.filter((_data) => !_data.nama_produk.includes("1/2"))
      );
    }
    async function fetchDataHampers() {
      const response = await getAllHampers();
      setHampers(response.data);
    }
    async function fetchDataKategori() {
      const response = await getAllKategori();
      setKategori(response.data);
    }

    fetchDataProduk()
      .then(() => fetchDataHampers())
      .then(() => fetchDataKategori());

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box mt={2}>
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <ProductSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          setSortBy={setSortBy}
          setFilters={setFilters}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <ProductList
            onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
            hampers={hampers}
            produk={produk}
            isLoading={isLoading}
            sortBy={sortBy}
            filters={filters}
            kategori={kategori}
          />
        </Box>
      </AppCard>
    </Box>
  );
};

export default Shop;

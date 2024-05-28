import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import ChildCard from "@/components/shared/ChildCard";
import Image from "next/image";
import { API_URL_IMAGE } from "@/utils/constants";
import { ProdukDetail } from "@/components/user/produk/ProdukDetail";
import { ProdukRelated } from "@/components/user/produk/ProdukRelated";

export const DetailProduk = ({ items, kategori, relateds }) => {
  const item = items.length > 1 ? items[0] : items[0];
  return (
    <PageContainer title="Shop List" description="this is Shop List page">
      <Grid
        container
        spacing={3}
        sx={{ maxWidth: { lg: "1055px", xl: "1200px" } }}
      >
        <Grid item xs={12} sm={12} lg={12}>
          <ChildCard>
            {/* ------------------------------------------- */}
            {/* Carousel */}
            {/* ------------------------------------------- */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                <Box
                  component="div"
                  style={{
                    width: "100%",
                    height: "539px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={
                      API_URL_IMAGE + (item.foto_produk || item.foto_hampers)
                    }
                    fill
                    sizes="100%"
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    alt="produk"
                    priority
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <ProdukDetail item={item} kategori={kategori} items={items} />
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
        {/* <Grid item xs={12} sm={12} lg={12}>
          <ProductDesc />
        </Grid> */}
        <Grid item xs={12} sm={12} lg={12}>
          <ProdukRelated relateds={relateds} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

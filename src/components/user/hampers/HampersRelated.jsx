import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import BlankCard from "@/components/shared/BlankCard";
import Image from "next/image";
import { convertToSlug } from "@/utils/constants";
import { API_URL_IMAGE } from "@/utils/constants";

export const ProdukRelated = ({ relateds }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const related = relateds.length > 4 ? relateds.slice(0, 4) : relateds;

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Related Products
      </Typography>
      <Grid container spacing={3}>
        {related.map((product) => (
          <Grid
            item
            xs={12}
            lg={3}
            sm={4}
            display="flex"
            alignItems="stretch"
            key={product.nama_produk || product.nama_hampers}
          >
            <BlankCard sx={{ p: 0 }} className="hoverCard">
              <Link
                href={`/produk/${convertToSlug(
                  product.nama_produk || product.nama_hampers
                )}`}
              >
                {isLoading ? (
                  <Skeleton
                    variant="square"
                    animation="wave"
                    width="100%"
                    height={270}
                  ></Skeleton>
                ) : (
                  <>
                    <Box
                      component="div"
                      sx={{
                        height: "270px",
                        width: "270px",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={
                          API_URL_IMAGE +
                          (product.foto_produk || product.foto_hampers)
                        }
                        fill
                        sizes="100%"
                        style={{
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                        alt="produk"
                      />
                    </Box>
                  </>
                )}
              </Link>
              <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography fontWeight={600}>
                  {product.nama_produk || product.nama_hampers}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Stack direction="row" alignItems="center">
                    <Typography variant="h5">
                      ${product.harga_produk || product.harga_hampers}
                    </Typography>
                    <Typography
                      color={"GrayText"}
                      ml={1}
                      sx={{ textDecoration: "line-through" }}
                    >
                      ${product.harga_produk || product.harga_hampers}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

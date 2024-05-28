"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { slugToRealName } from "@/utils/constants";
import { DetailHampers } from "@/components/user/hampers/DetailHampers";
import { searchHampers, getAllHampers } from "@/services/hampers/hampers";
import { getAllKategori } from "@/services/kategori/kategori";
import dayjs from "dayjs";

export default function Page({ params }) {
  const { slug } = params;

  const [hamper, setHamper] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [kategori, setKategori] = useState([]);
  const [relateds, setRelateds] = useState([]);
  const today = new Date();

  const [value, setValue] = useState(
    hamper[0]?.id_kategori == 4
      ? dayjs(new Date(today))
      : dayjs(new Date(today.setDate(today.getDate() + 2)))
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [hamperResponse, kategoriResponse, relatedsResponse] =
          await Promise.all([
            searchHampers(slugToRealName(slug), value.format("YYYY-MM-DD")),
            getAllKategori(),
            getAllHampers(),
          ]);

        setHamper(hamperResponse.data);
        setKategori(kategoriResponse.data);
        setRelateds(relatedsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug, value]);

  function findKategori(id) {
    return kategori.find((item) => item.id_kategori === id);
  }

  return isLoading ? (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <CircularProgress size="4rem" color="primary" />
      </Box>
    </>
  ) : (
    hamper && (
      <DetailHampers
        items={hamper}
        kategori={findKategori(5)}
        relateds={relateds.filter(
          (item) =>
            item.nama_hampers != hamper[0].nama_hampers &&
            item.status_hampers !== 0
        )}
        value={value}
        setValue={setValue}
      />
    )
  );
}

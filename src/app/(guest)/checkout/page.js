"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/container/PageContainer";
import { Checkout } from "@/components/user/pesanan/Checkout";
import { getSingleHampers } from "@/services/hampers/hampers";
import { getSingleProduk } from "@/services/produk/produk";
import { checkToken } from "@/services/auth/auth";

export default function Page() {
  const searchParams = useSearchParams();
  const produk = searchParams.getAll("produk")[0]?.split(" ");
  const hampers = searchParams.getAll("hampers")[0]?.split(" ");
  const date = searchParams.get("date");
  const isCart = searchParams.get("isCart");
  const statusPesanan = searchParams.get("statusPesanan");

  const [produkData, setProdukData] = useState([]);
  const [hampersData, setHampersData] = useState([]);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     if (!produk) return;
  //     const productPromises = produk.map(async (item) => {
  //       const data = await getSingleProduk(item);
  //       return data;
  //     });

  //     const product = await Promise.all(productPromises);
  //     setProdukData(product);
  //   }

  //   async function fetchHampers() {
  //     if (!hampers) return;
  //     const hampersPromises = hampers.map(async (item) => {
  //       const data = await getSingleHampers(item);
  //       return data;
  //     });

  //     const hamper = await Promise.all(hampersPromises);
  //     setHampersData(hamper);
  //   }

  //   async function fetchDataUser() {
  //     const response = await checkToken();
  //     setUser(response.data);
  //   }

  //   fetchData()
  //     .then(() => fetchHampers())
  //     .then(() => fetchDataUser());
  // }, []);

  useEffect(() => {
    async function fetchData() {
      if (produk) {
        const productPromises = produk.map(async (item) => {
          const data = await getSingleProduk(item);
          return data;
        });

        const products = await Promise.all(productPromises);
        setProdukData(products);
      }
    }

    async function fetchHampers() {
      if (hampers) {
        const hampersPromises = hampers.map(async (item) => {
          const data = await getSingleHampers(item);
          return data;
        });

        const hampersData = await Promise.all(hampersPromises);
        setHampersData(hampersData);
      }
    }

    async function fetchDataUser() {
      const response = await checkToken();
      setUser(response.data);
    }

    async function fetchAllData() {
      await Promise.all([fetchData(), fetchHampers(), fetchDataUser()]);
    }

    fetchAllData();
  }, []);

  return (
    <PageContainer
      title="Checkout"
      description="Checkout product that you need"
    >
      <Checkout
        user={user}
        produk={[...produkData, ...hampersData]}
        date={date}
        isCart={isCart}
        statusPesanan={statusPesanan}
      />
    </PageContainer>
  );
}

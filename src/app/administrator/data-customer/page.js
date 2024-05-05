'use client'
import {Alert, Divider} from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import {useState, useEffect} from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { searchDataCustomer, getDataHistory } from "@/services/data-customer/dataCustomer";
import { DataCustomerSearchTable } from "@/components/administrator/data-customer/DataCustomerTable";
import { DataCustomerHistoryTable } from "@/components/administrator/data-customer/DataCustomerHistoryTable";
export default function Page() {
  const [dataCustomer, setDataCustomer] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await searchDataCustomer('');
      console.log(response.data);
      setDataCustomer(response.data);
    };
    fetchData();
  }, []);

  const handleSelectedId = (id) => {
    console.log(id);
    const fetchData = async () => {
      const response = await getDataHistory(id);
      console.log(response.data);
      setDataHistory(response.data);
    };
    fetchData();
  }

  const headCellsDataCustomer = [
    {
      id: "nama",
      numeric: false,
      disablePadding: false,
      label: "Nama Customer",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "no_hp",
      numeric: false,
      disablePadding: false,
      label: "No HP",
    },
  ];

  const headCellsDataHistory = [
    {
      id: 'id_pesanan',
      numeric: false,
      disablePadding: false,
      label: 'ID Pesanan', 
    },
    {
      id: 'detail_pesanan',
      numeric: false,
      disablePadding: false,
      label: 'Detail Pesanan',
    },
    {
      id: 'total_harga',
      numeric: false,
      disablePadding: false,
      label: 'Total Harga',
    },
    {
      id: 'ongkir',
      numeric: false,
      disablePadding: false,
      label: 'Ongkir',
    },
    {
      id: 'total_bayar',
      numeric: false,
      disablePadding: false,
      label: 'Total Bayar',
    },
    {
      id: 'tip',
      numeric: false,
      disablePadding: false,
      label: 'Tip',
    },
    {
      id: 'poin_dipakai',
      numeric: false,
      disablePadding: false,
      label: 'Poin Dipakai',
    },
    {
      id: 'poin_didapat',
      numeric: false,
      disablePadding: false,
      label: 'Poin Didapat',
    },
    {
      id: 'tanggal_pesanan',
      numeric: false,
      disablePadding: false,
      label: 'Tanggal Pesanan',
    },
    {
      id: 'tanggal_diambil',
      numeric: false,
      disablePadding: false,
      label: 'Tanggal Diambil',
    },
    {
      id: 'tanggal_pembayaran',
      numeric: false,
      disablePadding: false,
      label: 'Tanggal Pembayaran',
    },
    {
      id: 'alamat_pengiriman',
      numeric: false,
      disablePadding: false,
      label: 'Alamat Pengiriman',
    },
    {
      id: 'status_transaksi',
      numeric: false,
      disablePadding: false,
      label: 'Status Transaksi',
    },
    {
      id: 'metode_pemesanan',
      numeric: false,
      disablePadding: false,
      label: 'Metode Pemesanan',
    },
    {
      id: 'metode_pengiriman',
      numeric: false,
      disablePadding: false,
      label: 'Metode Pengiriman',
    },
  ];


  const BCrumb = [
    {
      title: "Administrator",
    },
    {
      title: "Data Customer",
    },
  ];


  return (
    <PageContainer title={"Data Customer"} description="Data customer and it's history">
      <Breadcrumb title="Data Customer" items={BCrumb} />
      <Alert severity="info" icon={false} sx={{mb:"8px", fontSize:"14px", mx:2}}>
        Search Data Customer
      </Alert>
      {/* Search Data Customer */}
      <DataCustomerSearchTable
        data={dataCustomer}
        headCells={headCellsDataCustomer}
        handleSelectedId={handleSelectedId}
      />
      <Divider sx={{mb:'20px', mx:2}}></Divider>
      <Alert severity="info" icon={false} sx={{mb:"8px", fontSize:"14px", mx:2}}>
        Data History Customer
      </Alert>
      {/* Data History */}
      <DataCustomerHistoryTable
        data={dataHistory}
        headCells={headCellsDataHistory}
      />
    </PageContainer>
  );
}

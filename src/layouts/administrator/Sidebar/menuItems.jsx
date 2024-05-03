import { uniqueId } from "lodash";
import {
  IconPackage,
  IconAperture,
  IconUsersGroup,
  IconPaperclip,
  IconUserCircle,
  IconLicense,
  IconFriends,
  IconGift,
  IconCarrot,
  IconTruckLoading,
} from "@tabler/icons-react";

const MenuItem = [
  {
    navLabel: true,
    subheader: "Halaman Utama",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconAperture,
    href: "/administrator/dashboard",
    access: "All",
  },
  {
    navLabel: true,
    subheader: "Data Master",
  },
  {
    id: uniqueId(),
    title: "Produk",
    icon: IconPackage,
    href: "/administrator/produk",
    access: "Admin",
  },
  {
    id: uniqueId(),
    title: "Karyawan",
    icon: IconUsersGroup,
    href: "/administrator/karyawan",
    access: "Manajer Operasional",
  },
  {
    id: uniqueId(),
    title: "Jabatan",
    icon: IconUserCircle,
    href: "/administrator/jabatan",
    access: "Manajer Operasional",
  },
  {
    id: uniqueId(),
    title: "Penitip",
    icon: IconFriends,
    href: "/administrator/penitip",
    access: "Manajer Operasional",
  },
  {
    id: uniqueId(),
    title: "Hampers",
    icon: IconGift,
    href: "/administrator/hampers",
    access: "Admin",
  },
  {
    id: uniqueId(),
    title: "Pengeluaran Lain",
    icon: IconLicense,
    href: "/administrator/pengeluaran-lain",
    access: "Manajer Operasional",
  },
  {
    id: uniqueId(),
    title: "Pembelian Bahan Baku",
    icon: IconTruckLoading,
    href: "/administrator/pembelian-bahan-baku",
    access: "Manajer Operasional",
  },
  {
    id: uniqueId(),
    title: "Bahan Baku",
    icon: IconCarrot,
    href: "/administrator/bahan-baku",
    access: "Admin",
  },

  {
    id: uniqueId(),
    title: "Resep",
    icon: IconPaperclip,
    href: "/administrator/resep",
    access: "Admin",
  },
  {
    id: uniqueId(),
    title: "Data Customer",
    icon: IconUsersGroup,
    href: "/administrator/data-customer",
    access: "Admin",
  }
];

export default MenuItem;

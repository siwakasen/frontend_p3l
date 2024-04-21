import { uniqueId } from "lodash";
import {
    IconPackage,
    IconAperture,
    IconUsersGroup,
    IconPaperclip
  } from "@tabler/icons-react";

const MenuItem = [
    {
        navLabel: true,
        subheader: "Halaman Utama"
    },
    {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconAperture,
        href: "/administrator/dashboard",
    },
    {
        navLabel: true,
        subheader: "Data Master"
    },
    {
        id: uniqueId(),
        title: "Karyawan",
        icon: IconUsersGroup,
        href: "/administrator/karyawan",
    },
    {
        id: uniqueId(),
        title: "Produk",
        icon: IconPackage,
        href: "/administrator/produk",
    },
    {
        id: uniqueId(),
        title: "Resep",
        icon: IconPaperclip,
        href: "/administrator/resep",
    }
]

export default MenuItem;
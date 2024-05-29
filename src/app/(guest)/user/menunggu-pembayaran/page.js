"use client"
import PageContainer from "@/components/container/PageContainer";
import MenungguPembayaran from "@/components/user/menungguPembayaran";
export default function Page() {
    return (
        <PageContainer title="Menunggu Pembayaran" description="Menunggu Pembayaran">
            <MenungguPembayaran />
        </PageContainer>
    );
}

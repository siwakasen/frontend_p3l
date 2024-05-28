import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Receipt = forwardRef(({ dataPesanan, dataUser }, ref) => {
  return (
    <div
      ref={ref}
      className="p-6 bg-white shadow-md rounded-lg w-full max-w-md mx-auto"
    >
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Atma Kitchen</h1>
        <p>Jl. Centralpark No. 10 Yogyakarta</p>
      </div>
      <div className=" mb-4">
        <div className="col-span-1">
          <p>
            <span className="font-semibold">No Nota:</span>{" "}
            {dataPesanan.no_nota}
          </p>
          <p>
            <span className="font-semibold">Tanggal pesan:</span>{" "}
            {dataPesanan.tanggal_pesanan}
          </p>
          <p>
            <span className="font-semibold">Lunas pada:</span>{" "}
            {dataPesanan.tanggal_pembayaran}
          </p>
          <p>
            <span className="font-semibold">Tanggal ambil:</span>{" "}
            {dataPesanan.tanggal_diambil}
          </p>
        </div>
      </div>
      <div className=" mb-4">
        <p>
          <span className="font-semibold">Customer:</span> {dataUser?.email} /
          {dataUser?.nama}
        </p>
        <p>{dataPesanan.alamat_pengiriman}</p>
        <p>Delivery: {dataPesanan.metode_pengiriman}</p>
      </div>
      {dataPesanan.detail_pesanan.map((item, index) => {
        return (
          <div className="mb-4" key={index}>
            <p>
              <span>
                {item.produk?.nama_produk || item.hampers?.nama_hampers}
              </span>{" "}
              <span className="float-right">{item.subtotal}</span>
            </p>
          </div>
        );
      })}
      <div className="mb-4">
        <p>
          <span>Total Harga</span>{" "}
          <span className="float-right">{dataPesanan.total_harga}</span>
        </p>
        <p>
          <span>Biaya Ongkir</span>{" "}
          <span className="float-right">{dataPesanan.ongkir}</span>
        </p>
        <p>
          <span>
            Potongan {dataPesanan.poin_dipakai ? dataPesanan.poin_dipakai : "0"}{" "}
            poin
          </span>{" "}
          <span className="float-right">
            -{dataPesanan.poin_dipakai ? dataPesanan.poin_dipakai * 100 : "0"}
          </span>
        </p>
        <p className="font-bold">
          <span>Total Bayar</span>{" "}
          <span className="float-right">{dataPesanan.total_bayar}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Poin dari pesanan ini:</span>{" "}
          <span className="float-right">{dataPesanan.poin_didapat ?? 0}</span>
        </p>
        <p>
          <span>Total poin customer:</span>{" "}
          <span className="float-right">{dataUser?.poin}</span>
        </p>
      </div>
    </div>
  );
});

export default Receipt;

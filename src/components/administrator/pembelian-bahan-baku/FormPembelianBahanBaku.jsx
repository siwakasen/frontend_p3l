import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, Select, Modal } from "@mui/material";
import FormCard from "@/components/shared/FormCard";
import LabelForm from "@/components/auth/shared/LabelFormField";
import FormField from "@/components/auth/shared/OutlineTextFormField";
import { getAllBahanBaku } from "@/services/bahan-baku/bahanBaku";
import { useRouter } from "next/navigation";
import CustomBoxModal from "@/components/shared/CustomBoxModalConfirm";

export const FormPembelianBahanBaku = ({
  handleSubmit,
  handleInput,
  input,
  handleOpen,
  open,
  modalText,
}) => {
  const [data, setData] = useState([]);
  const route = useRouter();

  function handleCancel() {
    route.push("/administrator/pembelian-bahan-baku");
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllBahanBaku();
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <FormCard
        title={"Form Pembelian Bahan Baku"}
        footer={
          <>
            <Button
              color="error"
              sx={{
                mr: 1,
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Submit
            </Button>
            <Modal open={open} onClose={handleOpen}>
              <div>
                <CustomBoxModal
                  title={modalText.title}
                  description={modalText.description}
                  footer={
                    <Button
                      color="primary"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={handleSubmit}
                    >
                      {modalText.btnText}
                    </Button>
                  }
                />
              </div>
            </Modal>
          </>
        }
      >
        <form>
          <Grid container spacing={3}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="id_bahan_baku" sx={{ marginTop: "0px" }}>
                Bahan Baku
              </LabelForm>
              <Select
                id="id_bahan_baku"
                name="id_bahan_baku"
                value={input.id_bahan_baku || ""}
                onChange={handleInput}
                fullWidth
                variant="outlined"
                MenuProps={{
                  style: {
                    maxHeight: 300,
                  },
                }}
              >
                {data.map((option) => (
                  <MenuItem
                    style={{ whiteSpace: "normal" }}
                    key={option.id_bahan_baku}
                    value={option.id_bahan_baku}
                  >
                    {option.nama_bahan_baku}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="jumlah" sx={{ marginTop: "0px" }}>
                Jumlah
              </LabelForm>
              <FormField
                type="number"
                name="jumlah"
                id="jumlah"
                value={input.jumlah || ""}
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="harga" sx={{ marginTop: "0px" }}>
                Total Harga
              </LabelForm>
              <FormField
                type="number"
                name="harga"
                id="harga"
                value={input.harga || ""}
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="tanggal_pembelian" sx={{ marginTop: "0px" }}>
                Tanggal Pembelian
              </LabelForm>
              <FormField
                type="date"
                name="tanggal_pembelian"
                id="tanggal_pembelian"
                value={input.tanggal_pembelian || ""}
                onChange={(e) => handleInput(e)}
              />
            </Grid>
          </Grid>
        </form>
      </FormCard>
    </div>
  );
};

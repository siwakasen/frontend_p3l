import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Modal,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import FormCard from "@/components/shared/FormCard";
import LabelForm from "@/components/auth/shared/LabelFormField";
import FormField from "@/components/auth/shared/OutlineTextFormField";
import { useRouter } from "next/navigation";
import CustomBoxModal from "@/components/shared/CustomBoxModalConfirm";
import { getAllPenitip } from "@/services/penitip/penitip";
import { getAllResep } from "@/services/resep/resep";
import { getAllKategori } from "@/services/kategori/kategori";
import CustomCheckbox from "@/components/shared/CustomCheckbox";
import { IconPhotoFilled, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { API_URL_IMAGE } from "@/utils/constants";

export const FormProduk = ({
  input,
  handleSubmit,
  setInput,
  handleOpen,
  open,
  modalText,
}) => {
  const [dataPentip, setDataPentip] = useState([]);
  const [dataResep, setDataResep] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);

  const route = useRouter();

  function handleCancel() {
    route.push("/administrator/produk");
  }

  function handleInput(event) {
    const { name, value } = event.target;
    if (name === "id_kategori" && value == 4) {
      delete input.id_resep;
      setInput((prev) => ({ ...prev }));
    }
    if (name === "foto_produk")
      setInput((prev) => ({ ...prev, [name]: event.target.files[0] }));
    else setInput((prev) => ({ ...prev, [name]: value }));
  }

  function handleDeleteFoto() {
    delete input.foto_produk;
    setInput((prev) => ({ ...prev }));
  }

  useEffect(() => {
    const fetchData = async () => {
      let response = await getAllPenitip();
      setDataPentip(response.data);
      response = await getAllResep();
      setDataResep(response.data);
      response = await getAllKategori();
      setDataKategori(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <FormCard
        title={"Form Produk"}
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
          <Alert severity="info" icon={false} sx={{ mb: "8px" }}>
            Produk
          </Alert>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="nama_produk" sx={{ marginTop: "0px" }}>
                Nama Produk
              </LabelForm>
              <FormField
                type="text"
                name="nama_produk"
                id="nama_produk"
                value={input.nama_produk || ""}
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="harga_produk" sx={{ marginTop: "0px" }}>
                Harga
              </LabelForm>
              <FormField
                type="number"
                name="harga_produk"
                id="harga_produk"
                value={input.harga_produk || ""}
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="id_resep" sx={{ marginTop: "0px" }}>
                Resep
              </LabelForm>
              <Select
                {...(input.id_kategori == 4 && { disabled: true })}
                id="id_resep"
                name="id_resep"
                value={input.id_resep || ""}
                onChange={(e) => handleInput(e)}
                fullWidth
                variant="outlined"
                MenuProps={{
                  style: {
                    maxHeight: 300,
                  },
                }}
              >
                {dataResep.map((option) => (
                  <MenuItem
                    style={{ whiteSpace: "normal" }}
                    key={option.id_resep}
                    value={option.id_resep}
                  >
                    {option.nama_resep}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="id_kategori" sx={{ marginTop: "0px" }}>
                Kategori
              </LabelForm>
              <Select
                id="id_kategori"
                name="id_kategori"
                value={input.id_kategori || ""}
                onChange={(e) => handleInput(e)}
                fullWidth
                variant="outlined"
                MenuProps={{
                  style: {
                    maxHeight: 300,
                  },
                }}
              >
                {dataKategori.map((option) => (
                  <MenuItem
                    style={{ whiteSpace: "normal" }}
                    key={option.id_kategori}
                    value={option.id_kategori}
                  >
                    {option.nama_kategori}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="deskripsi_produk" sx={{ marginTop: "0px" }}>
                Deskripsi Produk
              </LabelForm>
              <FormField
                multiline
                sx={{ padding: "0px" }}
                rows={6}
                value={input.deskripsi_produk || ""}
                name="deskripsi_produk"
                id="deskripsi_produk"
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm sx={{ marginTop: "0px" }}>Foto Produk</LabelForm>
              {input.foto_produk && (
                <Box
                  component="div"
                  sx={{
                    width: 144,
                    height: 144,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="div"
                    onClick={handleDeleteFoto}
                    className="z-10 absolute right-1 top-1 cursor-pointer"
                  >
                    <IconX color="white" />
                  </Box>
                  <Image
                    fill
                    sizes="100%"
                    style={{
                      objectFit: "cover",
                      borderRadius: 7,
                    }}
                    src={
                      typeof input.foto_produk === "string"
                        ? `${API_URL_IMAGE}${input.foto_produk}`
                        : URL.createObjectURL(input.foto_produk)
                    }
                    alt="foto_produk"
                  />
                </Box>
              )}
              {!input.foto_produk && (
                <LabelForm
                  sx={{
                    margin: "0px",
                    width: "100%",
                    borderRadius: "7px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                  className="border border-dashed py-[22px]"
                >
                  <IconPhotoFilled size={48} className="text-slate-300" />
                  <Typography className="font-light text-[8px]">
                    <span className="font-bold text-indigo-600 cursor-pointer">
                      Upload
                    </span>{" "}
                    your photo with <br /> format jpg, jpeg, or png.
                  </Typography>
                  <input
                    type="file"
                    name="foto_produk"
                    id="foto_produk"
                    className="sr-only"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleInput(e)}
                  />
                </LabelForm>
              )}
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="stok_produk" sx={{ marginTop: "0px" }}>
                Stok
              </LabelForm>
              <FormField
                type="number"
                name="stok_produk"
                id="stok_produk"
                value={input.stok_produk || ""}
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            {input.id_kategori == 4 && (
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <LabelForm htmlFor="id_penitip" sx={{ marginTop: "0px" }}>
                  Penitip
                </LabelForm>
                <Select
                  id="id_penitip"
                  name="id_penitip"
                  value={input.id_penitip || ""}
                  onChange={(e) => handleInput(e)}
                  fullWidth
                  variant="outlined"
                  MenuProps={{
                    style: {
                      maxHeight: 300,
                    },
                  }}
                >
                  {dataPentip.map((option) => (
                    <MenuItem
                      style={{ whiteSpace: "normal" }}
                      key={option.id_penitip}
                      value={option.id_penitip}
                    >
                      {option.nama_penitip}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
          </Grid>
        </form>
      </FormCard>
    </div>
  );
};

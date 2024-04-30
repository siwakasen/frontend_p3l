import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Modal,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import FormCard from "@/components/shared/FormCard";
import LabelForm from "@/components/auth/shared/LabelFormField";
import FormField from "@/components/auth/shared/OutlineTextFormField";
import { IconPhotoFilled, IconX } from "@tabler/icons-react";
import { getAllBahanBaku } from "@/services/bahan-baku/bahanBaku";
import { getAllProduk } from "@/services/produk/produk";
import { useRouter } from "next/navigation";
import { API_URL_IMAGE } from "@/utils/constants";
import CustomBoxModal from "@/components/shared/CustomBoxModalConfirm";
import Image from "next/image";

export const FormHampers = ({
  detailInput,
  hampersInput,
  handleSubmit,
  setDetailInput,
  setHampersInput,
  handleOpen,
  open,
  modalText,
}) => {
  const [dataProduk, setDataProduk] = useState([]);
  const [dataBahanBaku, setDataBahanBaku] = useState([]);

  const route = useRouter();

  function handleCancel() {
    route.push("/administrator/hampers");
  }

  function handleAddDetail() {
    setDetailInput((prev) => [...prev, {}]);
  }

  function handleRemoveDetail() {
    setDetailInput((prev) => prev.slice(0, prev.length - 1));
  }

  function handleInputHampers(event) {
    const { name, value } = event.target;
    if (name === "foto_hampers")
      setHampersInput((prev) => ({ ...prev, [name]: event.target.files[0] }));
    else setHampersInput((prev) => ({ ...prev, [name]: value }));
  }

  function handleInputDetail(event, index) {
    const { name, value } = event.target;
    const list = [...detailInput];
    list[index][name] = value;
    setDetailInput(list);
  }

  function handleDeleteFoto() {
    delete hampersInput.foto_hampers;
    setHampersInput((prev) => ({ ...prev }));
  }

  useEffect(() => {
    const fetchDataBahanBaku = async () => {
      const response = await getAllBahanBaku();
      setDataBahanBaku(response.data);
    };
    const fetchDataProduk = async () => {
      const response = await getAllProduk();
      setDataProduk(response.data);
    };
    fetchDataProduk();
    fetchDataBahanBaku();
  }, []);

  return (
    <div>
      <FormCard
        title={"Form Hampers"}
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
            Hampers
          </Alert>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="nama_hampers" sx={{ marginTop: "0px" }}>
                Nama Hampers
              </LabelForm>
              <FormField
                type="text"
                name="nama_hampers"
                id="nama_hampers"
                value={hampersInput.nama_hampers || ""}
                onChange={(e) => handleInputHampers(e)}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="harga_hampers" sx={{ marginTop: "0px" }}>
                Harga
              </LabelForm>
              <FormField
                type="number"
                name="harga_hampers"
                id="harga_hampers"
                value={hampersInput.harga_hampers || ""}
                onChange={(e) => handleInputHampers(e)}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm htmlFor="deskripsi_hampers" sx={{ marginTop: "0px" }}>
                Deskripsi Hampers
              </LabelForm>
              <FormField
                multiline
                sx={{ padding: "0px" }}
                rows={6}
                value={hampersInput.deskripsi_hampers || ""}
                name="deskripsi_hampers"
                id="deskripsi_hampers"
                onChange={(e) => handleInputHampers(e)}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <LabelForm sx={{ marginTop: "0px" }}>Foto Hampers</LabelForm>
              {hampersInput.foto_hampers && (
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
                      typeof hampersInput.foto_hampers === "string"
                        ? `${API_URL_IMAGE}${hampersInput.foto_hampers}`
                        : URL.createObjectURL(hampersInput.foto_hampers)
                    }
                    alt="foto_hampers"
                  />
                </Box>
              )}
              {!hampersInput.foto_hampers && (
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
                    name="foto_hampers"
                    id="foto_hampers"
                    className="sr-only"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleInputHampers(e)}
                  />
                </LabelForm>
              )}
            </Grid>
          </Grid>
          <Alert severity="info" icon={false} sx={{ mb: "8px", mt: "16px" }}>
            Detail Hampers
          </Alert>
          {detailInput.map((item, index) => {
            return (
              <Grid key={index} container columnSpacing={3} sx={{ my: 1 }}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <LabelForm
                    htmlFor={`jenis_${index}`}
                    sx={{ marginTop: "0px" }}
                  >
                    Jenis
                  </LabelForm>
                  <Select
                    id={`jenis_${index}`}
                    name="jenis"
                    value={detailInput[index].jenis || ""}
                    onChange={(e) => handleInputDetail(e, index)}
                    fullWidth
                    variant="outlined"
                    MenuProps={{
                      style: {
                        maxHeight: 300,
                      },
                    }}
                  >
                    <MenuItem
                      style={{ whiteSpace: "normal" }}
                      key="id_bahan_baku"
                      value="id_bahan_baku"
                    >
                      Bahan Baku
                    </MenuItem>
                    <MenuItem
                      style={{ whiteSpace: "normal" }}
                      key="id_produk"
                      value="id_produk"
                    >
                      Produk
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <LabelForm
                    htmlFor={`isi_hampers_${index}`}
                    sx={{ marginTop: "0px" }}
                  >
                    Isi Hampers
                  </LabelForm>
                  <Select
                    id={`isi_hampers_${index}`}
                    name="value"
                    value={detailInput[index].value || ""}
                    onChange={(e) => handleInputDetail(e, index)}
                    fullWidth
                    variant="outlined"
                    MenuProps={{
                      style: {
                        maxHeight: 300,
                      },
                    }}
                  >
                    {detailInput[index].jenis === "id_bahan_baku"
                      ? dataBahanBaku.map((option) => (
                          <MenuItem
                            style={{ whiteSpace: "normal" }}
                            key={option.id_bahan_baku}
                            value={option.id_bahan_baku}
                          >
                            {option.nama_bahan_baku}
                          </MenuItem>
                        ))
                      : dataProduk.map((option) => (
                          <MenuItem
                            style={{ whiteSpace: "normal" }}
                            key={option.id_produk}
                            value={option.id_produk}
                          >
                            {option.nama_produk}
                          </MenuItem>
                        ))}
                  </Select>
                </Grid>
              </Grid>
            );
          })}

          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: "12px" }}>
            {detailInput.length > 0 && (
              <Button
                color="error"
                variant="outlined"
                onClick={handleRemoveDetail}
                sx={{ mr: 1 }}
              >
                Remove
              </Button>
            )}
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleAddDetail}
            >
              Add Item
            </Button>
          </Grid>
        </form>
      </FormCard>
    </div>
  );
};

import React from "react";
import {
  Button,
  Grid,
  Modal,
  Alert,
  Box,
} from "@mui/material";
import FormCard from "@/components/shared/FormCard";
import LabelForm from "@/components/auth/shared/LabelFormField";
import FormField from "@/components/auth/shared/OutlineTextFormField";
import { useRouter } from "next/navigation";
import CustomBoxModal from "@/components/shared/CustomBoxModalConfirm";


export const FormBahanBaku = ({
 bahanBakuInput,
 handleSubmit,
 setBahanBakuInput,
 handleOpen,
 open,
 modalText,
}) =>{
    const router = useRouter();

    function handleCancel(){
        router.push('/administrator/bahan-baku');
    }

    function handleInputBahanBaku(e){
        const { name, value } = e.target;
        setBahanBakuInput({
            ...bahanBakuInput,
            [name]: value,
        });
    }

    return(
        <Box>
            <FormCard
                title={"Form Baham Baku"}
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
                <form >
                    <Alert severity="info" icon={false} sx={{mb:"8px"}}>
                        Bahan Baku
                    </Alert>
                    <Grid container columnSpacing={3} rowSpacing={1}>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <LabelForm htmlFor="nama_bahan_baku" sx={{ marginTop: "0px" }}>
                                Nama Bahan Baku
                            </LabelForm>
                            <FormField
                                type="text"
                                name="nama_bahan_baku"
                                id="nama_bahan_baku"
                                value={bahanBakuInput.nama_bahan_baku || ""}
                                onChange={(e) => handleInputBahanBaku(e)}
                            />
                        </Grid>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <LabelForm htmlFor="satuan" sx={{ marginTop: "0px" }}>
                                Satuan
                            </LabelForm>
                            <FormField
                                type="text"
                                name="satuan"
                                id="satuan"
                                value={bahanBakuInput.satuan || ""}
                                onChange={(e) => handleInputBahanBaku(e)}
                            />
                        </Grid>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <LabelForm htmlFor="stok" sx={{ marginTop: "0px" }}>
                                Stok
                            </LabelForm>
                            <FormField
                                type="number"
                                name="stok"
                                id="stok"
                                value={bahanBakuInput.stok || ""}
                                onChange={(e) => handleInputBahanBaku(e)}
                            />
                        </Grid>
                    </Grid>
                </form>
            </FormCard>
        </Box>
    );
}

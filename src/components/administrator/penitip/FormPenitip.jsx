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


export const FormPenitip = ({
 penitipInput,
 handleSubmit,
 setPenitipInput,
 handleOpen,
 open,
 modalText,
}) =>{
    const router = useRouter();

    function handleCancel(){
        router.push('/administrator/penitip');
    }

    function handleInputPenitip(e){
        const { name, value } = e.target;
        setPenitipInput({
            ...penitipInput,
            [name]: value,
        });
    }

    return(
        <Box>
            <FormCard
                title={"Form Penitip"}
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
                        Penitip
                    </Alert>
                    <Grid container columnSpacing={3} rowSpacing={1}>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <LabelForm htmlFor="nama_penitip" sx={{ marginTop: "0px" }}>
                                Nama Penitip
                            </LabelForm>
                            <FormField
                                type="text"
                                name="nama_penitip"
                                id="nama_penitip"
                                value={penitipInput.nama_penitip || ""}
                                onChange={(e) => handleInputPenitip(e)}
                            />
                        </Grid>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <LabelForm htmlFor="email" sx={{ marginTop: "0px" }}>
                                Email
                            </LabelForm>
                            <FormField
                                type="text"
                                name="email"
                                id="email"
                                value={penitipInput.email || ""}
                                onChange={(e) => handleInputPenitip(e)}
                            />
                        </Grid>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <LabelForm htmlFor="no_hp" sx={{ marginTop: "0px" }}>
                                Nomer HP
                            </LabelForm>
                            <FormField
                                type="number"
                                name="no_hp"
                                id="no_hp"
                                value={penitipInput.no_hp || ""}
                                onChange={(e) => handleInputPenitip(e)}
                            />
                        </Grid>
                    </Grid>
                </form>
            </FormCard>
        </Box>
    );
}

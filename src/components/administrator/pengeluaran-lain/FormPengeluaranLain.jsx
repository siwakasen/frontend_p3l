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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect } from "react";

export const FormPengeluaranLain = ({
 pengeluaranLainInput,
 handleSubmit,
 setPengeluaranLainInput,
 handleOpen,
 open,
 modalText,
}) =>{
    const router = useRouter();
    useEffect(() => {
        if(pengeluaranLainInput.tanggal_pengeluaran === undefined){
            setPengeluaranLainInput({
                ...pengeluaranLainInput,
                'tanggal_pengeluaran': formatDate(new Date()),
            });
        }
    },[]);

    function handleCancel(){
        router.push('/administrator/pengeluaran-lain');
    }

    function handleInputPengeluaranLain(name, value) {
        if(name === 'tanggal_pengeluaran'){
            const formattedDate = formatDate(value);
            setPengeluaranLainInput({
                ...pengeluaranLainInput,
                [name]: formattedDate,
            });
        }else{
            setPengeluaranLainInput({
                ...pengeluaranLainInput,
                [name]: value,
            });
        }

    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return(
        <Box>
            <FormCard
                title={"Form Pengeluaran Lain"}
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
                        Pengeluaran Lain
                    </Alert>
                    <Grid container columnSpacing={3} rowSpacing={1}>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <LabelForm htmlFor="nama_pengeluaran" sx={{ marginTop: "0px" }}>
                                Nama Pengeluaran
                            </LabelForm>
                            <FormField
                                type="text"
                                name="nama_pengeluaran"
                                id="nama_pengeluaran"
                                value={pengeluaranLainInput.nama_pengeluaran || ""}
                                onChange={(e) => handleInputPengeluaranLain('nama_pengeluaran', e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                        <LabelForm htmlFor="nominal_pengeluaran" sx={{ marginTop: "0px" }}>
                                Nominal Pengeluaran
                            </LabelForm>
                            <FormField
                                type="number"
                                name="nominal_pengeluaran"
                                id="nominal_pengeluaran"
                                value={pengeluaranLainInput.nominal_pengeluaran || ""}
                                onChange={(e) => handleInputPengeluaranLain('nominal_pengeluaran', e.target.value)}
                            />
                            
                        </Grid>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <LabelForm htmlFor="tanggal_pengeluaran" sx={{ marginTop: 2 }}>
                                Tanggal Pengeluaran
                            </LabelForm>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateCalendar
                                    value={ pengeluaranLainInput.tanggal_pengeluaran === undefined ? new Date() : new Date(pengeluaranLainInput.tanggal_pengeluaran)}
                                    onChange={(newValue) => handleInputPengeluaranLain('tanggal_pengeluaran', newValue)}
                                    disableFuture
                                    sx={{ mx: 0}}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </form>
            </FormCard>
        </Box>
    );
}

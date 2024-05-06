import { Dialog, DialogActions, DialogContent, DialogContentText, TextField, Typography, Button, DialogTitle, FormLabel } from '@mui/material';
import React from 'react';
import { UseActions } from './useActions';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { set } from 'lodash';

export const tanggalLahir = () => {
    const [open, setOpen] = React.useState(false);
    const { handleProfile } = UseActions();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [tanggal_lahir, setTanggalLahir] = React.useState("");
    return (
        <>
            <Typography component={"button"} color="primary" variant="subtitle1" fontWeight={"400"} onClick={handleClickOpen}>Ubah Tanggal Lahir</Typography>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ubah Tanggal Lahir</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ubah tanggal lahir Anda, tanggal lahir yang Anda ubah akan terlihat di seluruh platform.
                    </DialogContentText>
                </DialogContent>
                <DialogContent sx={{
                    paddingTop: 0
                }}>
                    <FormLabel htmlFor="tanggal_lahir" sx={{
                        fontWeight: 600
                    }}>Tanggal Lahir</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={tanggal_lahir}
                            id="tanggal_lahir"
                            onChange={(date) => setTanggalLahir(date)}
                            renderInput={(params) => <TextField fullWidth 
                            margin="normal"
                            id="tanggal_lahir"
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main"
                                },
                            }}
                            {...params} />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Batal</Button>
                    <Button onClick={() => {
                        setTanggalLahir(new Date(tanggal_lahir).toISOString().split('T')[0]);
                        handleProfile({ tanggal_lahir });
                        handleClose();
                    }} color="primary">Simpan</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

import { Dialog, DialogActions, DialogContent, DialogContentText, TextField, Typography, Button, DialogTitle, FormLabel } from '@mui/material';
import React from 'react';
import { UseActions } from './useActions';

export const changeName = () => {
    const [open, setOpen] = React.useState(false);
    const { handleProfile } = UseActions();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [nama, setNama] = React.useState("");


    return (
        <>
            <Typography component={"button"} color="primary" variant="subtitle1" fontWeight={"400"} onClick={handleClickOpen}>Ubah</Typography>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ubah Nama</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ubah nama pengguna Anda, nama pengguna yang Anda ubah akan terlihat di seluruh platform.
                    </DialogContentText>
                </DialogContent>
                <DialogContent sx={{
                    paddingTop: 0
                }}>
                    <FormLabel htmlFor="nama" sx={{
                        fontWeight: 600
                    }}>Nama</FormLabel>
                    <TextField
                        onChange={(e) => setNama(e.target.value)}
                        margin="normal"
                        id="nama"
                        placeholder="Nama Pengguna Baru"
                        type="text"
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Batal</Button>
                    <Button onClick={() => {
                        handleProfile({ nama });
                        handleClose();
                    }} color="primary">Simpan</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
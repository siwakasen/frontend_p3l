import { Dialog, DialogActions, DialogContent, DialogContentText, TextField, Typography, Button, DialogTitle, FormLabel } from '@mui/material';
import React from 'react';
import { UseActions } from './useActions';

export const ChangePhoneNumber = () => {
    const [open, setOpen] = React.useState(false);
    const { handleProfile } = UseActions();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [no_hp, setNoHp] = React.useState("");


    return (
        <>
            <Typography component={"button"} color="primary" variant="subtitle1" fontWeight={"400"} onClick={handleClickOpen}>Ubah</Typography>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ubah Nomor HP</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ubah nomor HP Anda, nomor HP yang Anda ubah akan terlihat di seluruh platform.
                    </DialogContentText>
                </DialogContent>
                <DialogContent sx={{
                    paddingTop: 0
                }}>
                    <FormLabel htmlFor="no_hp" sx={{
                        fontWeight: 600
                    }}>Nomor HP</FormLabel>
                    <TextField
                        onChange={(e) => setNoHp(e.target.value)}
                        margin="normal"
                        id="no_hp"
                        placeholder="Nomor HP Baru"
                        type="number"
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Batal</Button>
                    <Button onClick={() => {
                        handleProfile({ no_hp });
                        handleClose();
                    }} color="primary">Simpan</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

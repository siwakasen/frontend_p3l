import React, { useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ResponsiveDialog = ({ open, type, title, content, action }) => {
    const theme = useTheme();

    const handleClose = () => {
        open.setOpen(false);
    };

    const handleAction = (e) => {
        action.onClick(e);
        if(action.refreshData) {
            action.refreshData();
        }
        handleClose();
    };

    return (
        <Dialog
            fullWidth={
                type === "cu" ? true : false
            }
            open={open.open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                {action ? (
                    <>
                        <Button autoFocus onClick={handleClose}>
                            Batal
                        </Button>
                        <Button onClick={handleAction} {...action.props}>
                            {action.text}
                        </Button>
                    </>
                ) : (
                    ''
                )}
            </DialogActions>
        </Dialog>
    );
}

export default ResponsiveDialog;

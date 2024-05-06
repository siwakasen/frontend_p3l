import { Button, Chip, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ChangeName } from '../ChangeName';
import { TanggalLahir } from '../ChangeTanggalLahir';
import { ChangePhoneNumber } from '../ChangePhoneNumber';

const Biodata = () => {
    const data = useSelector((state) => state.user);
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <List>
                    <ListItemText>
                        <Typography variant="subtitle1"  fontWeight={"600"} mb={1}>Ubah Biodata Diri</Typography>
                    </ListItemText>
                    <ListItem sx={{
                        padding: 0,
                        marginTop: 3
                    }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{
                                        padding: 0,
                                        width: "120px"
                                    }}>
                                        <Typography variant="subtitle1" fontWeight={"400"}>Nama</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        padding: 0
                                    }}>
                                        <Typography variant="subtitle1" fontWeight={"400"}>{data.user.nama}</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        padding: 0,
                                        textAlign: "right"
                                    }}>
                                        {ChangeName()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </ListItem>
                    <ListItem sx={{
                        padding: 0,
                        marginTop: 3
                    }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{
                                        padding: 0,
                                        width: "120px"
                                    }}>
                                        <Typography variant="subtitle1" fontWeight={"400"}>Tanggal Lahir</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        padding: 0
                                    }}>
                                        <Typography variant="subtitle1" fontWeight={"400"}>{
                                            new Date(data.user.tanggal_lahir).toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })
                                        }</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        padding: 0,
                                        textAlign: "right"
                                    }}>
                                        {TanggalLahir()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </ListItem>
                    <ListItemText sx={{
                        marginTop: 3
                    }}>
                        <Typography variant="subtitle1"  fontWeight={"600"} mb={1}>Ubah Kontak</Typography>
                    </ListItemText>
                    <ListItem sx={{
                        padding: 0,
                        marginTop: 3
                    }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{
                                        padding: 0,
                                        width: "120px"
                                    }}>
                                        <Typography variant="subtitle1" fontWeight={"400"}>Email</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        padding: 0
                                    }}>
                                        <Typography variant="subtitle1" fontWeight={"400"}>{data.user.email}</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        padding: 0,
                                        textAlign: "right"
                                    }}>
                                        <Chip label="Terverifikasi" size="small" color="primary" />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </ListItem>
                    <ListItem sx={{
                        padding: 0,
                        marginTop: 3
                    }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{
                                        padding: 0,
                                        width: "120px"
                                    }}>
                                        <Typography variant="subtitle1" fontWeight={"400"}>Nomor HP</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        padding: 0
                                    }}>
                                        <Typography variant="subtitle1" fontWeight={"400"}>{data.user.no_hp}</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        padding: 0,
                                        textAlign: "right"
                                    }}>
                                        <Typography variant="subtitle1" color={"primary"} fontWeight={"400"}>
                                            {ChangePhoneNumber()}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1}>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
                <List>
                    <ListItemText>
                        <Typography variant="subtitle1"  fontWeight={"600"} mb={1}>Ubah Kata Sandi</Typography>
                    </ListItemText>
                    <ListItem sx={{
                        padding: 0,
                    }}>
                        <Button fullWidth sx={{
                            border: "2px solid #f0f0f0",
                            backgroundColor: "transparent",
                            color: "black",
                            ":hover": {
                                backgroundColor: "transparent",
                                color: "black"
                            }
                        }}>
                            Ubah Kata Sandi
                        </Button>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
}

export default Biodata;
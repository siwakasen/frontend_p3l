import { useState, useEffect } from 'react';
import { Box, Grid, Modal, Typography, InputAdornment, MenuItem, Stack, Chip, Divider, Button, useMediaQuery, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Image from 'next/image';
import Purchase from '../../../assets/icons/purchase.png';
import CustomTextField from '../forms/CustomTextField';
import CustomSelect from '../forms/CustomSelect';
import { Search as SearchIcon, } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getAllKategori } from '@/services/shared/kategori/kategori';
import { getPesananBelumDibayar } from '@/services/user/menungguPembayaran/menungguPembayaran';
import { bayarPesanan } from '@/services/user/menungguPembayaran/menungguPembayaran';
import { API_URL_IMAGE } from '@/utils/constants';
import { uniqueId } from 'lodash';
import CustomBoxModal from "../../shared/CustomBoxModalConfirm";
import Toast from "@/components/shared/Toast";
import { toast } from 'react-toastify';

const ContainerMenungguPembayaran = () => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [date, setDate] = useState('');
    const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const [kategori, setKategori] = useState([]);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [selectedId, setSelectedId] = useState(-1);
    const [imagePreview, setImagePreview] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllKategori().then((data) => {
            setKategori(data.data);
        });
        getPesananBelumDibayar().then((data) => {
            setData(data.data);
        });
    }, [loading]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        console.log(file);
    };
    const handleImageClick = () => {
        setPreviewOpen(true);
    };
    const handleImageLoad = ({ target }) => {
        setImageDimensions({ width: target.naturalWidth, height: target.naturalHeight });
    };

    const handlePreviewClose = () => {
        setPreviewOpen(false);
    };

    const [data, setData] = useState([]);

    const searchPesananByNamaProduk = (query) => {
        if (query === '') {
            getPesananBelumDibayar().then((data) => {
                setData(data.data);
            });
        } else {
            getPesananBelumDibayar().then((data) => {
                const result = data.data.filter((data) => {
                    return data.detail_pesanan.filter((detail) => {
                        if (detail.produk !== null) {
                            return detail.produk.nama_produk.toLowerCase().includes(query.toLowerCase());
                        } else {
                            return detail.hampers.nama_hampers.toLowerCase().includes(query.toLowerCase());
                        }
                    }).length > 0;
                });
                setData(result);
            });
        }
    }

    const searchPesananByKategori = (query) => {
        if (query === 'all') {
            getPesananBelumDibayar().then((data) => {
                setData(data.data);
            });
        } else {
            console.log(query);
            getPesananBelumDibayar().then((data) => {
                console.log(data);
                const result = data.data.filter((data) => {
                    return data.detail_pesanan.filter((detail) => {
                        if (detail.produk !== null) {
                            return detail.produk.id_kategori === query;
                        } else {
                            if (detail.hampers !== null && detail.hampers === query) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).length > 0;
                });
                setData(result);
            });
        }
    }

    const searchPesananByTanggal = (query) => {
        if (data === '') {
            getPesananBelumDibayar().then((data) => {
                setData(data.data);
            })
        } else {
            getPesananBelumDibayar().then((data) => {
                const result = data.data.filter((data) => {
                    return new Date(data.tanggal_pesanan).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }) === query;
                });
                setData(result);
            });
        }
    }

    const handleChangeDate = (query) => {
        setDate(query);
        setFilter('all');
        setSearch('');
        searchPesananByTanggal(new Date(query).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }));
    }

    const handleChangeKategori = (query) => {
        setFilter(query);
        setSearch('');
        setDate('');
        searchPesananByKategori(query);
    }

    const handleChangeInputSearch = (query) => {
        setSearch(query);
        setFilter('all');
        setDate('');
        searchPesananByNamaProduk(query);
    }

    function handleOpen() {
        setOpen(!open);
        setImage(null);
        setImagePreview('');
    }

    const handleBayarAction = (id) => {
        console.log(id);
        setSelectedId(id);
        handleOpen();
    }
    const handleKirimPembayaran = () => {
        console.log(selectedId);
        bayarPesanan(selectedId, image).then((data) => {
            console.log(data);
            console.log(data.status);
            if (data.status === 200) {
                toastSuccess(data.message);
                handleOpen();

            } else {
                toastWarning(data.message);
            }
        }
        ).catch((error) => {
            toastError(error);
        });
        setLoading(!loading);
        handleOpen();
    }

    return (
        <Grid item xs={12} sm={12} md={9} lg={9}>
            <Typography variant="h4" fontWeight={600} mb={2}>
                Pesanan Belum Dibayar
            </Typography>
            <Box boxShadow={1} bgcolor="#fff" border={"1px solid #f0f0f0"} p={2}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <CustomTextField
                            fullWidth
                            placeholder="Cari Pesananmu di sini"
                            value={search}
                            onChange={(e) => handleChangeInputSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <CustomSelect
                            fullWidth
                            value={filter}
                            onChange={(e) => handleChangeKategori(e.target.value)}
                        >
                            <MenuItem value="all">Semua Produk</MenuItem>
                            {kategori.map((data) => (
                                <MenuItem key={data.id_kategori} value={data.id_kategori}>{data.nama_kategori}</MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={date === '' ? null : new Date(date)}
                                onChange={(newValue) => {
                                    handleChangeDate(newValue);
                                }}
                                fullWidth
                                disableFuture
                                renderInput={(params) => <CustomTextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Modal
                    open={open} onClose={handleOpen}>
                    <div >
                        <form onSubmit={handleKirimPembayaran}>
                            <CustomBoxModal
                                title="Kirim Bukti Pembayaran"
                                description="Pengiriman bukti pembayaran!"
                                footer={
                                    <>
                                        <Button
                                            color="success"
                                            size="small"
                                            sx={{ mt: 2, mr: 2 }}
                                            type='submit'
                                            {
                                            ...image === null ? { disabled: true } : {}
                                            }
                                        >
                                            Kirim
                                        </Button>
                                        <Button
                                            color="error"
                                            size="small"
                                            sx={{ mt: 2 }}
                                            onClick={handleOpen}
                                        >
                                            Batal
                                        </Button>
                                    </>
                                }
                            >
                                <Box>
                                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                                        <OutlinedInput
                                            id="image-upload"
                                            type="file"
                                            name="bukti_pembayaran"
                                            onChange={handleImageChange}
                                            label="Upload Gambar"
                                            inputProps={{ accept: 'image/*' }}
                                        />
                                    </FormControl>
                                    {imagePreview ? (
                                        <Box sx={{ mt: 2, position: 'relative', width: '100%', height: '300px', cursor: 'pointer' }} onClick={handleImageClick}>
                                            <Image src={imagePreview} alt="Preview" layout="fill" objectFit="contain" />
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                mt: 2,
                                                width: '100%',
                                                height: '300px',
                                                border: '1px dashed gray',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                color: 'gray',
                                            }}
                                        >
                                            <Typography>Preview Image</Typography>
                                        </Box>
                                    )}
                                </Box>
                            </CustomBoxModal>
                        </form>
                    </div>
                </Modal>
                <Modal open={previewOpen} onClose={handlePreviewClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            transition: 'all 0.3s',
                            width: `${imageDimensions.width}px`,
                            height: `${imageDimensions.height}px`,
                            maxHeight: '60vh',
                            maxWidth: '40vw',
                            boxShadow: 20,
                            p: 1,
                        }}
                    >
                        {imagePreview && (
                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                <Image src={imagePreview} alt="Large Preview" layout="fill" objectFit="contain" onLoad={handleImageLoad} />
                            </Box>
                        )}
                    </Box>
                </Modal>
                {
                    data.length === 0 ? (
                        <Box mt={2} p={2} textAlign="center">
                            <Typography variant="h5" fontWeight={600}>
                                Tidak ada pesanan yang ditemukan
                            </Typography>
                        </Box>
                    ) : (
                        data.map((data, index) => (
                            <Box key={uniqueId()} mt={2} p={2} sx={{
                                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                            }}>
                                <Stack direction="row" spacing={2} {...smDown && { alignItems: "center", justifyContent: "space-between" }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Image src={Purchase} width={25} height={25} alt="purchase" />
                                        <Typography variant="body1" fontWeight={600}>
                                            Belanja
                                        </Typography>
                                    </Stack>
                                    <Stack diraction="column" spacing={1} {...smDown && { alignItems: "flex-end" }}>
                                        <Typography variant="body1" fontWeight={500}>
                                            {new Date(data.tanggal_pesanan).toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </Typography>
                                        {smDown && (
                                            <Chip label={data.status_transaksi} size="small" color={
                                                data.status_transaksi === "Pesanan Sudah Selesai" ? "primary" : "error"
                                            }
                                                sx={{
                                                    borderRadius: "5px",
                                                }} />
                                        )}
                                    </Stack>
                                    {!smDown && (
                                        <Chip label={data.status_transaksi} size="small" color={
                                            data.status_transaksi === "Pesanan Sudah Selesai" ? "primary" : "error"
                                        } sx={{
                                            borderRadius: "5px",
                                        }} />
                                    )}
                                </Stack>
                                {data.detail_pesanan.map((detail) => {
                                    if (detail.produk !== null)
                                        return <Box key={uniqueId()}>
                                            <Stack direction="row" spacing={2} mt={2} justifyContent="space-between">
                                                <Stack direction="row" spacing={2}>
                                                    <Image src={`${API_URL_IMAGE}${detail.produk.foto_produk}`} width={80} height={80} alt="image-product" style={{
                                                        borderRadius: "5px",
                                                    }} />
                                                    <Box>
                                                        <Typography variant="h5" fontWeight={600}>
                                                            {detail.produk.nama_produk}
                                                        </Typography>
                                                        <Typography variant="subtitle1" fontWeight={500} color="GrayText">
                                                            {detail.jumlah} Produk x {new Intl.NumberFormat('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR',
                                                            }).format(detail.produk.harga_produk)}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                {!smDown && (
                                                    <Stack direction="row" spacing={1} alignItems="center" width="150px">
                                                        <Divider orientation="vertical" flexItem />
                                                        <Box>
                                                            <Typography variant="subtitle1" fontWeight={400}>
                                                                Subtotal Harga
                                                            </Typography>
                                                            <Typography variant="subtitle1" fontWeight={800}>
                                                                {new Intl.NumberFormat('id-ID', {
                                                                    style: 'currency',
                                                                    currency: 'IDR',
                                                                }).format(detail.subtotal)}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                )}
                                            </Stack>
                                            {smDown && (
                                                <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                                                    <Divider orientation="vertical" flexItem />
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight={400}>
                                                            Subtotal Harga
                                                        </Typography>
                                                        <Typography variant="subtitle1" fontWeight={800}>
                                                            {new Intl.NumberFormat('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR',
                                                            }).format(detail.subtotal)}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            )}
                                        </Box>
                                    else
                                        return <Box key={uniqueId()}>
                                            <Stack direction="row" spacing={2} mt={2} justifyContent="space-between">
                                                <Stack direction="row" spacing={2}>
                                                    <Image src={`${API_URL_IMAGE}${detail.hampers.foto_hampers}`} width={80} height={80} alt="image-product" style={{
                                                        borderRadius: "5px",
                                                    }} />
                                                    <Box>
                                                        <Typography variant="h5" fontWeight={600}>
                                                            {detail.hampers.nama_hampers}
                                                        </Typography>
                                                        <Typography variant="subtitle1" fontWeight={500} color="GrayText">
                                                            {detail.jumlah} Produk x {new Intl.NumberFormat('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR',
                                                            }).format(detail.hampers.harga_hampers)}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                {!smDown && (
                                                    <Stack direction="row" spacing={1} alignItems="center" width="150px">
                                                        <Divider orientation="vertical" flexItem />
                                                        <Box>
                                                            <Typography variant="subtitle1" fontWeight={400}>
                                                                Subtotal Harga
                                                            </Typography>
                                                            <Typography variant="subtitle1" fontWeight={800}>
                                                                {new Intl.NumberFormat('id-ID', {
                                                                    style: 'currency',
                                                                    currency: 'IDR',
                                                                }).format(detail.subtotal)}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                )}
                                            </Stack>
                                            {smDown && (
                                                <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                                                    <Divider orientation="vertical" flexItem />
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight={400}>
                                                            Subtotal Harga
                                                        </Typography>
                                                        <Typography variant="subtitle1" fontWeight={800}>
                                                            {new Intl.NumberFormat('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR',
                                                            }).format(detail.subtotal)}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            )}
                                        </Box>
                                })}
                                <Stack direction="row" spacing={2} mt={2} justifyContent="space-between">
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        Total Harga
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight={800}>
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                        }).format(data.total_harga)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2} mt={2} justifyContent={smDown ? "space-between" : "end"}>
                                    <Typography variant="subtitle1" fontWeight={600} color="primary" alignItems={"center"} display={"flex"}>
                                        Lihat Detail Pesanan
                                    </Typography>
                                    <Button variant="contained" color="primary" sx={{
                                        borderRadius: "5px",
                                        width: "150px",
                                    }} onClick={() => handleBayarAction(data.id_pesanan)}
                                    >
                                        Bayar
                                    </Button>
                                </Stack>
                            </Box>
                        ))
                    )
                }
            </Box >
        </Grid >
    );
}

export default ContainerMenungguPembayaran;

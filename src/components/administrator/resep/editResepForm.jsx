import React from 'react';
import {
  Button,
  Grid,
  MenuItem,
  Card,
  InputAdornment,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import CustomTextField from '../forms/CustomTextField';
import CustomSelect from '../forms/CustomSelect';
import CustomFormLabel from '../forms/CustomFormLabel';
import ParentCard from '../shared/ParentCard';
import { useUpdate } from './useResep';
import ResponsiveDialog from '../shared/ResponsiveDialog';

const EditResepForm = ({ id }) => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const { formik, data, bahanBaku, handleChangeBahanBaku, handleChangeJumlah, handleAddField, handleRemoveField, numberOfField, handleCheck, handleSubmit } = useUpdate(id);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={8}>
                <ParentCard title="Form Tambah Resep">
                    <CustomFormLabel sx={{mt: 0}} htmlFor="namaResep">Nama Resep</CustomFormLabel>
                    <CustomTextField
                        id="namaResep"
                        name="nama_resep"
                        variant="outlined"
                        placeholder="Masukkan Nama Resep"
                        onChange={formik.handleChange}
                        value={formik.values.nama_resep}
                        error={formik.touched.nama_resep && Boolean(formik.errors.nama_resep)}
                        helperText={formik.touched.nama_resep && formik.errors.nama_resep}
                        fullWidth
                    />
                    <CustomFormLabel>Detail Resep</CustomFormLabel>
                    {numberOfField.map((field, index) => (
                        <Grid container spacing={1} key={field.id} mb={1}>
                            <Grid item xs={12} md={6}>
                                <CustomSelect
                                    id={`bahanBaku-${field.id}`}
                                    name={`bahanBaku-${field.id}`}
                                    variant="outlined"
                                    fullWidth
                                    value={data[index] && data[index].bahanBaku ? data[index].bahanBaku : "none"}
                                    onChange={handleChangeBahanBaku(index)}
                                >
                                    <MenuItem value="none" disabled={true}>Pilih Bahan Baku </MenuItem>
                                    {bahanBaku.map((item) => (
                                    <MenuItem key={item.id_bahan_baku} value={item.id_bahan_baku}>
                                        {item.nama_bahan_baku}
                                    </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                            <Grid item xs={12} md={4}>
                            <CustomTextField
                                id={`jumlah-${field.id}`}
                                name={`jumlah-${field.id}`}
                                variant="outlined"
                                placeholder="Masukkan Jumlah"
                                value={data[index] && data[index].bahanBaku ? data[index].jumlah : ''}
                                fullWidth
                                onChange={handleChangeJumlah(index)}
                                InputProps={{
                                    endAdornment: 
                                    <InputAdornment position="end">
                                        {
                                            data[index] && data[index].bahanBaku ? bahanBaku.find((item) => item.id_bahan_baku === data[index].bahanBaku).satuan : ''
                                        }
                                    </InputAdornment>,
                                    type: 'number',
                                    inputProps: { min: 0 },
                                    }}
                            />
                            </Grid>
                            <Grid item xs={12} md={2}>
                            <Button
                                sx={{ 
                                    height: '100%',
                                    width: '100%',
                                }}
                                color="error"
                                fullWidth
                                onClick={() => handleRemoveField(field.id, index)}
                            >
                                Hapus
                            </Button>
                            </Grid>
                        </Grid>
                    ))}
                </ParentCard>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
                <Card>
                    <Button 
                        fullWidth
                        variant='contained'
                        sx={{ height: '100%' }}
                        color='success'
                        onClick={handleAddField}
                    >
                        Tambah Bahan Baku
                    </Button>
                    <Button 
                        fullWidth
                        variant='contained'
                        sx={{ height: '100%', mt: 1, mb: 1 }}
                        color='error'
                        onClick={() => router.push('/administrator/resep')}
                    >
                        Batal
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{ height: '100%' }}
                        color='primary'
                        onClick={() => {
                            if (!handleCheck()) {
                                setOpen(true);
                            }    
                        }}
                    >
                        Ubah
                    </Button>
                    <ResponsiveDialog
                        open={{ open, setOpen }}
                        handleCheck={handleCheck}
                        title="Simpan Data"
                        content="Apakah Anda yakin ingin menyimpan data ini?"
                        action={{
                            props: {
                                color: 'primary',
                            },
                            onClick: handleSubmit,
                            text: 'Simpan',
                        
                        }}
                    />
                </Card>
            </Grid>
        </Grid>
    );
};

export default EditResepForm;
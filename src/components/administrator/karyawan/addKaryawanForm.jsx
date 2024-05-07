import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  FormControlLabel,
  MenuItem,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '../forms/CustomTextField';
import CustomCheckbox from '../forms/CustomCheckBox';
import CustomFormLabel from '../forms/CustomFormLabel';
import ParentCard from '../shared/ParentCard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomSelect from '../forms/CustomSelect';
import { useRouter } from 'next/navigation';
import { useInsert } from './useKaryawan';

const steps = ['Akun', 'Detail Karyawan', 'Selesai'];

const addkaryawanForm = () => {
    const router = useRouter();
    const { formik, role, showPassword, setShowPassword, handleChange, activeStep, setActiveStep } = useInsert();

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const stepsCheck = (caseStep) => {
        switch (caseStep) {
        case 0:
            if (formik.values.nama_karyawan === '' || formik.values.email === '' || formik.values.password === '') {
                return formik.setTouched({ nama_karyawan: true, email: true, password: true });
            }
            return setActiveStep((prevActiveStep) => prevActiveStep + 1);
        case 1:
            if (formik.values.id_role === '' || formik.values.tanggal_masuk === '') {
                return formik.setTouched({ id_role: true });
            }
            return setActiveStep((prevActiveStep) => prevActiveStep + 1);
        case 2:
            if (formik.values.syarat_ketentuan === false) {
                return formik.setTouched({ syarat_ketentuan: true });
            }
            return formik.handleSubmit();
        default:
            break;
        }
    };

    const handleSteps = (step) => {
        switch (step) {
        case 0:
            return (
            <Box>
                <CustomFormLabel htmlFor="nama_karyawan">Nama Karyawan</CustomFormLabel>
                <CustomTextField
                id="nama_karyawan"
                name="nama_karyawan"
                placeholder="Masukkan Nama Karyawan"
                variant="outlined"
                onChange={handleChange}
                value={formik.values.nama_karyawan}
                error={formik.touched.nama_karyawan && Boolean(formik.errors.nama_karyawan)}
                helperText={formik.touched.nama_karyawan && formik.errors.nama_karyawan}
                fullWidth
                />
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <CustomTextField
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan Email"
                variant="outlined"
                onChange={handleChange}
                value={formik.values.email}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField
                id="password"
                name="password"
                placeholder="Masukkan Password"
                variant="outlined"
                onChange={handleChange}
                value={formik.values.password}
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={() => setShowPassword(!showPassword)} disableRipple>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    )
                }}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
            </Box>
            );
        case 1:
            return (
            <Box>
                <CustomFormLabel htmlFor="id_role">Jabatan Karyawan</CustomFormLabel>
                <CustomSelect
                    id="id_role"
                    name="id_role"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={formik.values.id_role ? formik.values.id_role : 'none'}
                    error={formik.touched.id_role && Boolean(formik.errors.id_role)}
                >
                    <MenuItem value="none" disabled={true}>Pilih Jabatan Karyawan</MenuItem>
                    {role.filter((item) => item.nama_role !== "Owner").map((item) => (
                        <MenuItem key={item.id_role} value={item.id_role}>
                            {item.nama_role}
                        </MenuItem>
                    ))}
                </CustomSelect>
                <Typography variant="caption" color="error">
                    {formik.touched.id_role && formik.errors.id_role}
                </Typography>
                <CustomFormLabel htmlFor="tanggal_masuk">Tanggal Masuk</CustomFormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={formik.values.tanggal_masuk}
                        onChange={(value) => {
                            formik.setFieldValue("tanggal_masuk", value);
                        }}
                        renderInput={(params) => <CustomTextField {...params} id="tanggal_masuk"
                        fullWidth
                        error={formik.touched.tanggal_masuk && Boolean(formik.errors.tanggal_masuk)}
                        helperText={formik.touched.tanggal_masuk && formik.errors.tanggal_masuk} />}
                    />
                </LocalizationProvider>
            </Box>
            );
        case 2:
            return (
            <Box pt={3}>
                <Typography variant="h5">Syarat dan Ketentuan Karyawan</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Syarat dan Ketentuan Karyawan
                    <br />
                    1. Karyawan harus menjalankan tugas dengan penuh tanggung jawab.
                    <br />
                    2. Karyawan harus mematuhi peraturan perusahaan.
                    <br />
                    3. Karyawan harus menjaga kerahasiaan informasi perusahaan.
                    <br />
                    4. Karyawan harus melaporkan segala bentuk pelanggaran yang terjadi.
                    <br />
                    5. Karyawan harus menjaga hubungan baik dengan rekan kerja.
                    <br />
                    6. Karyawan harus mengikuti pelatihan dan pengembangan yang disediakan perusahaan.
                    <br />
                    7. Karyawan harus menjaga kebersihan dan kerapihan tempat kerja.
                    <br />
                    8. Karyawan harus menghormati atasan dan mengikuti instruksi yang diberikan.
                    <br />
                    9. Karyawan harus menjaga kesehatan dan keselamatan kerja.
                    <br />
                    10. Karyawan harus melaksanakan tugas sesuai dengan standar yang ditetapkan.
                </Typography>
                <FormControlLabel
                control={<CustomCheckbox 
                    name="syarat_ketentuan"
                    onChange={handleChange}
                    checked={formik.values.syarat_ketentuan}
                    />}
                label="Karyawan telah membaca dan menyetujui syarat dan ketentuan yang berlaku"
                />
                <Typography variant="caption" color="error" alignItems={'center'} display={'flex'}>
                    {formik.touched.syarat_ketentuan && formik.errors.syarat_ketentuan}
                </Typography>
            </Box>
            );
        default:
            break;
        }
    };

    return (
        <ParentCard title='Form Tambah Karyawan'>
        <Box width="100%">
            <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
                );
            })}
            </Stepper>
            <Box>{handleSteps(activeStep)}</Box>

            <Box display="flex" flexDirection="row" mt={3}>
            <Button
                color="warning"
                variant="contained"
                onClick={activeStep === 0 ? () => router.push('/administrator/karyawan') : handleBack}
                sx={{ mr: 1 }}
            >
                {activeStep === 0 ? 'Batal' : 'Kembali'}
            </Button>
            <Box flex="1 1 auto" />
                <Button
                    onClick={() => {
                        stepsCheck(activeStep);
                    }}
                    variant="contained"
                    color={activeStep === steps.length - 1 ? 'success' : 'primary'}
                >
                    {activeStep === steps.length - 1 ? 'Selesai' : 'Berikutnya'}
                </Button>
            </Box>
        </Box>
        </ParentCard>
    );
};

export default addkaryawanForm;

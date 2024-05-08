import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addKaryawan, getKaryawanById, updateKaryawan, deleteKaryawan } from '@/services/administrator/karyawan/karyawan';
import { getAllRoleData } from '@/services/administrator/role/role';
import Toast from '@/components/shared/Toast';
import { useRouter } from 'next/navigation';



export const useInsert = () => {
    const router = useRouter();
    const [role, setRole] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [showPassword, setShowPassword] = React.useState(false);
    const { toastSuccess, toastError } = Toast();

    React.useEffect(() => {
        getAllRoleData().then((response) => {
            setRole(response.data);
        });
    }, []);
    
    const validationSchema = yup.object({
        nama_karyawan: yup.string().required('Nama Karyawan harus diisi').max(255, 'Nama Karyawan maksimal 255 karakter'),
        email: yup.string().required('Email harus diisi').email('Email tidak valid'),
        password: yup.string().required('Password harus diisi').min(8, 'Password minimal 8 karakter'),
        id_role: yup.string().required('Jabatan Karyawan harus diisi'),
        tanggal_masuk: yup.date().required('Tanggal Masuk harus diisi'),
        syarat_ketentuan: yup.boolean().oneOf([true], 'Syarat dan Ketentuan harus disetujui'),
    });

    const formik = useFormik({
        initialValues: {
            nama_karyawan: '',
            email: '',
            password: '',
            id_role: '',
            tanggal_masuk: new Date(),
            syarat_ketentuan: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            values.tanggal_masuk = new Date(values.tanggal_masuk).toISOString().split("T")[0];
            const response = await addKaryawan(values);
            if (response.status === 'success') {
                toastSuccess(response.message);
                router.push('/administrator/karyawan');
            } else {
                if (response.type === 'validation') {
                    for (const key in response.message) {
                        formik.setFieldError(key, response.message[key][0]);
                        switch (key) {
                            case 'nama_karyawan':
                            case 'email':
                            case 'password':
                                setActiveStep(0);
                                break;
                            case 'id_role':
                            case 'tanggal_masuk':
                                setActiveStep(1);
                                break;
                            case 'syarat_ketentuan':
                                setActiveStep(2);
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    toastError(response.message);
                }
            }
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === 'syarat_ketentuan') {
            formik.setFieldValue(name, event.target.checked);
            return;
        }else{
            formik.setFieldValue(name, value);
        }
    };

    return { formik, role, showPassword, setShowPassword, handleChange, activeStep, setActiveStep };
}

export const useUpdate = (id) => {
    const router = useRouter();
    const [role, setRole] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const { toastSuccess, toastError } = Toast();

    React.useEffect(() => {
        getAllRoleData().then((response) => {
            setRole(response.data);
        });
        getKaryawanById(id).then((response) => {
            if(response.data.role.nama_role === 'Owner'){
                router.push('/administrator/karyawan');
            }
            formik.setValues({
                nama_karyawan: response.data.nama_karyawan,
                email: response.data.email,
                id_role: response.data.role.id_role,
                tanggal_masuk: new Date(response.data.tanggal_masuk),
            });
        });
    }, []);

    const validationSchema = yup.object({
        nama_karyawan: yup.string().required('Nama Karyawan harus diisi').max(255, 'Nama Karyawan maksimal 255 karakter'),
        email: yup.string().required('Email harus diisi').email('Email tidak valid'),
        id_role: yup.string().required('Jabatan Karyawan harus diisi'),
        tanggal_masuk: yup.date().required('Tanggal Masuk harus diisi'),
    });

    const formik = useFormik({
        initialValues: {
            nama_karyawan: '',
            email: '',
            id_role: '',
            tanggal_masuk: new Date(),
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            values.tanggal_masuk = new Date(values.tanggal_masuk).toISOString().split("T")[0];
            const response = await updateKaryawan(id, values);
            if (response.status === 'success') {
                toastSuccess(response.message);
                router.push('/administrator/karyawan');
            } else {
                if (response.type === 'validation') {
                    for (const key in response.message) {
                        formik.setFieldError(key, response.message[key][0]);
                        switch (key) {
                            case 'nama_karyawan':
                            case 'email':
                                setActiveStep(0);
                                break;
                            case 'id_role':
                            case 'tanggal_masuk':
                                setActiveStep(1);
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    toastError(response.message);
                }
            }
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value);
    }

    return { formik, role, handleChange, activeStep, setActiveStep };
}

export const useBonus = (id) => {
    const { toastSuccess, toastError } = Toast();

    const handleUpdateBonus = async (data) => {
        if(data.bonus_gaji === '') {
            toastError('Bonus Gaji harus diisi');
            return;
        }
        if(data.bonus_gaji <= 0) {
            toastError('Bonus Gaji tidak boleh kurang dari 0');
            return;
        }

        const response = await updateKaryawan(id, data);
        if (response.status === 'success') {
            toastSuccess(response.message);
        } else {
            if(response.type === 'validation') {
                for (const key in response.message) {
                    toastError(response.message[key][0]);
                }
            }else{
                toastError(response.message);
            }
        }
    }

    return { handleUpdateBonus };
}

export const useDelete = () => {
    const { toastSuccess, toastError } = Toast();

    const handleDelete = async (id) => {
        const response = await deleteKaryawan(id);
        if (response.status === 'success') {
            toastSuccess(response.message);
        } else {
            toastError(response.message);
        }
    }

    return { handleDelete };
}

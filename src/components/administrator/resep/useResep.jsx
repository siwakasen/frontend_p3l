import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Toast from '@/components/shared/Toast';
import { addResep, updateResep, deleteResep, getResepById } from '@/services/resep/resep';
import { getAllBahanBaku } from '@/services/bahan-baku/bahanBaku';

export const useInsert = () => {
    const router = useRouter();
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [numberOfField, setNumberOfField] = React.useState([
        { id: 1 },
    ]);
    const [data, setData] = React.useState([{}]);
    const [bahanBaku, setBahanBaku] = React.useState([]);
    React.useEffect(() => {
        getAllBahanBaku().then((response) => {
            setBahanBaku(response.data);
        });
    }, []);

    const validationSchema = yup.object({
        nama_resep: yup.string().required('Nama resep harus diisi').max(255, 'Nama resep maksimal 255 karakter'),
        detail_resep: yup.array().of(
            yup.object().shape({
                id_bahan_baku: yup.string().required('Bahan baku harus diisi'),
                jumlah: yup.string().required('Jumlah harus diisi').min(1, 'Jumlah minimal 1')
            })
        )
    });

    const formik = useFormik({
        initialValues: {
            nama_resep: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (data.some((item) => !item.bahanBaku || !item.jumlah || item.jumlah <= 0)) {
                toastWarning('Detail resep tidak boleh kosong atau jumlah tidak boleh kurang dari 1');
                setLoading(false);
                return;
            }

            const detailResep = data.reduce((acc, item) => {
                const existingItem = acc.find((accItem) => accItem.id_bahan_baku === item.bahanBaku);
                if (existingItem) {
                    existingItem.jumlah = parseInt(existingItem.jumlah) + parseInt(item.jumlah);
                } else {
                    acc.push({ id_bahan_baku: item.bahanBaku, jumlah: item.jumlah });
                }
                return acc;
            }, []);
            

            const response = await addResep({ nama_resep: values.nama_resep, detail_resep: detailResep });
            if (response.status === "success") {
                toastSuccess(response.message);
                router.push('/administrator/resep');
            } else {
                if (response.type === "validation") {
                    for (const key in response.message) {
                        formik.setFieldError(key, response.message[key][0]);
                    }
                } else {
                    toastError(response.message);
                }
            }
        },
    });

    const handleCheck = () => {
        formik.setTouched({nama_resep: true});
        if (data.some((item) => !item.bahanBaku || !item.jumlah)) {
            if (data.some((item) => !item.jumlah || item.jumlah <= 0)) {
                toastWarning('Jumlah tidak boleh kosong atau kurang dari 1');
            } else {
                toastWarning('Detail resep tidak boleh kosong');
            }
        }else return false;
        return true;
    }

    const handleChangeBahanBaku = (index) => (e) => {
        const values = [...data];
        if (index + 1 > values.length) {
            values.push({ bahanBaku: e.target.value, jumlah: '' });
        } else {
            values[index].bahanBaku = e.target.value;
        }
        setData(values);
    }

    const handleChangeJumlah = (index) => (e) => {
        const values = [...data];
        if (index + 1 > values.length) {
            values.push({ bahanBaku: '', jumlah: e.target.value });
        } else {
            values[index].jumlah = e.target.value;
        }
        setData(values);
    }

    const handleAddField = () => {
        setNumberOfField([...numberOfField, { id: numberOfField.length + 1 }]);
    }
    
    const handleRemoveField = (id, index) => {
        if (numberOfField.length === 1) {
            return toastWarning('Detail resep tidak boleh kosong');
        }
        setData(data.filter((item, i) => i !== index));
        setNumberOfField(numberOfField.filter((field) => field.id !== id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit(e);
    }

    return { formik, data, bahanBaku, numberOfField, handleChangeBahanBaku, handleChangeJumlah, handleAddField, handleRemoveField, handleCheck, handleSubmit };
}

export const useUpdate = (id) => {
    const router = useRouter();
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [numberOfField, setNumberOfField] = React.useState([
        { id: 1 },
    ]);
    const [data, setData] = React.useState([]);
    const [bahanBaku, setBahanBaku] = React.useState([]);

    React.useEffect(() => {
        getAllBahanBaku().then((response) => {
            setBahanBaku(response.data);
            getResepById(id).then((response) => {
                formik.setFieldValue('nama_resep', response.data.nama_resep);
                setNumberOfField(response.data.detail_resep.map((item, index) => ({ id: index + 1 })));
                setData(response.data.detail_resep.map((item) => ({ bahanBaku: item.id_bahan_baku, jumlah: item.jumlah })));
            });
        });
    }, []);

    const validationSchema = yup.object({
        nama_resep: yup.string().required('Nama resep harus diisi').max(255, 'Nama resep maksimal 255 karakter'),
        detail_resep: yup.array().of(
            yup.object().shape({
                id_bahan_baku: yup.string().required('Bahan baku harus diisi'),
                jumlah: yup.string().required('Jumlah harus diisi').min(1, 'Jumlah minimal 1')
            })
        )
    });

    const formik = useFormik({
        initialValues: {
            nama_resep: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (data.some((item) => !item.bahanBaku || !item.jumlah || item.jumlah <= 0)) {
                toastWarning('Detail resep tidak boleh kosong atau jumlah tidak boleh kurang dari 1');
                return;
            }

            const detailResep = data.reduce((acc, item) => {
                const existingItem = acc.find((accItem) => accItem.id_bahan_baku === item.bahanBaku);
                if (existingItem) {
                    existingItem.jumlah = parseInt(existingItem.jumlah) + parseInt(item.jumlah);
                } else {
                    acc.push({ id_bahan_baku: item.bahanBaku, jumlah: item.jumlah });
                }
                return acc;
            }, []);
            
            const response = await updateResep(id, { nama_resep: values.nama_resep, detail_resep: detailResep });
            if (response.status === "success") {
                toastSuccess(response.message);
                router.push('/administrator/resep');
            } else {
                if (response.type === "validation") {
                    for (const key in response.message) {
                        formik.setFieldError(key, response.message[key][0]);
                    }
                } else {
                    toastError(response.message);
                }
            }
        },
    });

    const handleCheck = () => {
        formik.setTouched({nama_resep: true});
        if (data.some((item) => !item.bahanBaku || !item.jumlah)) {
            if (data.some((item) => !item.jumlah || item.jumlah <= 0)) {
                toastWarning('Jumlah tidak boleh kosong atau kurang dari 1');
            } else {
                toastWarning('Detail resep tidak boleh kosong');
            }
        }else return false;
        return true;
    }

    const handleChangeBahanBaku = (index) => (e) => {
        const values = [...data];
        if (index + 1 > values.length) {
            values.push({ bahanBaku: e.target.value, jumlah: '' });
        } else {
            values[index].bahanBaku = e.target.value;
        }
        setData(values);
    }

    const handleChangeJumlah = (index) => (e) => {
        const values = [...data];
        if (index + 1 > values.length) {
            values.push({ bahanBaku: '', jumlah: e.target.value });
        } else {
            values[index].jumlah = e.target.value;
        }
        setData(values);
    }

    const handleAddField = () => {
        setNumberOfField([...numberOfField, { id: numberOfField.length + 1 }]);
    }

    const handleRemoveField = (id, index) => {
        if (numberOfField.length === 1) {
            return toastWarning('Detail resep tidak boleh kosong');
        }
        setData(data.filter((item, i) => i !== index));
        setNumberOfField(numberOfField.filter((field) => field.id !== id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit(e);
    }

    return { formik, data, bahanBaku, numberOfField, handleChangeBahanBaku, handleChangeJumlah, handleAddField, handleRemoveField, handleCheck, handleSubmit };
}

export const useDelete = () => {
    const { toastSuccess, toastError } = Toast();

    const handleDelete = async (id) => {
        const response = await deleteResep(id);
        if (response.status === "success") {
            toastSuccess(response.message);
        } else {
            toastError(response.message);
        }
    }

    return { handleDelete };
}


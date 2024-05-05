import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { register, emailCheck } from '@/services/auth/auth';
import Toast from '@/components/shared/Toast';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toastSuccess, toastError } = Toast();

    const validationSchema = yup.object({
        nama: yup.string().required("Nama harus diisi").max(255, "Nama maksimal 255 karakter"),
        email: yup.string().email("Email tidak valid").required("Email harus diisi").max(255, "Email maksimal 255 karakter").matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, "Email tidak valid"),
        password: yup.string().required("Password harus diisi").min(8, "Password minimal 8 karakter"),
        tanggal_lahir: yup.date().required("Tanggal lahir harus diisi"),
        no_hp: yup.string().required("Nomor HP harus diisi").matches(/^[0-9]+$/, "Nomor HP harus berupa angka").min(11, "Nomor HP minimal 11 angka").max(13, "Nomor HP maksimal 13 angka"),
    });

    const formik = useFormik({
        initialValues: {
            nama: "",
            email: "",
            password: "",
            tanggal_lahir: null,
            no_hp: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const emailExist = await emailCheck(values.email);
            if (emailExist) {
                formik.setFieldError("email", "Email sudah terdaftar");
                setLoading(false);
                return;
            }
            
            values.tanggal_lahir = new Date(values.tanggal_lahir).toISOString().split("T")[0];
            const response = await register(values);
            const { message, token } = response.data;
            switch (response.status) {
                case 201:
                    toastSuccess(message);
                    router.push("/auth/email-verification/" + token);
                    break;
                case 400:
                    toastError(message);
                    break;
                default:
                    toastError("Something went wrong!");
                    break;
            }
            setLoading(false);
        }
    });

    function handleInput(event) {
        formik.handleChange(event);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        formik.handleSubmit(event);
    }

    return { formik, loading, handleInput, handleSubmit };
}
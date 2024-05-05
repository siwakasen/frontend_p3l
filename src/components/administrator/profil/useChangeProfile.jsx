import React from 'react';
import Toast from "@/components/shared/Toast";
import { changePasswordKaryawan } from "@/services/auth/auth";
import { useFormik } from "formik";
import * as yup from "yup";

export const changePassword = () => {
    const { toastSuccess, toastError } = Toast();
    const [open, setOpen] = React.useState(false);

    const validationSchema = yup.object(
        {
          password: yup.string().required("Password lama harus diisi"),
          new_password: yup
            .string()
            .required("Password baru harus diisi")
            .min(8, "Password minimal 8 karakter"),
          confirm_password: yup
            .string()
            .required("Konfirmasi password harus diisi")
            .oneOf([yup.ref("new_password"), null], "Password tidak sama"),
        },
        []
      );
    
      const formik = useFormik({
        initialValues: {
          password: "",
          new_password: "",
          confirm_password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (e) => {
            setOpen(true);
        },
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
      };

    const handleChangePassword = async (id) => {
        const response = await changePasswordKaryawan(id, formik.values);
        if (response.status === 'success') {
            toastSuccess(response.message);
            formik.setFieldValue('password', '');
            formik.setFieldValue('new_password', '');
            formik.setFieldValue('confirm_password', '');
            formik.setTouched({});
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

    return { handleChangePassword, formik, handleChange, open, setOpen };
}
import Toast from "@/components/shared/Toast";
import { createRoleData, updateRoleData, deleteRoleData } from "@/services/role/role";

export const useInsert = () => {
    const { toastSuccess, toastError } = Toast();

    const handleInsert = async (data) => {
        const response = await createRoleData(data);
        if (response.status === "success") {
            toastSuccess(response.message);
        } else {
            if(response.type === "validation") {
                for (const key in response.message) {
                    toastError(response.message[key][0]);
                }
            }else{
                toastError(response.message);
            }
        }
    }

    return { handleInsert };
}

export const useUpdate = () => {
    const { toastSuccess, toastError } = Toast();

    const handleUpdate = async (id, data) => {
        const response = await updateRoleData(id, data);
        if (response.status === "success") {
            toastSuccess(response.message);
        } else {
            if(response.type === "validation") {
                for (const key in response.message) {
                    toastError(response.message[key][0]);
                }
            }else{
                toastError(response.message);
            }
        }
    }

    return { handleUpdate };
}

export const useUpdateSalary = () => {
    const {toastSuccess, toastError} = Toast();

    const handleUpdateSalary = async (id, data) => {
        data = { nominal_gaji: data };
        if(data.nominal_gaji === '') {
            toastError('Nominal Gaji harus diisi');
            return;
        }
        if(data.nominal_gaji <= 0) {
            toastError('Nominal Gaji tidak boleh kurang dari atau sama dengan 0');
            return;
        }
        const response = await updateRoleData(id, data);
        if (response.status === "success") {
            toastSuccess(response.message);
        } else {
            if(response.type === "validation") {
                for (const key in response.message) {
                    toastError(response.message[key][0]);
                }
            }else{
                toastError(response.message);
            }
        }
    }

    return { handleUpdateSalary };
}

export const useDelete = () => {
    const { toastSuccess, toastError } = Toast();

    const handleDelete = async (id) => {
        const response = await deleteRoleData(id);
        if (response.status === "success") {
            toastSuccess(response.message);
        } else {
            toastError(response.message);
        }
    }

    return { handleDelete };
}

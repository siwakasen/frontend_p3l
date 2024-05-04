import Toast from "@/components/shared/Toast";
import { createRoleData, updateRoleData, deleteRoleData } from "@/services/administrator/role/role";

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

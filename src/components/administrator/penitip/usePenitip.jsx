import { useState, useEffect } from "react";
import {insertPenitip, getPenitip, updatePenitip, deletePenitip} from "@/services/penitip/penitip";
import Toast from "@/components/shared/Toast";
import {useRouter} from "next/navigation";

export const useInsert = () => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [penitipInput, setPenitipInput] = useState({});
    const [open, setOpen] = useState(false);
    const router = useRouter();

    function handleSubmit(){
        let formData = new FormData();
        const isEmptyPenitip =
            !penitipInput.nama_penitip ||
            !penitipInput.alamat ||
            !penitipInput.no_hp;

        if(isEmptyPenitip){
            toastWarning("Data penitip tidak boleh kosong");
            setOpen(!open);
            return;
        }

        for(let key in penitipInput){
            formData.append(key, penitipInput[key]);
        }

        handleInsert(formData);
    }
}

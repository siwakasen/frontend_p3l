import React, { useState, useEffect } from "react";
import { insertBahanBaku, updateBahanBaku, getBahanBaku, deleteBahanBaku} from "@/services/bahan-baku/bahanBaku";
import Toast from "@/components/shared/Toast";
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";


export const useInsert = () => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [bahanBakuInput, setBahanBakuInput] = useState({});
    const [open, setOpen] = useState(false);
    const router = useRouter();


    function handleSubmit(){
        let formData = new FormData();
        if(!bahanBakuInput.stok){
            bahanBakuInput.stok = 0;
        }

        for(let key in bahanBakuInput){
            formData.append(key, bahanBakuInput[key]);
        }

        handleInsert(formData);
    }

    async function handleInsert(formData){
        try {
            const { data, code } = await insertBahanBaku(formData);
            if(code === 200){
                toastSuccess(data.message);
                router.push('/administrator/bahan-baku');
                return;
            }else{
                for(let key in data.message){
                    toastWarning(`${data.message[key]}`);
                    setOpen(!open);
                    return;
                }
            }
        } catch (error) {
            toastError(data.message);
        }
    }

    function handleOpen() {
        setOpen(!open);
    }

    return {
        bahanBakuInput,
        open,
        handleSubmit,
        handleOpen,
        setBahanBakuInput,
    };
}

export const useUpdate = (id) => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [bahanBakuInput, setBahanBakuInput] = useState({});
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBahanBaku(id);
            setData(response.data);
            distributeData(response.data);
        };
        fetchData();
    }, []);

    function distributeData(data) {
        setBahanBakuInput({
            nama_bahan_baku: data.nama_bahan_baku,
            stok: data.stok,
            satuan: data.satuan,
        });
    }

    function handleSubmit(){
        if(!bahanBakuInput.stok){
            bahanBakuInput.stok = 0;
        }
        handleUpdate(bahanBakuInput);
    }

    async function handleUpdate(formData){
        try {
            const { data, code } = await updateBahanBaku(id, formData);
            if(code === 200){
                toastSuccess(data.message);
                router.push('/administrator/bahan-baku');
                return;
            }else{
                for(let key in data.message){
                    toastWarning(`${data.message[key]}`);
                    setOpen(!open);
                    return;
                }
            }
        } catch (error) {
            toastError(data.message);
        }
    }

    function handleOpen(){
        setOpen(!open);
    }

    return {
        bahanBakuInput,
        open,
        handleSubmit,
        handleOpen,
        setBahanBakuInput,
    };
}

export const useDelete = ({loading, setLoading}) => {
    const { toastSuccess, toastError } = Toast();

    async function handleDelete(id){
        try {
        Array.from(id).forEach(async (id) => {
            const { data, code } = await deleteBahanBaku(id);
                if(code === 200){
                    toastSuccess(data.message);
                    setLoading(!loading);
                    return;
                }else{
                    toastError(data.message);
                }
            });
        } catch (error) {
            toastError(data.message);
        }
        setLoading(!loading);
    }

    return {handleDelete};
}

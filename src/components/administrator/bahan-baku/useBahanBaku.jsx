import React, { useState, useEffect } from "react";
import { insertBahanBaku, updateBahanBaku, getBahanBaku, deleteBahanBaku} from "@/services/bahan-baku/bahanBaku";
import Toast from "@/components/shared/Toast";
import { useRouter } from "next/navigation";


export const useInsert = () => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [bahanBakuInput, setBahanBakuInput] = useState({});
    const [open, setOpen] = useState(false);
    const router = useRouter();


    function handleSubmit(){
        let formData = new FormData();
        const isEmptyBahanBaku =
            !bahanBakuInput.nama_bahan_baku ||
            !bahanBakuInput.satuan;

        if(isEmptyBahanBaku){
            toastWarning("Data bahan baku tidak boleh kosong");
            setOpen(!open);
            return;
        }
        if(!bahanBakuInput.stok){
            bahanBakuInput.stok = 0;
        }

        if(bahanBakuInput.stok < 0){
            toastWarning("Stok tidak boleh kurang dari 0");
            return;
        }2

        for(let key in bahanBakuInput){
            formData.append(key, bahanBakuInput[key]);
        }

        handleInsert(formData);
    }

    async function handleInsert(formData){
        console.log(formData);
        try {
            const { data, code } = await insertBahanBaku(formData);
            if(code === 200){
                toastSuccess('Berhasil menambahkan data bahan baku');
                router.push('/administrator/bahan-baku');
                return;
            }else{
                toastError('Gagal menambahkan data bahan baku');
            }
        } catch (error) {
            toastError('Gagal menambahkan data bahan baku');
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
        const isEmptyBahanBaku =
            !bahanBakuInput.nama_bahan_baku ||
            !bahanBakuInput.satuan;
        
        if(isEmptyBahanBaku){
            toastWarning("Data bahan baku tidak boleh kosong");
            setOpen(!open);
            return;
        }
        if(!bahanBakuInput.stok){
            bahanBakuInput.stok = 0;
        }

        if(bahanBakuInput.stok < 0){
            toastWarning("Stok tidak boleh kurang dari 0");
            setOpen(!open);
            return;
        }

        handleUpdate(bahanBakuInput);
    }

    async function handleUpdate(formData){
        console.log(formData);
        try {
            const { data, code } = await updateBahanBaku(id, formData);
            if(code === 200){
                toastSuccess('Berhasil mengubah data bahan baku');
                router.push('/administrator/bahan-baku');
                return;
            }else{
                toastError('Gagal mengubah data bahan baku');
            }
        } catch (error) {
            toastError('Gagal mengubah data bahan baku');
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
            console.log(data.message);
                if(code === 200){
                    toastSuccess('Berhasil menghapus data bahan baku');
                    setLoading(!loading);
                    return;
                }else if(data.message.includes('used in other tables')){
                    toastError('Bahan Baku tidak dapat dihapus karena masih digunakan di produk/hampers');
                }else{
                    toastError('Gagal menghapus data bahan baku');
                }
            });
        } catch (error) {
            toastError('Gagal menghapus data bahan baku');
        }
        setLoading(!loading);
    }

    return {handleDelete};
}

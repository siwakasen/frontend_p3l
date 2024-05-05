import { useState, useEffect } from "react";
import {insertPengeluaranLain, getPengeluaranLain, updatePengeluaranLain, deletePengeluaranLain} from "@/services/pengeluaran-lain/pengeluaran-lain";
import Toast from "@/components/shared/Toast";
import {useRouter} from "next/navigation";

export const useInsert = () => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [pengeluaranLainInput, setPengeluaranLainInput] = useState({});
    const [open, setOpen] = useState(false);
    const router = useRouter();

    function handleSubmit(){
        let formData = new FormData();
        const isEmptyPengeluaranLain =
            !pengeluaranLainInput.nama_pengeluaran ||
            !pengeluaranLainInput.tanggal_pengeluaran ||
            !pengeluaranLainInput.nominal_pengeluaran;

        if(isEmptyPengeluaranLain){
            toastWarning("Data pengeluaran lain tidak boleh kosong");
            setOpen(!open);
            return;
        }
        if(pengeluaranLainInput.nominal_pengeluaran.length < 0){
            toastWarning("Nominal pengeluaran tidak boleh kurang dari 0");
            setOpen(!open);
            return;
        }

        for(let key in pengeluaranLainInput){
            formData.append(key, pengeluaranLainInput[key]);
        }

        handleInsert(formData);
    }

    async function handleInsert(formData){
        try{
            const { data, code } = await insertPengeluaranLain(formData);
            if(code === 200){
                toastSuccess('Berhasil menambahkan data pengeluaran lain');
                router.push('/administrator/pengeluaran-lain');
                return;
            }else{
                toastError('Gagal menambahkan data pengeluaran lain');
            }
        }catch (error){
            toastError(`${data.message}`);
        }
    }
    function handleOpen() {
        setOpen(!open);
    }

    return{
        pengeluaranLainInput,
        setPengeluaranLainInput,
        open,
        handleSubmit,
        handleOpen,
    }

    
}

export const useUpdate = (id) => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [pengeluaranLainInput, setPengeluaranLainInput] = useState({});
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const router = useRouter();

    function distributeData(data){
        setPengeluaranLainInput({
            nama_pengeluaran: data.nama_pengeluaran,
            tanggal_pengeluaran: data.tanggal_pengeluaran,
            nominal_pengeluaran: data.nominal_pengeluaran,
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await getPengeluaranLain(id);
            setData(response.data);
            distributeData(response.data);
        };
        fetchData();
    },[]);

    function handleSubmit(){
        const isEmptyPengeluaranLain =
            !pengeluaranLainInput.nama_pengeluaran ||
            !pengeluaranLainInput.tanggal_pengeluaran ||
            !pengeluaranLainInput.nominal_pengeluaran;
        
        if(isEmptyPengeluaranLain){
            toastWarning("Data pengeluaran lain tidak boleh kosong");
            setOpen(!open);
            return;
        }
        if(pengeluaranLainInput.nominal_pengeluaran.length < 0){
            toastWarning("Nominal pengeluaran tidak boleh kurang dari 0");
            setOpen(!open);
            return;
        }

        handleUpdate(pengeluaranLainInput);
    }

    async function handleUpdate(formData){
        try{
            const { data, code } = await updatePengeluaranLain(id, formData);
            if(code === 200){
                toastSuccess('Berhasil mengubah data pengeluaran lain');
                router.push('/administrator/pengeluaran-lain');
                return;
            }else{
                toastError(`${data.message}`);
            }
        }catch (error){
            toastError(`${data.error}`);
        }
    }

    function handleOpen() {
        setOpen(!open);
    }

    return{
        pengeluaranLainInput,
        setPengeluaranLainInput,
        open,
        handleSubmit,
        handleOpen,
    }
}

export const useDelete = ({loading, setLoading}) => {
    const { toastSuccess, toastError } = Toast();

    async function handleDelete(id){
        try{
            Array.from(id).forEach(async (id) => {
                const {data, code} = await deletePengeluaranLain(id);
                console.log(data);
                if(code === 200){
                    toastSuccess('Berhasil menghapus data pengeluaran lain');
                    return;
                }else{
                    toastError('Gagal menghapus data pengeluaran lain');
                }
            });
        }catch (error){
            toastError(`${data.message}`);
        }
        setLoading(!loading);
    }
    return {handleDelete};
}

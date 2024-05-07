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

        for(let key in pengeluaranLainInput){
            formData.append(key, pengeluaranLainInput[key]);
        }

        handleInsert(formData);
    }

    async function handleInsert(formData){
        try{
            const { data, code } = await insertPengeluaranLain(formData);
            if(code === 200){
                toastSuccess(data.message);
                router.push('/administrator/pengeluaran-lain');
                return;
            }else{
                for(let key in data.message){
                    toastWarning(`${data.message[key]}`);
                    setOpen(!open);
                    return;
                }
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
        handleUpdate(pengeluaranLainInput);
    }

    async function handleUpdate(formData){
        try{
            const { data, code } = await updatePengeluaranLain(id, formData);
            if(code === 200){
                toastSuccess(data.message);
                router.push('/administrator/pengeluaran-lain');
                return;
            }else{
                for(let key in data.message){
                    toastWarning(`${data.message[key]}`);
                    setOpen(!open);
                    return;
                }
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

export const useDelete = ({loading, setLoading}) => {
    const { toastSuccess, toastError } = Toast();

    async function handleDelete(id){
        try{
            Array.from(id).forEach(async (id) => {
                const {data, code} = await deletePengeluaranLain(id);
                if(code === 200){
                    toastSuccess(data.message);
                    return;
                }else{
                    toastError(data.message);
                }
            });
        }catch (error){
            toastError(`${data.error}`);
        }
        setLoading(!loading);
    }
    return {handleDelete};
}

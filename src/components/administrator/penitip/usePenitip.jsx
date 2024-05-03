import { useState, useEffect } from "react";
import {insertPenitip, getPenitip, updatePenitip, deletePenitip} from "@/services/penitip/penitip";
import Toast from "@/components/shared/Toast";
import {useRouter} from "next/navigation";
import { toast } from "react-toastify";

export const useInsert = () => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [penitipInput, setPenitipInput] = useState({});
    const [open, setOpen] = useState(false);
    const router = useRouter();

    function handleSubmit(){
        let formData = new FormData();
        const isEmptyPenitip =
            !penitipInput.nama_penitip ||
            !penitipInput.email ||
            !penitipInput.no_hp;

        if(isEmptyPenitip){
            toastWarning("Data penitip tidak boleh kosong");
            setOpen(!open);
            return;
        }
        if(!penitipInput.email.includes('@')){
            toastWarning("Email tidak valid");
            setOpen(!open);
            return;
        }
        if(penitipInput.no_hp.length < 10 || penitipInput.no_hp.length > 13){
            toastWarning("Nomor HP tidak valid");
            setOpen(!open);
            return;
        }

        for(let key in penitipInput){
            formData.append(key, penitipInput[key]);
        }

        handleInsert(formData);
    }

    async function handleInsert(formData){
        try{
            const { data, code } = await insertPenitip(formData);
            if(code === 200){
                toastSuccess('Berhasil menambahkan data penitip');
                router.push('/administrator/penitip');
                return;
            }else{
                toastError('Gagal menambahkan data penitip');
            }
        }catch (error){
            toastError(`${data.message}`);
        }
    }
    function handleOpen() {
        setOpen(!open);
    }

    return{
        penitipInput,
        setPenitipInput,
        open,
        handleSubmit,
        handleOpen,
    }

    
}

export const useUpdate = (id) => {
    const { toastSuccess, toastError, toastWarning } = Toast();
    const [penitipInput, setPenitipInput] = useState({});
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const router = useRouter();

    function distributeData(data){
        setPenitipInput({
            nama_penitip: data.nama_penitip,
            email: data.email,
            no_hp: data.no_hp,
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await getPenitip(id);
            setData(response.data);
            distributeData(response.data);
        };
        fetchData();
    },[]);

    function handleSubmit(){
        const isEmptyPenitip =
            !penitipInput.nama_penitip ||
            !penitipInput.email ||
            !penitipInput.no_hp;
        
        if(isEmptyPenitip){
            toastWarning("Data penitip tidak boleh kosong");
            setOpen(!open);
            return;
        }
        if(!penitipInput.email.includes('@')){
            toastWarning("Email tidak valid");
            setOpen(!open);
            return;
        }
        if(penitipInput.no_hp.length < 10 || penitipInput.no_hp.length > 13){
            toastWarning("Nomor HP tidak valid");
            setOpen(!open);
            return;
        }

        handleUpdate(penitipInput);
    }

    async function handleUpdate(formData){
        try{
            const { data, code } = await updatePenitip(id, formData);
            if(code === 200){
                toastSuccess('Berhasil mengubah data penitip');
                router.push('/administrator/penitip');
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
        penitipInput,
        setPenitipInput,
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
                const {data, code} = await deletePenitip(id);
                console.log(data);
                if(code === 200){
                    toastSuccess('Berhasil menghapus data penitip');
                    return;
                }else if(data.message.includes('have registered product')){
                    toastError('Gagal menghapus data penitip karena masih memiliki produk terdaftar');
                }else{
                    toastError('Gagal menghapus data penitip');
                }
            });
        }catch (error){
            toastError(`${data.message}`);
        }
        setLoading(!loading);
    }
    return {handleDelete};
}

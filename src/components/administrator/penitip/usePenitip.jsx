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

        for(let key in penitipInput){
            formData.append(key, penitipInput[key]);
        }

        handleInsert(formData);
    }

    async function handleInsert(formData){
        try{
            const { data, code } = await insertPenitip(formData);
            if(code === 200){
                toastSuccess(data.message);
                router.push('/administrator/penitip');
                return;
            }
            else{
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
        handleUpdate(penitipInput);
    }

    async function handleUpdate(formData){
        try{
            const { data, code } = await updatePenitip(id, formData);
            if(code === 200){
                toastSuccess(data.message);
                router.push('/administrator/penitip');
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

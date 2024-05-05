import { changeProfile, getProfile } from "@/services/user/profile/profile"
import { useDispatch } from "react-redux"
import { setUserLogin } from "@/utils/constants"
import Toast from "@/components/shared/Toast"

export const UseActions = () => {
    const { toastSuccess, toastError } = Toast()
    const dispatch = useDispatch()
    const handleProfile = async (data) => {
        const response = await changeProfile(data)
        const { status } = response
        if (status === 200) {
            const user = await getProfile()
            const { data } = user
            dispatch(setUserLogin(data.data));
            toastSuccess("Berhasil mengubah data")
        }else{
            toastError("Gagal mengubah data");
        }
        return response
    }
    return { handleProfile }
}
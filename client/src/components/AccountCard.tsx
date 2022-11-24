import React, { useEffect } from "react";
import { AccountObject, UserObject} from "../utils/interface";
import dayjs from "dayjs";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { asyncRemoveSingleAccount } from "../redux/reducers/accoutSlice";
import { useRouter } from "next/router";




const AccountCard = ({data}:{data:AccountObject}) => {
    const {user} = useAppSelector((state) => state.user);
    const {removeSingleAccountDone, removeSingleAccountError} = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if(removeSingleAccountDone){
            router.reload();
        }
        if(removeSingleAccountError){
            alert(removeSingleAccountError);
            return;
        }

    }, [removeSingleAccountDone, removeSingleAccountError]);

    const handleRemove = () => {
        if((user as UserObject | null)?.userId !== data.userId){
            alert("삭제 권한이 없습니다!!");
            return;
        }
        dispatch(asyncRemoveSingleAccount(data.accountId.toString()));

    }
    return ( 
        <div className="p-3 border-b-4 w-full flex items-center justify-between ">
            <div className="flex flex-col">
                <div className="text-sm">{dayjs(data.createAt).format("MM월 DD일 HH:mm")}</div>
                <div className="mt-1 font-semibold">{data.value}원 {data.type==="spending"?"지출":"수입"}</div>
                <small className="mt-1 text-gray-900">{data.content}</small>
            </div>
            <div className="flex items-center">
                <Link href={`/account/edit/${data.accountId}`} className="p-2   border rounded bg-white ">수정</Link>
                <button onClick={handleRemove} className="p-2 border rounded ml-3 bg-white text-red-500">삭제</button>
                
            </div>
           
            
        </div>
    );
};

export default AccountCard;
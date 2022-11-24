import React from "react";
import { AccountList } from "../pages/account";
import dayjs from "dayjs";
import Link from "next/link";
const AccountCard = ({data}:{data:AccountList}) => {
    return (
        <div className="p-3 border-b-4 w-full flex items-center justify-between ">
            <div className="flex flex-col">
                <div className="text-sm">{dayjs(data.createAt).format("MM월 DD일 HH:mm")}</div>
                <div className="mt-1 font-semibold">{data.value}원 {data.type==="spending"?"지출":"수입"}</div>
                <small className="mt-1 text-gray-900">{data.content}</small>
            </div>
            <div className="flex items-center">
                <button className="p-2 border rounded bg-white text-red-500">삭제</button>
                <Link href={"/account/create"} className="p-2  ml-3 border rounded bg-white ">수정</Link>
            </div>
           
            
        </div>
    );
};

export default AccountCard;
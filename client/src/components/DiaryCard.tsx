import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import { DiaryObject } from "../utils/interface";



const DiaryCard = ({data}: {
    data: DiaryObject
}) => {
    return (
        <Link href={`/diary/${data.postId}`} className="p-3 border-b-4 w-full flex items-center justify-between ">
            <div className="flex flex-col">
                <div className="text-sm">{dayjs(data.createAt).format("MM월 DD일")}</div>
                <div className="mt-1 font-semibold">{data.title}</div>

            </div>
            <div className="flex items-center">
                <Link href={`/account/edit/${data.postId}`} className="p-2   border rounded bg-white ">수정</Link>
                <button className="p-2 border rounded ml-3 bg-white text-red-500">삭제</button>
                
            </div>
       
        
        </Link>
    )
};

export default DiaryCard;



import Link from "next/link";
import React from "react";
import dayjs from "dayjs";


export interface DiaryObject {
    postId: number;
    title: string;
    content: string;
    createAt: string;
    updateAt: string;
    userId: number;
}

const DiaryCard = ({data}: {
    data: DiaryObject
}) => {
    return (
        <div className="p-3 border-b-4 w-full flex items-center justify-between ">
            <div className="flex flex-col">
                <div className="text-sm">{dayjs(data.createAt).format("MM월 DD일")}</div>
                <div className="mt-1 font-semibold">{data.title}</div>

            </div>
            <div className="flex items-center">
                <Link href={`/account/edit/${data.postId}`} className="p-2   border rounded bg-white ">수정</Link>
                <button className="p-2 border rounded ml-3 bg-white text-red-500">삭제</button>
                
            </div>
       
        
    </div>
    )
};

export default DiaryCard;



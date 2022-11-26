import Link from "next/link";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { DiaryObject, UserObject } from "../utils/interface";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from "next/router";
import { asyncRemoveSingleDiary } from "../redux/reducers/diarySlice";



const DiaryCard = ({data}: {
    data: DiaryObject
}) => {
    const {user} = useAppSelector((state) => state.user);
    const {removeSingleDiaryDone, removeSingleDiaryError} = useAppSelector((state) => state.diary);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if(removeSingleDiaryDone){
            router.reload();
        }
        if(removeSingleDiaryError){
            alert(removeSingleDiaryError);
            return;
        }
    }, [removeSingleDiaryDone, removeSingleDiaryError])

    const handleRemove = () => {
        if((user as UserObject | null)?.userId !== data.userId){
            alert("삭제 권한이 없습니다.");
            return;
        }
        dispatch(asyncRemoveSingleDiary(data.postId));

    }

    const handleEdit = () => {
        if((user as UserObject | null)?.userId !== data.userId){
            alert("수정 권한이 없습니다.");
            return;
        }
        router.push(`/diary/edit/${data.postId}`);
    }
    return (
        <Link href={`/diary/${data.postId}`}  className="p-3 border-b-4 w-full flex items-center justify-between ">
            <div className="flex flex-col">
                <div className="text-sm">{dayjs(data.createAt).format("MM월 DD일")}</div>
                <div className="mt-1 font-semibold">{data.title}</div>

            </div>
            <div className="flex items-center">
                <button onClick={handleEdit} className="p-2   border rounded bg-white ">수정</button>
                <button onClick={handleRemove} className="p-2 border rounded ml-3 bg-white text-red-500 hover:bg-red-500 hover:text-white ">삭제</button>
                
            </div>
       
        
        </Link>
    )
};

export default DiaryCard;



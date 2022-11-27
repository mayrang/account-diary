import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { asyncAddSingleDiary, asyncEditSingleDiary } from "../redux/reducers/diarySlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { DiaryObject } from "../utils/interface";

const DiaryForm = ({isEdit}: {
    isEdit: boolean;
}) => {
    const {addSingleDiaryDone, addSingleDiaryError, singleDiary, editSingleDiaryDone, editSingleDiaryError} = useAppSelector((state) => state.diary);
    const [title, setTitle] = useState((singleDiary as DiaryObject | null)?.title||"");
    const [content, setContent] = useState((singleDiary as DiaryObject | null)?.content||"");
    const dispatch = useAppDispatch();
   
    const {user} = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if(!user){
            router.replace("/login");
        }
        if(addSingleDiaryDone){
            router.replace("/diary");
        }
        if(addSingleDiaryError){
            alert(addSingleDiaryError);
            return;
        }
        if(editSingleDiaryDone){
            router.replace("/diary");

        }
        if(editSingleDiaryError){
            alert(editSingleDiaryError);
            return;
        }
    }, [user, addSingleDiaryDone, addSingleDiaryError, editSingleDiaryDone, editSingleDiaryError])

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(title.trim() === ""){
            alert("제목은 비워둘 수 없습니다!");
            return;
        }
        if(content.trim() === ""){
            alert("내용은 비워둘 수 없습니다!");
            return;
        }
        if(isEdit){
            const data = {
                title,
                content,
                postId : (singleDiary as DiaryObject).postId 
            }
            dispatch(asyncEditSingleDiary(data));
        }else{
            const data = {
                title,
                content
            }
            dispatch(asyncAddSingleDiary(data));
        }

    }

    return (
        <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white p-6 border rounded shadow-2xl w-10/12 md:w-8/12 h-auto">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-extrabold">일기</h2>
                    <div className="mt-7 flex max-md:flex-col">
                        <label htmlFor="title" className="text-lg font-semibold">제목</label>
                        <input id="title" className="border bg-gray-50 rounded ml-3 w-11/12" value={title} onChange={(e) => setTitle(e.target.value)}/>

                    </div>
                    <div className="mt-7 flex flex-col">
                        <label htmlFor="content" className="text-lg font-semibold">내용</label>
                        <textarea id="content" className="border rounded bg-gray-50 mt-3 w-full h-80" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div className="flex justify-end items-center mt-4 md:mt-3">
                            <button type="submit" className="py-2 px-4 border bg-white rounded">등록</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default DiaryForm;
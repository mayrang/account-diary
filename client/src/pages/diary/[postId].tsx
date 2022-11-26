import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import { asyncLoadSingleDiary } from "../../redux/reducers/diarySlice";
import { asyncUserLoadMyInfo } from "../../redux/reducers/userSlice";
import wrapper, { useAppSelector } from "../../redux/store";
import { DiaryObject } from "../../utils/interface";

const SingleDiary = () => {
    const {singleDiary, loadSingleDiaryError} = useAppSelector((state) => state.diary);
    const {user} = useAppSelector((state) => state.user);
    const router = useRouter();
    const diaryPost = singleDiary as DiaryObject | null;
    useEffect(() => {
        if(!user){
            router.replace("/login");
        }
        if(loadSingleDiaryError){
            alert(loadSingleDiaryError);
            router.push("/diary");
            
        }
    }, [loadSingleDiaryError, user])

    return (
        <>
        <Header />
        <div className="h-screen w-full flex flex-col justify-center bg-gray-200 items-center">
            <div className="flex flex-col  w-11/12 p-4 overflow-auto md:w-10/12 h-5/6 bg-white border rounded shadow-2xl">
                <div className="flex flex-col border-b-2 pt-3">
                    <h2 className="font-bold text-xl">{diaryPost?.title}</h2>
                    <div className="flex justify-end items-center">
                        <div className="flex flex-col">
                            {diaryPost?.createAt&&(
                                <small>{`작성 날짜: ${dayjs(diaryPost.createAt).format("YYYY-MM-DD HH:mm")}`}</small>
                            )}
                            {diaryPost?.updateAt !== diaryPost?.createAt&&(
                                <small>{`수정 날짜: ${dayjs(diaryPost?.updateAt).format("YYYY-MM-DD HH:mm")}`}</small>
                            )}
                        </div>
                    </div>
                </div>
                <div className="pt-3 text-lg">
                    {diaryPost?.content}
                </div>
               
            </div>
        </div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, params}) => {
    const cookie = req.headers.cookie;
    
    
    if(cookie){
        await store.dispatch(asyncUserLoadMyInfo(cookie));
        if(params?.postId){
            const postId = params.postId;
            const data = {
                postId,
                cookie
            }
            await store.dispatch(asyncLoadSingleDiary(data));
        }
    }

    return {
        props: {}
    };
});

export default SingleDiary;
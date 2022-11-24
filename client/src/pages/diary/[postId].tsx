import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { asyncLoadSingleDiary } from "../../redux/reducers/diarySlice";
import { asyncUserLoadMyInfo } from "../../redux/reducers/userSlice";
import wrapper, { useAppSelector } from "../../redux/store";
import { DiaryObject } from "../../utils/interface";

const SingleDiary = () => {
    const {singleDiary, loadSingleDiaryError} = useAppSelector((state) => state.diary);
    const {user} = useAppSelector((state) => state.user);
    const router = useRouter();
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
        <div className="h-screen w-full flex flex-col justify-center bg-gray-200 items-center">
            <div className="flex flex-col items-center w-11/12 p-4 md:w-10/12 h-5/6 bg-white border rounded shadow-2xl">
                <h2 className="font-bold text-xl">{(singleDiary as DiaryObject|null)?.title}</h2>
            </div>
        </div>
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
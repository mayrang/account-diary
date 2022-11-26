import React from "react";
import DiaryForm from "../../../components/DiaryForm";
import { asyncLoadSingleDiary } from "../../../redux/reducers/diarySlice";
import { asyncUserLoadMyInfo } from "../../../redux/reducers/userSlice";
import wrapper from "../../../redux/store";

const diaryEdit = () => {
    return (
        <DiaryForm isEdit={true} />
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, params}) => {
    const cookie = req.headers.cookie;
    if(cookie){
        await store.dispatch(asyncUserLoadMyInfo(cookie));
        if(params?.postId){
            const postId = params.postId ;
            if(postId){
                const data={
                    postId,
                    cookie
                }
                await store.dispatch(asyncLoadSingleDiary(data));
    
            }
        } 
    }
    return {
        props: {}
    }
})

export default diaryEdit;
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";

import { asyncAddSinglePost } from "../../redux/reducers/accoutSlice";
import { asyncUserLoadMyInfo } from "../../redux/reducers/userSlice";
import wrapper, { useAppDispatch, useAppSelector } from "../../redux/store";

const AccountCreate = () => {
    const [value, setValue] = useState("");
    const [type, setType] = useState("");
    const [content, setContent] = useState("");
    const {user} = useAppSelector((state) => state.user);
    const {addSingleAccountDone, addSingleAccountError} = useAppSelector((state) => state.account);
    const spendingRef = useRef<HTMLInputElement>(null);
    const incomeRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const router =  useRouter();

    useEffect(() => {
        if(!user){
            alert("로그인을 해주세요");
            router.replace("/login");
        }
        if(addSingleAccountDone){
            router.replace("/account");
        }
        if(addSingleAccountError){
            alert(addSingleAccountError);
            return;
        }
    }, [addSingleAccountDone, addSingleAccountError, user]);

    

    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "spending"){
            if(e.target.checked){
                if(incomeRef.current){
                    incomeRef.current.checked = false
                }
                setType(e.target.name);
            }else{
                setType("");
            }
        }else if(e.target.name === "income"){
            if(e.target.checked){
                if(spendingRef.current){
                    spendingRef.current.checked = false
                }
                setType(e.target.name);
            }else{
                setType("");   
            }
        }else{
            return;
        }

    };

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        console.log(type, value)
        if(content.trim() === ""){
            alert("내용을 입력해주세요");
            return;

        }else if(value.trim() === ""){
            alert("금액을 입력해주세요");
            return;
        }else if(isNaN(Number(value))){
            alert("금액에는 숫자만 입력할 수 있습니다!");
            return;
        }
        const data = {
            type,
            value,
            content
        }
        dispatch(asyncAddSinglePost(data));
    }


    return (
        <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white p-6 border rounded shadow-2xl w-10/12 md:w-6/12 h-2/4">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-extrabold">텅장 추가</h2>
                    <div className="mt-7 flex flex-col">
                        <h3 className=" text-lg font-semibold">유형 선택</h3>
                        <div className='w-1/3 flex items-center mt-2'>
                            <input id="spending" name="spending" className='w-6 h-6 bg-gray-400 border-gray-300 text-blue-500' ref={spendingRef} onChange={handleType} type={"checkbox"}/>
                            <label className='ml-2 text-lg   font-medium text-gray-900' htmlFor='spending'>지출</label>
                        </div>
                        <div className='w-1/3 flex items-center mt-4'>
                            <input id="income" name="income" className='w-6 h-6 bg-gray-400 border-gray-300 text-blue-500' ref={incomeRef} onChange={handleType} type={"checkbox"}/>
                            <label className='ml-2 text-lg font-medium text-gray-900' htmlFor='income'>수입</label>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col">
                        <label htmlFor="content" className="text-lg font-semibold">내용</label>
                        <input  id="content" className="mt-2 p-2 border bg-gray-50 rounded" placeholder="내용을 입력해주세요" value={content} onChange={(e) => setContent(e.target.value)}/>
                    </div>
                    <div className="mt-5 flex flex-col">
                        <label htmlFor="value" className="text-lg font-semibold">금액</label>
                        <input  id="value" className="mt-2 p-2 border bg-gray-50 rounded" placeholder="금액을 입력해주세요" value={value} onChange={(e) => setValue(e.target.value)}/>
                    </div>
                    <div className="flex justify-end items-center mt-4 md:mt-3">
                        <button type="submit" className="py-2 px-4 border bg-white rounded">등록</button>
                    </div>

                </form>
                
            </div>

        </div>
    );
};


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {

    const cookie = req.headers.cookie;
    console.log("cookie", typeof(cookie))
    if(cookie){
        await store.dispatch(asyncUserLoadMyInfo(cookie))
    }
    return {
        props: {}
    }

    
})

export default AccountCreate;
import Link from "next/link";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from "next/router";
import { asyncUserLogin } from "../redux/reducers/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const {loginError, loginDone} = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if(loginDone){
            router.replace("/");
        }
        if(loginError){
            alert(loginError);
            return;
        }
    },[loginDone, loginError])


    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        if(email.trim() === ""){
            alert("이메일은 비워둘 수 없습니다.");
            return;
        }else if(password.trim() === ""){
            alert("비밀번호는 비워둘 수 없습니다.");
            return;
        }
        const data = {
            email,
            password
        };
        dispatch(asyncUserLogin(data))
        // try{
        //     const result = await axios.post("/user/login", {
        //         email,
        //         password
        //     });
            
            
        // }catch(err:any){
        //     console.log(err);
        //     alert(err.response?.data?.error || err.response?.data?.email || err.response?.data?.password || "회원가입 에러");
        //     return;
        // }

    }

    return (
        <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
            <div className="flex flex-col   p-6 bg-white rounded-lg w-11/12 h-3/6 md:w-6/12 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-extrabold">로그인</h2>
                    <div className="mt-7 flex flex-col justify-center">
                        <label htmlFor="email" className="ml-1 font-semibold">이메일</label>
                        <input type="email" id="email" className="mt-2 bg-gray-50 border rounded p-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mt-6 flex flex-col justify-center">
                        <label htmlFor="password" className="ml-1 font-semibold">비밀번호</label>
                        <input type="password" id="password" className="mt-2 bg-gray-50 border rounded p-1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex flex-col items-end mt-5">
                        <button type="submit" className="p-2 border rounded bg-white hover:bg-blue-500 hover:text-white">로그인</button>
                        <Link href={"/register"} className=" text-xs text-blue-500 mt-3 mr-1 hover:text-gray-900 hover:underline">아직 회원이 아니신가요?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { asyncUserRegister } from "../redux/reducers/userSlice";
import { AppDispatch, useAppDispatch, useAppSelector } from "../redux/store";

const Register = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {registerError, registerDone} = useAppSelector((state) => state.user);


    useEffect(() => {
        if(registerDone){
            router.push("/");
        }
        if(registerError){
            alert(registerError);
            return;
        }
    }, [registerDone, registerError])

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        if(email.trim() === ""){
            alert("이메일을 비워둘 수 없습니다.");
            return;
        }else if(password.trim() === ""){
            alert("비밀번호는 비워둘 수 없습니다.");
            return;
        }else if(nickname.trim() === ""){
            alert("닉네임은 비워둘 수 없습니다.");
            return;
        }else if(checkPassword.trim() === ""){
            alert("비밀번호 확인은 비워둘 수 없습니다.")
            return;
        }else if(password !== checkPassword){
            alert("비밀번호와 비밀번호 확인의 값이 동일하지 않습니다");
            return;
        }
        const data = {
            email,
            nickname,
            password,
            checkPassword,
        }
        dispatch(asyncUserRegister(data));
        // try{
        //     const result = await axios.post("/user/register", {
        //         email,
        //         nickname,
        //         password,
        //         checkPassword,
        //     });
        //     router.push("/");
        // }catch(err:any){
        //     console.log(err)
        //     alert(err.response?.data?.error || err.response?.data?.email ||  err.response?.data?.nickname || err.response?.data?.password || "회원가입 에러");
        //     return;
        // }
        
    }

    return (
        <>
        <Header />
        <div className="w-full h-screen flex justify-center bg-gray-200 items-center">
            <div className="flex flex-col   p-6 bg-white rounded-lg w-11/12 h-4/6 md:w-6/12 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-extrabold">회원가입</h2>
                    <div className="mt-7 flex flex-col justify-center">
                        <label htmlFor="email" className="ml-1 font-semibold">이메일</label>
                        <input id="email" type="email" className="mt-2 bg-gray-50 border rounded p-1" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mt-6 flex flex-col justify-center">
                        <label htmlFor="nickname" className="ml-1 font-semibold">닉네임</label>
                        <input id="nickname"  className="mt-2 bg-gray-50 border rounded p-1" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    </div>
                    <div className="mt-6 flex flex-col justify-center">
                        <label htmlFor="password" className="ml-1 font-semibold">비밀번호</label>
                        <input id="password" type="password" className="mt-2 bg-gray-50 border rounded p-1" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mt-6 flex flex-col justify-center">
                        <label htmlFor="checkPassword" className="ml-1 font-semibold">비밀번호 확인</label>
                        <input id="checkPassword" type="password" className="mt-2 bg-gray-50 border rounded p-1" placeholder="비밀번호 확인" value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-col  items-end mt-5">
                        <button type="submit" className=" p-2 border rounded bg-white hover:bg-blue-500 hover:text-white">회원가입</button>
                        <Link className=" text-xs text-blue-500 mt-3 mr-1 hover:text-gray-900 hover:underline" href="/login">로그인 하러 가기</Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register;
import Link from "next/link";
import React from "react";
import Header from "../../components/Header";

const AccountList = () => {
    return(
        <>
        <Header />
        <div className="h-screen w-full bg-gray-200 flex flex-col justify-center items-center">
            
            <div className="flex flex-col items-center overflow-auto justify-center w-11/12 h-5/6 md:w-6/12  bg-white border rounded-lg shadow-2xl">
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
                <div className="h-10">hello</div>
            </div>
            <Link href={"/account/create"} className="fixed right-5  bottom-3  md:right-1/4  border p-3 bg-white rounded">
                추가하기
            </Link>
            
        </div>
        
       
        </>
    )
};

export default AccountList;
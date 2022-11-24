import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "../../components/Header";
import wrapper, { useAppSelector } from "../../redux/store";
import { asyncUserLoadMyInfo } from "../../redux/reducers/userSlice";
import {  asyncLoadAccountList } from "../../redux/reducers/accoutSlice";
import AccountCard from "../../components/AccountCard";

export interface AccountList  {
    accountId: number;
    value: number;
    createAt: Date;
    content: string;
    type: string;
    userId: number;
    typeValue: number;
}

const AccountList = () => {
    const router = useRouter();
    const year = router.query.year as string|undefined;
    const month = router.query.month as string|undefined;
    const {user} = useAppSelector((state) => state.user);
    const {loadAccountListError, accountList} = useAppSelector((state) => state.account);
    // 년도와 월을 표시하기 위한 변수
    const calendarYear = year||dayjs().format("YYYY");
    const calendarMonth = month||dayjs().format("MM");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        let total = 0;
        (accountList as AccountList[] | []).forEach(({typeValue}) => {

            total += typeValue 
        })
        console.log(total)
        setBalance(total);
    }, [accountList]);

    useEffect(() => {
        if(!user){
            router.replace("/login");
        }
        if(loadAccountListError){
            alert(loadAccountListError);
            return
        }
    }, [user, loadAccountListError])

     // 다음 달
     const clickNext = () => {
        if(parseInt(calendarMonth) === 12){
            router.push({
                pathname: "/account",
                query: {
                    year: (parseInt(calendarYear)+1).toString(),
                    month: "1"
                }
            })
        }else{
            router.push({
                pathname: "/account",
                query: {
                    year: calendarYear.toString(),
                    month: (parseInt(calendarMonth)+1).toString()
                }
            })
        }
    };

    // 이전 달
    const clickPrev = () => {
        if(parseInt(calendarMonth) === 1){
            router.push({
                pathname: "/account",
                query: {
                    year: (parseInt(calendarYear)-1).toString(),
                    month: "12"
                }
            })
        }else{
            router.push({
                pathname: "/account",
                query: {
                    year: calendarYear.toString(),
                    month: (parseInt(calendarMonth)-1).toString()
                }
            });

        }
    };
    return(
        <>
        <Header />
        <div className="h-screen w-full bg-gray-200 flex flex-col justify-center items-center">
            
            <div className="flex flex-col items-center overflow-auto  w-11/12 h-5/6 md:w-6/12  bg-white border rounded-lg shadow-2xl">
                <div className="flex items-center border-b-2 justify-between w-full  p-3 ">
                    <div onClick={clickPrev}  className="text-2xl">{"<"}</div>
                    <div  className="text-2xl md:pr-1 ">{calendarYear}년 {calendarMonth}월</div>
                    <div onClick={clickNext} className="text-2xl">{">"}</div>
                </div>
                <div className="w-full text-center py-1 text-lg font-semibold border-b-2">
                    잔액 : {balance}원
                </div>
                {accountList.map((it:any) => (
                  <AccountCard key={it.accountId} data={it} /> 
                ))}
            </div>
            <Link href={"/account/create"} className="fixed right-5  bottom-3  md:right-1/4  border p-3 bg-white rounded">
                추가하기
            </Link>
            
        </div>
        
       
        </>
    )
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, query}) => {
    const cookie = req.headers.cookie;
    console.log("cookie", typeof(cookie));
    if(cookie){
        await store.dispatch(asyncUserLoadMyInfo(cookie))
    }
    const month = query.month as string|undefined;
    const year = query.year as string|undefined;
    const calendarYear = year||dayjs().format("YYYY");
    const calendarMonth = month||dayjs().format("MM");
    const data = {
        year: calendarYear,
        month: calendarMonth,
        cookie
    };
    console.log(data)
    await store.dispatch(asyncLoadAccountList(data));
    return {
        props: {}
    }
})

export default AccountList;
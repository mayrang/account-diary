import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import dayjs from "dayjs";
import wrapper, { useAppSelector } from "../../redux/store";
import { asyncUserLoadMyInfo } from "../../redux/reducers/userSlice";
import { asyncLoadDiaryList } from "../../redux/reducers/diarySlice";
import DiaryCard from "../../components/DiaryCard";
import { DiaryObject } from "../../utils/interface";

const DiaryList = () => {
    const router = useRouter();
    // 년도와 월을 표시하기 위한 변수
    const year = router.query.year as string|undefined;
    const month = router.query.month as string|undefined;
    const calendarYear = year||dayjs().format("YYYY");
    const calendarMonth = month||dayjs().format("MM");
    const {diaryList, loadDiaryListError} = useAppSelector((state) => state.diary);
    const {user} = useAppSelector((state) => state.user);

    useEffect(() => {
        if(!user){
            router.replace("/login");
            
        }
        if(loadDiaryListError){
            alert(loadDiaryListError);
            return;
        }
    }, [loadDiaryListError, user])

    // 다음 달
    const clickNext = () => {
        if(parseInt(calendarMonth) === 12){
            router.push({
                pathname: "/diary",
                query: {
                    year: (parseInt(calendarYear)+1).toString(),
                    month: "1"
                }
            })
        }else{
            router.push({
                pathname: "/diary",
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
                pathname: "/diary",
                query: {
                    year: (parseInt(calendarYear)-1).toString(),
                    month: "12"
                }
            })
        }else{
            router.push({
                pathname: "/diary",
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
                        <div onClick={clickPrev}  className="text-2xl cursor-pointer">{"<"}</div>
                        <div  className="text-2xl md:pr-1 ">{calendarYear}년 {calendarMonth}월</div>
                        <div onClick={clickNext} className="text-2xl cursor-pointer">{">"}</div>
                </div>
                {diaryList.map((it:any) => (
                    <DiaryCard key={it.postId} data={it} />
                ))}
                
            </div>
            <Link href="/diary/create" className="fixed right-5  bottom-2  md:right-1/4  border p-3 bg-white rounded">
                추가하기
            </Link>
            
        </div>
        
       
        </>
    )
};

 export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, query}) => {
    const cookie = req.headers.cookie;
    if(cookie){
        await store.dispatch(asyncUserLoadMyInfo(cookie));
    }
    const month = query.month as string | undefined;
    const year = query.year as string|undefined;
    const calendarYear = year||dayjs().format("YYYY");
    const calendarMonth = month||dayjs().format("MM");
    const data = {
        year: calendarYear,
        month: calendarMonth,
        cookie
    };
    await store.dispatch(asyncLoadDiaryList(data));
    return {
        props: {}
    };
 })

export default DiaryList;
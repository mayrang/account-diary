import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import { asyncUserLoadMyInfo, asyncUserLogout } from "../redux/reducers/userSlice";
import wrapper, { useAppDispatch, useAppSelector } from "../redux/store";

export default function Home() {

  const {user, logoutDone, logoutError} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(asyncUserLogout());
  }

  useEffect(() => {
    if(logoutDone){
      router.reload()
    }
    if(logoutError){
      alert(logoutError);
      return;
    }
  }, [logoutDone, logoutError])

  return (
    <div className="h-screen w-full bg-gray-200 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center w-11/12 h-4/6 md:w-6/12 md:h-3/5 bg-white border rounded-lg shadow-2xl">
            <div className="text-2xl font-bold">텅장일기</div>
            <div className="mt-14 flex items-center">
                {user ? (
                  <>
                    <Link href={"/account"} className="py-2 px-4 bg-white rounded border">텅장</Link>
                    <Link href={"/diary"} className="py-2 px-4 ml-8 bg-white rounded border">일기</Link>
                  </>
                ):(
                  <> 
                  <Link href={"/login"} className="py-2 px-4  bg-white rounded border">로그인</Link>
                  <Link href={"/register"} className="p-2 ml-8 bg-white rounded border">회원가입</Link>
                 
                  </>
                )}
                
            </div>
            <small onClick={handleLogout} className="mt-4 text-sm text-red-500 hover:text-gray-900 hover:underline">로그아웃</small>
        </div>
   
   </div>
  )
}

export const getServerSideProps =  wrapper.getServerSideProps((store) => async ({req}) => {

  const cookie = req.headers.cookie;
  console.log("cookie", typeof(cookie))
  if(cookie){
    await store.dispatch(asyncUserLoadMyInfo(cookie))
  }

  return {
    props: {}
  };

})

import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="h-screen w-full bg-gray-200 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center w-11/12 h-4/6 md:w-6/12 md:h-3/5 bg-white border rounded-lg shadow-2xl">
            <div className="text-2xl font-bold">텅장일기</div>
            <div className="mt-14 flex items-center">
                <Link href={"/register"} className="p-2 bg-white rounded border">회원가입</Link>
                <Link href={"/login"} className="py-2 px-4 ml-8 bg-white rounded border">로그인</Link>
            </div>
        </div>
   
   </div>
  )
}

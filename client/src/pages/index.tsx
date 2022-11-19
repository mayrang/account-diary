import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="h-screen w-full bg-emerald-300 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">Mayrang</div>
            <div className="mt-14 flex items-center">
                <Link href={"/register"}><a className="p-2 bg-white rounded border">회원가입</a></Link>
                <Link href={"/login"}><a className="py-2 px-4 ml-8 bg-white rounded border">로그인</a></Link>
            </div>
        </div>
   
   </div>
  )
}

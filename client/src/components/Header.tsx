import React, { useEffect, useRef, useState } from "react";
import useScroll from "../utils/useScroll";
import cls from "classnames"
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from "next/router";
import { asyncUserLogout } from "../redux/reducers/userSlice";

const Header = () => {
    const {scrollY} = useScroll();
    const hoverRef = useRef<HTMLDivElement>(null);
    const [mouseover, setMouseover] = useState(false);
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
  


    const handleMouseover = () => {
        setMouseover(true);
    }
    const handleMouseout = () => {
        setMouseover(false);
    }

    useEffect(() => {
        console.log(hoverRef)
        const element = hoverRef.current;
        if(!element) return;
        element.addEventListener("mouseover", handleMouseover);
        element.addEventListener("mouseout", handleMouseout);
        return () => {

            element.removeEventListener("mouseover", handleMouseout);
            element.removeEventListener("mouseout", handleMouseout);
        }
    }, [mouseover, hoverRef])

    return (
        <>
        <div  ref={hoverRef} className={cls(" h-[60px] fixed w-full  ", {" bg-opacity-70 bg-gray-50 backdrop-blur-lg":((scrollY > 10)|| mouseover)}, {"bg-black bg-opacity-0":((scrollY < 10)&&!mouseover)})}>
            <div className="h-full w-full ">
                <div className=" w-[92%] flex h-full mx-auto">  
                    <Link href="/" className=" text-xl font-extrabold flex items-center">텅장일기</Link>
                    <div className="flex flex-1 overflow-y-hidden justify-end max-h-full">
                        <ul className="flex items-center p-0 m-0 list-none">
                            {user ? (
                                <>
                                <li className="flex items-center px-[8px] h-full "><Link href="/account" className="font-semibold py-[3px] px-[2px]">텅장</Link></li>
                                <li className="flex items-center px-[8px] h-full" ><Link href="/diary" className="font-semibold py-[3px] px-[2px]">일기</Link></li>
                                <li className="flex items-center px-[8px] h-full "><div onClick={handleLogout} className="font-semibold text-sm py-[3px] px-[2px]">로그아웃</div></li>
                                </>
                            ):(
                                <>
                                <li className="flex items-center px-[8px] h-full "><Link href="/login" className="font-semibold py-[3px] px-[2px]">로그인</Link></li>
                                <li className="flex items-center px-[8px] h-full" ><Link href="/회원가입" className="font-semibold py-[3px] px-[2px]">회원가입</Link></li>
                                </>
                            )}
                           

                        </ul>

                    </div>
                </div>
            </div>
            
        </div>
        
        
        </>
    );
}

export default Header;
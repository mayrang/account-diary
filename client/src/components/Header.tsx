import React, { useEffect, useRef, useState } from "react";
import useScroll from "../utils/useScroll";
import cls from "classnames"

const Header = () => {
    const {scrollY} = useScroll();
    const hoverRef = useRef<HTMLLIElement>(null);
    const [mouseover, setMouseover] = useState(false);
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
        <div className={cls(" h-[60px] fixed w-full  ", {" bg-opacity-70 bg-gray-50 backdrop-blur-lg":((scrollY > 10)|| mouseover)}, {"bg-black bg-opacity-0":((scrollY < 10)&&!mouseover)})}>
            <div className="h-full w-full ">
                <div className=" w-[92%] flex h-full mx-auto">  
                    <div className=" text-xl font-extrabold flex items-center">텅장일기</div>
                    <div className="flex flex-1 overflow-y-hidden justify-end max-h-full">
                        <ul className="flex items-center p-0 m-0 list-none">
                            <li className="flex items-center px-[8px] h-full " ref={hoverRef}><a className=" py-[3px] px-[2px]">지원하기</a></li>
                            <li className="flex items-center px-[8px] h-full" ><a className=" py-[3px] px-[2px]">문의하기</a></li>
                        </ul>

                    </div>
                </div>
            </div>
            
        </div>
        
        
        </>
    );
}

export default Header;
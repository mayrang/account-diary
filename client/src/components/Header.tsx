import React from "react";
import useScroll from "../utils/useScroll";
import cls from "classnames"

const Header = () => {
    const {scrollY} = useScroll();
    console.log(scrollY)
    return (
        <div className={cls(" h-[60px] fixed w-full", {" bg-opacity-50 bg-black backdrop-blur-lg":scrollY > 10 }, {"bg-black bg-opacity-0":scrollY < 10})}>
            <div className="h-full w-ful ">
                <div className=" w-[92%] flex h-full mx-auto">  
                    <div className="font-semibold flex items-center">IMPORT</div>
                    <div className="flex flex-1 overflow-y-hidden justify-end max-h-full">
                        <ul className="flex items-center p-0 m-0 list-none">
                            <li className="flex items-center px-[8px] h-full"><a className=" py-3 px-2">지원하기</a></li>
                            <li className="flex items-center px-[8px] h-full"><a className=" py-3 px-2">문의하기</a></li>
                            
                            
                            <li></li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
import { useState, useEffect } from "react";

const useScroll = () => {
    const [scrollY, setScrollY] = useState<number>(0);
    const listner = () => {
        setScrollY(window.pageYOffset);
    }
    const delay = 15;

    useEffect(() => {
        window.addEventListener('scroll', listner);
        return () => {
            window.removeEventListener('scroll', listner);
        };
    }, []);
    return {
        scrollY
    }
};

export default useScroll;
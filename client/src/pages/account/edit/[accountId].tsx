import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AccountObject } from "..";
import AccountForm from "../../../components/AccountForm";
import { asyncLoadSingleAccount } from "../../../redux/reducers/accoutSlice";
import { asyncUserLoadMyInfo } from "../../../redux/reducers/userSlice";
import wrapper, { useAppSelector } from "../../../redux/store";

const AccountEdit = () => {
    const router = useRouter();
    const {accountId} = router.query;
    const {user} = useAppSelector((state) => state.user);
    const {singleAccount, loadSingleAccountError} = useAppSelector((state) => state.account);
    useEffect(() => {
        if(!user){
            router.replace("/login");
        }
        
        if(loadSingleAccountError){
            alert(loadSingleAccountError);
            router.back();
        }
    },[user, loadSingleAccountError])
    return (
        <>
        {singleAccount&&(
            <AccountForm singleAccount={singleAccount as AccountObject}/>
        )}
        </>
    
    )
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, params}) => {
    const cookie = req.headers.cookie;
    if(cookie){
        await store.dispatch(asyncUserLoadMyInfo(cookie));
        if(params?.accountId){
            const accountId = params.accountId ;
            if(accountId){
                const data={
                    accountId,
                    cookie
                }
                await store.dispatch(asyncLoadSingleAccount(data));
    
            }
        } 
    }
    

    
    return {
        props: {}
    }
});

export default AccountEdit;


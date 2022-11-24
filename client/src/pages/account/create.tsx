
import AccountForm from "../../components/AccountForm";
import { asyncUserLoadMyInfo } from "../../redux/reducers/userSlice";
import wrapper from "../../redux/store";

const AccountCreate = () => {
    return (
        <AccountForm isEdit={false}/>
    );

};


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {

    const cookie = req.headers.cookie;
    console.log("cookie", typeof(cookie))
    if(cookie){
        await store.dispatch(asyncUserLoadMyInfo(cookie))
    }
    return {
        props: {}
    }

    
})

export default AccountCreate;
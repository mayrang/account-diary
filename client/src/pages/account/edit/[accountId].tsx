import { useRouter } from "next/router";
import React from "react";
import AccountForm from "../../../components/AccountForm";

const AccountEdit = () => {
    const router = useRouter();
    const {accountId} = router.query;
    return (
    <AccountForm />
    )
};

export default AccountEdit;
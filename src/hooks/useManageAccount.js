import { useState } from "react";

function useManageAccount() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleAdminAccount = (payLoad) => {
        console.log(payLoad)
    }
    return {
        loading, error, handleAdminAccount
    }
}

export default useManageAccount;
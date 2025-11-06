import { useState, useEffect } from "react";
import api from "../services/api";

export default function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                setLoading(true);
                const res = await api.get(url, { ...options });
                if (isMounted) setData(res.data.data);
            } catch (err) {
                if (isMounted) setError(err?.response?.data?.message || err.message || "Something went wrong");
            } finally {
                // if (isMounted) setLoading(false);
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return { data, loading, error };
}

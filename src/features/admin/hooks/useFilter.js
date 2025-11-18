import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useFilter() {

    const [selectedCat, setSelectedCat] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const getQueryParam = (paramName, isArray = true) => {
        const params = new URLSearchParams(location.search);
        const value = params.get(paramName);

        if (!value) return isArray ? [] : "";

        if (isArray) {
            return value.split(",").map((v) => v.trim()).filter(Boolean);
        } else {
            return value;
        }
    };
    
    useEffect(() => {
        const selectedOptions = getQueryParam("categories").map(cat => ({ value: cat, label: cat }));
        setSelectedCat(selectedOptions);
        const selectedSearchTerm = getQueryParam("searchTerm", false);
        setSearchTerm(selectedSearchTerm);
    }, [location]);

    const handleSearch = () => {
        const params = new URLSearchParams(location.search);
        if (searchTerm && searchTerm.trim() !== "") {
            params.set("searchTerm", searchTerm.trim());
        } else {
            params.delete("searchTerm");
        }
        navigate(`/admin/dashboard?${params.toString()}`);
    };

    const handleCategoryChange = (selectedOptions) => {
        const values = selectedOptions?.map(o => o.value) || [];
        const params = new URLSearchParams(location.search);

        if (values.length > 0) {
            params.set("categories", values.join(","));
        } else {
            params.delete("categories");
        }

        navigate(`/admin/dashboard?${params.toString()}`);
    };


    return {
        selectedCat, setSelectedCat, handleCategoryChange,
        searchTerm, setSearchTerm, handleSearch
    }

}
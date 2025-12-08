// eslint-disable-next-line no-unused-vars
import { components } from "react-select";

export const CustomOptions = (props) => {
    return (
        <components.Option {...props}>
            <div className="flex justify-between">
                <div className="flex-1">
                    <span>{props.data.label}</span>
                </div>
                <span
                    className="text-xl text-red-500 font-extrabold cursor-pointer select-none"
                    onClick={(e) => {
                        e.stopPropagation();  
                        e.preventDefault();
                        props.selectProps.handleDeleteCategory(
                            props.data.value,
                            props.selectProps.setCategories
                        );
                    }}
                >
                    ×
                </span>

            </div>
        </components.Option>
    );
};

// eslint-disable-next-line no-unused-vars
import { components } from "react-select";

export const CustomOptions = (props) => {
    return (
        <components.Option {...props}>
            <div className="flex justify-between">
                <div className="flex-1">
                    <span>{props.data.label}</span>
                </div>
                <button
                    className="ml-1 px-1 text-xs leading-none text-white bg-red-500 rounded cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        props.selectProps.handleDeleteCategory(props.data.value,props.selectProps.setCategories);
                    }}
                >
                    delete
                </button>

            </div>
        </components.Option>
    );
};

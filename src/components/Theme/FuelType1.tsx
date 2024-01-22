import React from "react";
import { DropDownProps } from "../../pages/types/DropDown.types";

const FuelType1: React.FC<DropDownProps> = ({ setValue, value }) => {
    return (
        <div className=" w-[47%] ">
            <select
                value={value}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setValue(e.target.value)
                }
                name="languages"
                id="lang"
                className="ps-3 h-[45px] rounded-md p-2 px-1 w-[100%]"
            >
                <option value="none">None</option>
                <option value="1">001-Octane Ron(92)</option>
                <option value="2">002-Octane Ron(95)</option>
                <option value="4">004-Diesel</option>
                <option value="5">005-Premium Diesel</option>
            </select>
        </div>
    );
};

export default FuelType1;
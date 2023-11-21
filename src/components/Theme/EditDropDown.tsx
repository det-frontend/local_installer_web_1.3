import React from "react";
import { DropDownProps } from "../../pages/types/DropDown.types";

const EditDropDown: React.FC<DropDownProps> = ({ setValue, value }) => {
  console.log(value);
  return (
    <div className="w-[200px]">
      
      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setValue(e.target.value)
        }
        name="languages"
        id="lang"
        className=" h-[45px] rounded-md p-2 px-1 w-[100%]"
      >
        <option value="None">None</option>
        <option value="1">Dispenser 1</option>
        <option value="2">Dispenser 2</option>
        <option value="3">Dispenser 3</option>
        <option value="4">Dispenser 4</option>
        <option value="5">Dispenser 5</option>
        <option value="6">Dispenser 6</option>
        <option value="7">Dispenser 7</option>
      </select>
    </div>
  );
};

export default EditDropDown;

import React from "react";
import { DropDownProps } from "../../pages/types/DropDown.types";

export const EditBrandType: React.FC<DropDownProps> = ({ setValue, value }) => {
  return (
    <div className=" w-[200px]">
      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setValue(e.target.value)
        }
        name="languages"
        id="lang"
        className=" h-[45px] rounded-md p-2 px-1 w-[100%]"
      >
        <option value="none">None</option>
        <option value="tatsuno">Tasuno</option>
        <option value="prime">Prime</option>
      </select>
    </div>
  );
};

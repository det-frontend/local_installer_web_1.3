import React, { useEffect, useState } from "react";
import { PermitsProps } from "../../pages/types/Permit.types";
import UseGet from "../../services/hooks/UseGet";
import useTokenStorage from "../../utils/useDecrypt";

const GenderDrop: React.FC<PermitsProps> = ({ value, setValue }) => {
  const data = [
    { name: "Male", id: "1" },
    { name: "Female", id: "2" },
  ];
  return (
    <div className="w-[200px]">
      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setValue(e.target.value)
        }
        name="languages"
        id="lang"
        className=" h-[45px] rounded-md p-2 py-0 ps-3 px-1 w-[100%]"
      >
        <option value="None">None</option>
        {data?.map((e: any, index: any) => (
          <option value={e._id}>{e.name}</option>
        ))}
      </select>
    </div>
  );
};

export default GenderDrop;

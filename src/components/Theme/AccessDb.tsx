/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useTokenStorage from "../../utils/useDecrypt";
import UseCloudGet from "../../services/hooks/UseCloudGet";
import { DropDownProps } from "../../pages/types/DropDown.types";

export const AccessDb: React.FC<DropDownProps> = ({ setValue, value }) => {
  const [{ data_gc, loading_gc, error_gc }, getToCloud] = UseCloudGet();
  const { loadToken } = useTokenStorage();
  const [okData, setOkData] = useState([]);

  useEffect(() => {
    const token = loadToken();
    if (token) {
      getToCloud(`collection`, token);
    }
  }, []);

  useEffect(() => {
    console.log(data_gc, error_gc);
    if (data_gc.result) {
      setOkData(data_gc.result);
    }
  }, [data_gc, loading_gc, error_gc]);

  return (
    <div className=" w-[200px] ">
      <label className=" text-slate-200 ">Access Db</label>
      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setValue(e.target.value)
        }
        name="languages"
        id="lang"
        className=" mt-4 h-[45px] rounded-md p-2 px-1 w-[100%]"
      >
        <option value="none">None</option>
        {okData.map((e: any, index) => (
          <option value={e.collectionName}>{e.collectionName}</option>
        ))}
      </select>
    </div>
  );
};

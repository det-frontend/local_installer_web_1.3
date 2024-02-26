import React, { useEffect, useState } from "react";
import { PermitsProps } from "../../pages/types/Permit.types";
import UseGet from "../../services/hooks/UseGet";
import useTokenStorage from "../../utils/useDecrypt";

const RolesDrop1: React.FC<PermitsProps> = ({ value, setValue }) => {
  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const { loadToken } = useTokenStorage();
  const [okData, setOkData] = useState([]);
  // console.log(data_g);
  useEffect(() => {
    const token = loadToken();
    if (token) {
      fetchItGet("/role", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data_g) {
      setOkData(data_g);
    }
    //   }, []);
  }, [data_g, loading_g, error_g]);

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
        {okData?.map((e: any, index: any) => (
          <option value={e.name}>{e.name}</option>
        ))}
      </select>
    </div>
  );
};

export default RolesDrop1;

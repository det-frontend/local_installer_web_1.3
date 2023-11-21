import React, { useEffect, useState } from "react";
import DropDown from "../Theme/DropDown";
import EditDropDown from "../Theme/EditDropDown";
import EditNozzleDropdown from "../Theme/EditNozzleDrop";
import EditFuelType from "../Theme/EditFuelType";
import { EditBrandType } from "../Theme/EditBrandType";
import { useNavigate } from "react-router-dom";
import useTokenStorage from "../../utils/useDecrypt";
import UsePatch from "../../services/hooks/UsePatch";
import { log } from "console";
import UseGet from "../../services/hooks/UseGet";

function DevicesTable({ data, setOkData }: { data: any; setOkData: any }) {
  console.log(data);
  const [{ data_pch, loading_pch, error_pch }, patchIt] = UsePatch();
  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const { loadToken } = useTokenStorage();

  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
    fetchItGet("device", token);
  }, []);
  // console.log();

  const [isEdit, setIsEdit] = useState<any>(
    data.map(() => ({
      isEdit: false,
      dispenserNo: "none",
      fuelType: "none",
      nozzleNo: "none",
      brandType: "none",
    }))
  );
  const [defalutValue, setDefaultValue] = useState<any>({});

  const [dispenserNo, setDispenserNo] = useState<any>("none");
  const [token, setToken] = useState<string>("none");

  const [fuelType, setFuelType] = useState<string>("none");
  const [nozzleNo, setNozzleNo] = useState<string>("none");
  const [brandType, setBrandType] = useState<string>("none");
  // console.log(defalutValue.dis);

  const editHandler = (index: number) => {
    const newData = [...data];

    const updatedIsEdit = newData.map((editState: any, idx: number) => ({
      ...editState,
      isEdit: idx === index,
    }));
    setIsEdit(updatedIsEdit);

    const rowData = data[index];

    setDispenserNo(rowData.dep_no);
    setFuelType(rowData.fuel_type);
    setBrandType(rowData.dep_type);
    setNozzleNo(rowData.nozzle_no);
  };
  const cancelHandler = (index: number) => {
    const cancelData = [...data];
    cancelData[index].isEdit = false;
    setIsEdit(cancelData);
  };

  const handleDone = (id: any, index: any) => {
    if (
      nozzleNo !== "none" ||
      dispenserNo !== "none" ||
      fuelType !== "none" ||
      brandType !== "none"
    ) {
      //  setValid(false);
      const user = {
        dep_no: dispenserNo,
        nozzle_no: nozzleNo,
        fuel_type: fuelType,
        dep_type: brandType,
      };
      console.log(user);
      patchIt(`device?_id=${id}`, user, token);
    }
    const cancelData = [...data];
    cancelData[index].isEdit = false;
    setIsEdit(cancelData);
  };

  useEffect(() => {
    fetchItGet("device", token);
    if (data_pch?.con) {
      console.log(data_g);
    }
  }, [data_pch, loading_pch, error_pch]);

  useEffect(() => {
    console.log(data_g);

    if (data_g) {
      setOkData(data_g);
    }
  }, [data_g, loading_g, error_g]);

  return (
    <table className=" w-[100%] text-white mt-[6%]">
      <tr>
        <th className="w-[20%]">No</th>
        <th className="w-[20%]">Dispenser No</th>
        <th className="w-[20%]">Nozzle No</th>
        <th className="w-[20%]">Fuel Type</th>
        <th className="w-[20%]">Brand Type</th>
        <th className="w-[20%]">Action</th>
      </tr>
      {data.map((e: any, index: any) => (
        // console.log(e._id),

        <tr key={`kdkd_${index}`}>
          <th className="w-[20%]">{index}</th>
          <th className="w-[20%]">
            {isEdit[index]?.isEdit ? (
              <div className="text-black">
                <EditDropDown value={dispenserNo} setValue={setDispenserNo} />
              </div>
            ) : (
              e.dep_no
            )}
          </th>
          <th className="w-[20%]">
            {isEdit[index]?.isEdit ? (
              <div className="text-black">
                <EditNozzleDropdown value={nozzleNo} setValue={setNozzleNo} />
              </div>
            ) : (
              e.nozzle_no
            )}
          </th>
          <th className="w-[20%]">
            {isEdit[index]?.isEdit ? (
              <div className="text-black">
                <EditFuelType value={fuelType} setValue={setFuelType} />
              </div>
            ) : (
              e.fuel_type
            )}
          </th>
          <th className="w-[20%]">
            {isEdit[index]?.isEdit ? (
              <div className="text-black">
                <EditBrandType value={brandType} setValue={setBrandType} />
              </div>
            ) : (
              e.dep_type
            )}
          </th>
          <th className="w-[20%]">
            {isEdit[index]?.isEdit ? (
              <div className="flex gap-2">
                <button
                  className="bg-green-500 px-4 py-2 font-semibold text-black rounded-md"
                  onClick={() => handleDone(e?._id, index)}
                >
                  Done
                </button>
                <button
                  className="bg-red-500 px-4 py-2 font-semibold text-black rounded-md"
                  onClick={() => cancelHandler(index)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="bg-red-500 px-4 py-2 font-semibold text-black rounded-md"
                onClick={() => editHandler(index)}
              >
                Edit
              </button>
            )}
          </th>
        </tr>
      ))}
    </table>
  );
}

export default DevicesTable;

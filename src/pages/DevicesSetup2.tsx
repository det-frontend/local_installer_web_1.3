import React, { useEffect, useState } from "react";
import HeadCap from "../components/HeadCap";
import DropDown1 from "../components/Theme/DropDown1";
import Button from "../components/Theme/Button";
import NozzleDrop1 from "../components/Theme/NozzleDrop1";
import FuelType1 from "../components/Theme/FuelType1";
import DevicesTable from "../components/Tables/Devices.tables";
import useTokenStorage from "../utils/useDecrypt";
import UseGet from "../services/hooks/UseGet";
import Loading from "../components/Theme/Loading";
import { FcInfo } from "react-icons/fc";
import UsePost from "../services/hooks/UsePost";
import UseDelete from "../services/hooks/UseDelete";
import { BrandType } from "../components/Theme/BrandType";
// import mqtt from "mqtt"; // import namespace "mqtt"
// let client = mqtt.connect("ws://192.168.0.100:9001");
import { client, connect } from "../services/mqtt";
import TotalNozzleDrop from "../components/Theme/TotalNozzleDrop";
import Swal from "sweetalert2"; // import {publisher} from '../services/mqtt'

function DevicesSetup2() {
  // Swal.fire({
  //     title: 'Error!',
  //     text: 'Do you want to continue',
  //     icon: 'error',
  //     confirmButtonText: 'Cool'
  // })

  const alert = () => {
    return Swal.fire({
      title: "Set up Successfully !",
      // text: "That thing is still around?",
      icon: "success",
    });
  };

  client.on("connect", connect);

  const [token, setToken] = useState<string>("none");
  const [dispenserNo, setDispenserNo] = useState<string>("0");
  const [totalNoz, setTotalNoz] = useState<string>("0");
  const [pswd, setPswd] = useState<string>("");
  const [key, setKey] = useState<string>("");
  //
  const [valid, setValid] = useState<boolean>(false);
  const [okData, setOkData] = useState([]);
  // const [brandType, setBrandType] = useState<string>('none');
  //
  const [nozzleNo1, setNozzleNo1] = useState<string>("0");
  const [fuelType1, setFuelType1] = useState<string>("0");
  const [nozzleNo2, setNozzleNo2] = useState<string>("0");
  const [fuelType2, setFuelType2] = useState<string>("0");
  const [nozzleNo3, setNozzleNo3] = useState<string>("0");
  const [fuelType3, setFuelType3] = useState<string>("0");
  const [nozzleNo4, setNozzleNo4] = useState<string>("0");
  const [fuelType4, setFuelType4] = useState<string>("0");
  const [nozzleNo5, setNozzleNo5] = useState<string>("0");
  const [fuelType5, setFuelType5] = useState<string>("0");
  const [nozzleNo6, setNozzleNo6] = useState<string>("0");
  const [fuelType6, setFuelType6] = useState<string>("0");
  const [nozzleNo7, setNozzleNo7] = useState<string>("0");
  const [fuelType7, setFuelType7] = useState<string>("0");
  const [nozzleNo8, setNozzleNo8] = useState<string>("0");
  const [fuelType8, setFuelType8] = useState<string>("0");

  const { loadToken } = useTokenStorage();
  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const [{ data_d, loading_d, error_d }, deleteIt] = UseDelete();
  const [{ data, loading, error }, fetchIt] = UsePost();

  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
    fetchItGet("device", token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(data_g,error_g)
    if (data_g) {
      setOkData(data_g);
    }
  }, [data_g, loading_g, error_g]);

  const handleAdd = (pswd: string, key: string) => {
    const fuel = {
      fuelid1: parseInt(fuelType1),
      fuelid2: parseInt(fuelType2),
      fuelid3: parseInt(fuelType3),
      fuelid4: parseInt(fuelType4),
      fuelid5: parseInt(fuelType5),
      fuelid6: parseInt(fuelType6),
      fuelid7: parseInt(fuelType7),
      fuelid8: parseInt(fuelType8),
    };

    const pump = {
      devicenum: parseInt(dispenserNo),
      nozzlenum: parseInt(totalNoz),
      pumpid1: parseInt(nozzleNo1),
      pumpid2: parseInt(nozzleNo2),
      pumpid3: parseInt(nozzleNo3),
      pumpid4: parseInt(nozzleNo4),
      pumpid5: parseInt(nozzleNo5),
      pumpid6: parseInt(nozzleNo6),
      pumpid7: parseInt(nozzleNo7),
      pumpid8: parseInt(nozzleNo8),
    };
    client.publish(
      `detpos/local_server/initial1/${pswd}/${key}`,
      JSON.stringify(pump)
    );
    client.publish(
      `detpos/local_server/initial2/${pswd}/${key}`,
      JSON.stringify(fuel)
    );
  };

  useEffect(() => {
    if (data.con === true) {
      setDispenserNo("none");
      setNozzleNo1("none");
      setFuelType1("none");
      // setBrandType('none');
      fetchItGet("device", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);
  console.log(data);
  console.log(dispenserNo);

  useEffect(() => {
    if (data_d?.con) {
      setOkData([]);
    }
  }, [data_d, loading_d, error_d]);

  const handleReset = () => {
    deleteIt("device", token);
  };

  const arr = [
    <div className="w-[45%] ">
      <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
        <span className="font-semibold text-green-400 mr-1">Noz - (1)</span>{" "}
        PumpId & FuelType
      </div>
      <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
        {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
        <NozzleDrop1 value={nozzleNo1} setValue={setNozzleNo1} />
        <FuelType1 value={fuelType1} setValue={setFuelType1} />
        {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
      </div>
    </div>,
    <div className="w-[45%] ">
      <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
        <span className="font-semibold text-green-400 mr-1">Noz - (2)</span>{" "}
        PumpId & FuelType
      </div>
      <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
        {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
        <NozzleDrop1 value={nozzleNo2} setValue={setNozzleNo2} />
        <FuelType1 value={fuelType2} setValue={setFuelType2} />
        {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
      </div>
    </div>,
    <div className="w-[45%] ">
      <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
        <span className="font-semibold text-green-400 mr-1">Noz - (3)</span>{" "}
        PumpId & FuelType
      </div>
      <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
        {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
        <NozzleDrop1 value={nozzleNo3} setValue={setNozzleNo3} />
        <FuelType1 value={fuelType3} setValue={setFuelType3} />
        {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
      </div>
    </div>,
    <div className="w-[45%] ">
      <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
        <span className="font-semibold text-green-400 mr-1">Noz - (4)</span>{" "}
        PumpId & FuelType
      </div>
      <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
        {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
        <NozzleDrop1 value={nozzleNo4} setValue={setNozzleNo4} />
        <FuelType1 value={fuelType4} setValue={setFuelType4} />
        {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
      </div>
    </div>,
    <div className="w-[45%] ">
      <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
        <span className="font-semibold text-green-400 mr-1">Noz - (5)</span>{" "}
        PumpId & FuelType
      </div>
      <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
        {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
        <NozzleDrop1 value={nozzleNo5} setValue={setNozzleNo5} />
        <FuelType1 value={fuelType5} setValue={setFuelType5} />
        {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
      </div>
    </div>,
    <div className="w-[45%] ">
      <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
        <span className="font-semibold text-green-400 mr-1">Noz - (6)</span>{" "}
        PumpId & FuelType
      </div>
      <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
        {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
        <NozzleDrop1 value={nozzleNo6} setValue={setNozzleNo6} />
        <FuelType1 value={fuelType6} setValue={setFuelType6} />
        {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
      </div>
    </div>,
    <div className="w-[45%] ">
      <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
        <span className="font-semibold text-green-400 mr-1">Noz - (7)</span>{" "}
        PumpId & FuelType
      </div>
      <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
        {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
        <NozzleDrop1 value={nozzleNo7} setValue={setNozzleNo7} />
        <FuelType1 value={fuelType7} setValue={setFuelType7} />
        {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
      </div>
    </div>,
    <div className="w-[45%] ">
      <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
        <span className="font-semibold text-green-400 mr-1">Noz - (8)</span>{" "}
        PumpId & FuelType
      </div>
      <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
        {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
        <NozzleDrop1 value={nozzleNo8} setValue={setNozzleNo8} />
        <FuelType1 value={fuelType8} setValue={setFuelType8} />
        {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
      </div>
    </div>,
  ];
  console.log("jjjjjj");
  console.log(pswd, key);
  console.log("jjjjjj");

  const setupHandler = () => {
    alert();
    setKey("");
    setPswd("");
    setDispenserNo("0");
    setTotalNoz("0");
    setNozzleNo1("0");
    setFuelType1("0");
    setNozzleNo2("0");
    setFuelType2("0");
    setNozzleNo3("0");
    setFuelType3("0");
    setNozzleNo4("0");
    setFuelType4("0");
    setNozzleNo5("0");
    setFuelType5("0");
    setNozzleNo6("0");
    setFuelType6("0");
    setNozzleNo7("0");
    setFuelType7("0");
    setNozzleNo8("0");
    setFuelType8("0");

    handleAdd(pswd, key);
  };

  return (
    <>
      {loading && <Loading />}
      <div className=" bg-primary-color min-h-[100svh] pb-[100px]">
        <HeadCap title="Devices" />
        <div className="3xl:container mt-4 w-[90%] md:w-[70%] mx-auto ">
          <div className=" flex p-5 justify-between">
            <div className="w-[45%] ">
              <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
                Setup Key
              </div>
              <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
                <input
                  type="password"
                  value={pswd}
                  onChange={(e) => setPswd(e.target.value)}
                  placeholder="Password"
                  className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "
                />
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Product Key"
                  className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "
                />
              </div>
            </div>
            <div className="w-[45%] ">
              <div className="px-4 rounded-t-lg bg-gray-500 inline text-gray-200 py-2">
                Dispenser and Total of Nozzle
              </div>
              <div className="bg-gray-500 rounded-b-lg rounded-r-lg p-4 flex justify-around">
                {/*<input type="password" placeholder="Password" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
                <DropDown1 value={dispenserNo} setValue={setDispenserNo} />
                <TotalNozzleDrop value={totalNoz} setValue={setTotalNoz} />
                {/*<input type="text" placeholder="Product Key" className="ps-3 h-[45px] w-[47%] bg-gray-100 rounded-lg "/>*/}
              </div>
            </div>
          </div>
          {!(totalNoz == "0") && (
            <div className=" flex p-5 border mt-5 border-green-600 rounded-lg py-7 flex-wrap gap-10 justify-between">
              {arr.slice(0, parseInt(totalNoz)).map((e) => e)}
            </div>
          )}
          <Button
            onClick={setupHandler}
            title="Set up"
            color="white"
            width="w-[100px] ms-auto"
            height="h-[45px]"
            padding="p-4 px-5"
          />
        </div>
      </div>
    </>
  );
}

export default DevicesSetup2;

import React, { useState } from "react";
import HeadCap from "../components/HeadCap";
import { NavLink, Outlet } from "react-router-dom";

const CardManage = () => {
  let params = window.location.pathname;
  console.log(params);
  const [at, setAt] = useState(true);
  return (
    <div className=" bg-primary-color min-h-[100svh]">
      <HeadCap title="Role" />
      <div className="container mx-auto p-5">
        <div className="flex mx-auto w-[70%] mt-4 flex-col bg-blue-30 ">
          <div className="mb-[-5px] flex  ">
            <NavLink
              onClick={() => setAt(false)}
              className={`pb-4 ${
                at && "active"
              }  rounded-t-lg text-slate-300 text-[1.3rem] px-5 py-3 items-center justify-start`}
              to=" "
            >
              Member
            </NavLink>
            <NavLink
              onClick={() => setAt(false)}
              className=" rounded-t-lg pb-4 text-slate-300 text-[1.3rem] px-5 py-3 items-center justify-start"
              to="customer"
            >
              Customer
            </NavLink>
            {/* <NavLink to="customer">customer</NavLink> */}
          </div>
          <div className="w-full mx-auto flex justify-center bg-slate-700 p-3 rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardManage;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Devices from "./Devices";
import Tank from "./Tank";
import Totalizer from "./Totalizer";
import Manager from "./Manager";
import Cashier from "./Cashier";
import Role from "./Role";
import DevicesSetup2 from "./DevicesSetup2";
import CardManage from "./CardManage";
import Member from "../components/Member";
import Customer from "../components/Customer";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/setup2" element={<DevicesSetup2 />} />
      <Route path="/tank" element={<Tank />} />
      <Route path="/totalizer" element={<Totalizer />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/cashier" element={<Cashier />} />
      <Route path="/role" element={<Role />} />
      <Route path="/card" element={<CardManage />}>
        <Route index element={<Member />} />
        <Route path="customer" element={<Customer />} />
      </Route>
    </Routes>
  );
}

export default Router;

import React from "react";
import { TitleOneProps } from "../../pages/types/TitleOne.types";

const TitleOne: React.FC<TitleOneProps> = ({ title }) => {
  return <div className=" uppercase  font-light text-[3vh]">{title}</div>;
};

export default TitleOne;

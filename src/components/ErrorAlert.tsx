import React from "react";
import Swal from "sweetalert2";

const ErrorAlert = (title: string) => {
  return Swal.fire({
    title: title,
    icon: "error",
    buttonsStyling: false,
    color: "#fafafa",
    // width: "25em",
    background: "#334155",
    customClass: {
      title: "text-white",
      confirmButton:
        "bg-primary text-secondary rounded-lg border-2 border-gray-300 hover:text-[#334155] duration-150 hover:bg-gray-300 w-[300px] font-mono py-2",
    },
  });
};

export default ErrorAlert;

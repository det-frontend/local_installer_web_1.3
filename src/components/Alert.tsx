import React from "react";
import Swal from "sweetalert2";

const Alert = (title: string, fun: any) => {
  const handleSaleOpen = () => {
    Swal.fire({
      title: title,
      icon: "warning",
      iconColor: "#FFFF00",
      buttonsStyling: false,
      width: "30em",
      color: "#fafafa",
      heightAuto: false,
      background: "#334155",
      focusConfirm: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      customClass: {
        confirmButton:
          "bg-transparent text-primary rounded-lg border-2 border-primary w-[35%] font-mono py-2 border-gray-300 hover:text-[#334155] duration-150 hover:bg-gray-300",
        cancelButton:
          "bg-primary text-secondary rounded-lg border-2 border-gray-300 hover:text-[#334155] duration-150 hover:bg-gray-300 w-[35%] font-mono py-2",
        actions: " !mt-5 !w-[100%] flex justify-center gap-9",
        icon: "!p-0",
        title: "!mt-0 !pt-0",
      },
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // const res = saleClose(token);

        Swal.fire({
          title: "Created Successfully !",
          icon: "success",
          buttonsStyling: false,
          color: "#fafafa",
          width: "25em",
          background: "#334155",
          customClass: {
            title: "text-white",
            confirmButton:
              "bg-primary text-secondary rounded-lg border-2 border-gray-300 hover:text-[#334155] duration-150 hover:bg-gray-300 w-[300px] font-mono py-2",
          },
        });
        // fun();
        console.log("kkkkk");
        // console.log(fun);
        fun();
        console.log("kkkkk");
        // refetch();
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };
  return handleSaleOpen;
};

export default Alert;

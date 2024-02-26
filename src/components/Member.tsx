import React, { useEffect, useState } from "react";
import RoleDrop1 from "./Theme/RoleDrop1";
import GenderDrop from "./Theme/GenderDrop";
import { Formik } from "formik";
import * as yup from "yup";
import UsePost from "../services/hooks/UsePost";
import Alert from "./Alert";
import ErrorAlert from "./ErrorAlert";
import { localInstance } from "../services/axios";

const Member = () => {
  const [{ data, loading, error }, fetchIt] = UsePost();

  const validationSchema = yup.object().shape({
    cardid: yup.string().required("required"),
    name: yup.string().required("required"),
    email: yup.string().required(" required"),
    phone: yup.string().required(" required"),
    address: yup.string().required("required"),
    salary: yup.number().required("required"),
    // role: yup.string().required("required"),
    dob: yup.string().required(" required"),
    // gender: yup.string().required("required"),
    joiningDate: yup.string().required(" required"),
    password: yup.string().required("required").min(6),
  });
  const [dropData, setDropData] = useState("None");
  const [gender, setGender] = useState("None");
  const [errVisi, setErrVisi] = useState(false);
  console.log(dropData);
  console.log(gender);

  let roleCon = dropData === "None";
  let genCon = gender === "None";
  // console.log(values);

  const submitHandler = async (values: any, { resetForm }: any) => {
    setErrVisi(true);
    const showAlert = Alert("Is all of the data correct?", async () => {
      const data = {
        nfc_id: values.cardid,
        address: values.address,
        dob: values.dob,
        email: values.email,
        gender: gender,
        joiningDate: values.joiningDate,
        name: values.name,
        password: values.password,
        phone: values.phone,
        role: dropData,
        salary: parseInt(values.salary),
      };
      const result = await localInstance.post("nfc-card/member", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      resetForm();
      setGender("None");
      setDropData("None");
      setErrVisi(false);
    });

    const fetch = await localInstance.get(`nfc-card/member/${values.cardid}`);
    const id = fetch?.data?.result?.nfc_id;
    console.log(id);

    if (!roleCon && !genCon) {
      if (id !== values.cardid) {
        showAlert();
      } else {
        ErrorAlert("ID has already been taken");
      }
    }
  };

  return (
    <div className="w-full pb-5 pt-2">
      <div className="text-slate-300 mt-3 font-mono mx-auto text-[2rem] flex justify-center">
        Member Card Setup
      </div>
      <Formik
        initialValues={{
          cardid: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          salary: "",
          // role: "",
          dob: "",
          // gender: "",
          joiningDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-around gap-y-7 flex-wrap px-6 py-4 w-full">
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">Card ID</div>
                <input
                  type="text"
                  value={values.cardid}
                  onBlur={handleBlur("cardid")}
                  onChange={handleChange("cardid")}
                  placeholder="Card ID"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.cardid && touched.cardid && (
                  <div className="text-red-500 pl-3">{errors.cardid}</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">
                  Member's Name
                </div>
                <input
                  type="text"
                  value={values.name}
                  onBlur={handleBlur("name")}
                  onChange={handleChange("name")}
                  placeholder="Name"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 pl-3">{errors.name}</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">Email</div>
                <input
                  type="email"
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChange={handleChange("email")}
                  placeholder="Email"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 pl-3">{errors.email}</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">
                  Password
                </div>
                <input
                  type="text"
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                  placeholder="Password"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 pl-3">{errors.password}</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">Address</div>
                <input
                  type="text"
                  value={values.address}
                  onBlur={handleBlur("address")}
                  onChange={handleChange("address")}
                  placeholder="Address"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 pl-3">{errors.address}</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">Phone</div>
                <input
                  type="text"
                  value={values.phone}
                  onBlur={handleBlur("phone")}
                  onChange={handleChange("phone")}
                  placeholder="Phone"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.phone && touched.phone && (
                  <div className="text-red-500 pl-3">{errors.phone}</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">Salary</div>
                <input
                  type="text"
                  value={values.salary}
                  onBlur={handleBlur("salary")}
                  onChange={handleChange("salary")}
                  placeholder="Salary"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.salary && touched.salary && (
                  <div className="text-red-500 pl-3">{errors.salary}</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">Role</div>
                {/* <input
            type="text"
            // value={pswd}
            // onChange={(e) => setPswd(e.target.value)}
            placeholder="Name"
            className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
          /> */}
                <RoleDrop1 value={dropData} setValue={setDropData} />
                {errVisi && roleCon && (
                  <div className="text-red-500 pl-3">required</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">Gender</div>
                <GenderDrop value={gender} setValue={setGender} />
                {errVisi && genCon && (
                  <div className="text-red-500 pl-3">required</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">
                  Joining Date
                </div>
                <input
                  type="text"
                  value={values.joiningDate}
                  onBlur={handleBlur("joiningDate")}
                  onChange={handleChange("joiningDate")}
                  placeholder="Joining date"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.joiningDate && touched.joiningDate && (
                  <div className="text-red-500 pl-3">{errors.joiningDate}</div>
                )}
              </div>
              <div className=" w-[210px] flex flex-col gap-1">
                <div className="text-slate-300 text-[1.1rem] ms-2">
                  Date of Birth
                </div>
                <input
                  type="text"
                  value={values.dob}
                  onBlur={handleBlur("dob")}
                  onChange={handleChange("dob")}
                  placeholder="Date of Birth"
                  className="ps-3 h-[45px] w-full bg-gray-200 rounded-lg "
                />
                {errors.dob && touched.dob && (
                  <div className="text-red-500 pl-3">{errors.dob}</div>
                )}
              </div>
              <div className=" w-[210px] items-center justify-center flex flex-col gap-1">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 duration-150 active:bg-green-600  text-[1.2rem] w-full mt-auto py-3 rounded-md"
                >
                  Create Card
                </button>

                {errors.dob && touched.dob && (
                  <div className="text-red-500 h-5"> </div>
                )}
              </div>
            </div>
          </form>
        )}
      </Formik>
      {/* <button
        // onClick={Alert("Is all of the data correct?", "hello")}
        onClick={() => ErrorAlert("ID has already been taken")}
        className="bg-green-600 hover:bg-green-700 duration-150 active:bg-green-600  text-[1.2rem] w-full mt-auto py-3 rounded-md"
      >
        alert
      </button> */}
    </div>
  );
};

export default Member;

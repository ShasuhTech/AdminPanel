import { useRouter } from "next/router";
import React from "react";

const data = [
    {
      name: "Add Staff",
      value: "add-staff",
    },
  {
    name: "Account Type",
    value: "account-type",
  },
  {
    name: "Staff Category",
    value: "staff-category",
  },
  {
    name: "Staff Department",
    value: "staff-department",
  },
  {
    name: "Staff Designation",
    value: "staff-designation",
  },
  {
    name: "Staff Qualification",
    value: "staff-educational-qualification",
  },
  {
    name: "Nature Of Appointment",
    value: "staff-nature-of-appointment",
  },
  {
    name: "Staff Occupation",
    value: "staff-occupation",
  },
  {
    name: "Subject",
    value: "staff-subject",
  },
  
];

const Configs = () => {
const router = useRouter()
  const cardClick =(path)=>{
    router.push(`/staff/${path}`)
  }

  return (
    <div className="flex items-center  flex-wrap gap-4">
      {data.map((item, ind) => {
        return (
          <div key={ind} onClick={()=>cardClick(item?.value)} className="border h-[120px] hover:bg-black justify-center items-center flex lg:w-[24%] w-[100%] shadow-lg bg-gray-700 cursor-pointer p-5 rounded-[15px]">
            <span  className="text-white text-[20px]">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Configs;

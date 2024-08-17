import { useRouter } from "next/router";
import React from "react";

const data = [
  {
    name: "Academic Session",
    value: "create-academic-session",
  },
  {
    name: "Activity",
    value: "create-activity",
  },
  {
    name: "Blood Group",
    value: "create-blood-group",
  },
  {
    name: "Board",
    value: "create-board",
  },
  {
    name: "Boarding Category",
    value: "create-boarding-category",
  },
  {
    name: "Class",
    value: "create-class",
  },
  {
    name: "Country",
    value: "create-country",
  },
  {
    name: "Designation",
    value: "create-designation",
  },
  {
    name: "Document",
    value: "create-document",
  },
  {
    name: "Gender",
    value: "create-gender",
  },
  {
    name: "House",
    value: "create-house",
  },
  {
    name: "Locality",
    value: "create-locality",
  },
  {
    name: "Marital Status",
    value: "create-marital-status",
  },
  {
    name: "Mother Tongue",
    value: "create-mother-tongue",
  },
  {
    name: "Nationality",
    value: "create-nationality",
  },
  {
    name: "Occupation",
    value: "create-occupation",
  },
  {
    name: "Qualification",
    value: "create-qualification",
  },
  {
    name: "Religion",
    value: "create-religion",
  },
  {
    name: "Section",
    value: "create-section",
  },
  {
    name: "Social Category",
    value: "create-social-category",
  },
];

const Configs = () => {
const router = useRouter()
  const cardClick =(path)=>{
    router.push(`/master/${path}`)
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

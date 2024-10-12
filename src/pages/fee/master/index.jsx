import { useRouter } from "next/router";
import React from "react";

const data = [
    {
      name: "Fee Account",
      value: "fee-account",
    },
  {
    name: "Fee Stream",
    value: "fee-stream",
  },
  {
    name: "Fee Group",
    value: "fee-group",
  },
  {
    name: "Fee Group Master",
    value: "fee-group-master",
  },
  {
    name: "Fee Installment",
    value: "create-installment",
  },
  {
    name: "Fee Head Master",
    value: "fee-head-master",
  },
  {
    name: "Fee Structure",
    value: "fee-structure",
  },
  {
    name: "Concession Type",
    value: "concession-type",
  },
  {
    name: "Bank",
    value: "bank",
  },
  {
    name: "Fee Yearly Setting",
    value: "fee-yearly-setting",
  },
  {
    name: "Fee Fine Setting",
    value: "fee-fine-setting",
  },
  {
    name: "Petty Head",
    value: "petty-head",
  },
  {
    name: "Fee Transfer to Next Year",
    value: "fee-transfer-nyear",
  },
  {
    name: "Fee Activity Master",
    value: "fee-activity",
  },
  {
    name: "Fee Concession Setting",
    value: "fee-concession-setting",
  },
  {
    name: "Fee Collection",
    value: "fee-collection",
  },
  {
    name: "Fee Collection Bulk",
    value: "fee-collection-bulk",
  },
  {
    name: "Fee Concession",
    value: "fee-concession",
  },
  {
    name: "Fee Fixed Amount",
    value: "fee-fixed-amount",
  },
  {
    name: "Cheque Bounce",
    value: "cheque-bounce-details",
  },
  {
    name: "Fee petty Collection",
    value: "fee-petty-collection",
  },
  {
    name: "Fee Activity Assigner",
    value: "fee-activity-assigner",
  },
  {
    name: "Fee Security Deposit",
    value: "fee-security-deposit",
  },
  {
    name: "Bank Collection Entry",
    value: "bank-collection-entry",
  },
  {
    name: "Fee Concession Type Assigner",
    value: "fee-concession-assigner",
  },
  {
    name: "Fee Collection Adjustment",
    value: "fee-collection-adjustment",
  },
  {
    name: "ECS setting",
    value: "ecs-setting",
  },
  {
    name: "Fee Receipt Details",
    value: "fee-receipt-details",
  },
  {
    name: "Fee Day Wise Collection",
    value: "fee-daywise-collection",
  },
  {
    name: "Cheque Bounce Details",
    value: "cheque-bounce-details",
  },
  
];

const Configs = () => {
const router = useRouter()
  const cardClick =(path)=>{
    router.push(`/fee/${path}`)
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

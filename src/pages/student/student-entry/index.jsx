"use client";

import React, { useEffect, useState } from "react";
import CommonText from "@/components/Text";
import { Card, Grid } from "@mui/material";
import { Tabs } from "antd";
import BasicDetails from "@/components/SchoolManagemnt/StudentEntry/BasicDetails";
import ParentDetails from "@/components/SchoolManagemnt/StudentEntry/ParentDetails";
import AdditionalDetails from "@/components/SchoolManagemnt/StudentEntry/AdditionslaDetails";
import { GetStudentListById } from "@/services/api";
import { useRouter } from "next/router";

const StudentEntry = () => {
  const router = useRouter();
  const [selectedTab, setSlectedTab] = useState(1);
  const [studentData, setStudentData] = useState([]);
  const id = router?.query?.id;
  const studentDetails = async() => {
    try {
      if (!id) {
        return;
      }
      const resp =await GetStudentListById(id);
      console.log(resp,'resp')

      setStudentData(resp?.data[0]);
    } catch (error) {}
  };
  useEffect(() => {
    studentDetails();
  }, [id, router]);

  return (
    <Card sx={{ p: 2 }}>
      <Grid className="flex justify-between items-center ">
        <button
          onClick={() => setSlectedTab(1)}
          className={`mt-4 w-[33%] ${
            selectedTab === 1 ? "bg-blue-900" : "bg-black"
          } ${
            selectedTab === 1 ? "text-white" : "text-white"
          }  text-center rounded-lg`}
        >
          <p className="p-3 font-bold  text-[18px]">BASIC INFORMATION</p>
        </button>
        <button
          onClick={() => setSlectedTab(2)}
          className={`mt-4 w-[33%] ${
            selectedTab === 2 ? "bg-blue-900" : "bg-black"
          } ${
            selectedTab === 2 ? "text-white" : "text-white"
          }  text-center rounded-lg`}
        >
          <p className="p-3 font-bold  text-[18px]">
            PARENT/GUARDIAN INFORMATION
          </p>
        </button>
        <button
          onClick={() => setSlectedTab(3)}
          className={`mt-4 w-[33%] ${
            selectedTab === 3 ? "bg-blue-900" : "bg-black"
          } ${
            selectedTab === 3 ? "text-white" : "text-white"
          }  text-center rounded-lg`}
        >
          <p className="p-3 font-bold text-[18px]">ADDITIONAL INFORMATION</p>
        </button>
      </Grid>

      <>
        {selectedTab === 1 && (
          <BasicDetails setSlectedTab={setSlectedTab} studenData={studentData} />
        )}
        {selectedTab === 2 && (
          <ParentDetails setSlectedTab={setSlectedTab} studenData={studentData} />
        )}
        {selectedTab === 3 && (
          <AdditionalDetails setSlectedTab={setSlectedTab} studenData={studentData} />
        )}
      </>
    </Card>
  );
};

export default StudentEntry;

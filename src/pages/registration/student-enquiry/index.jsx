"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";

import TCDetails from "@/components/SchoolManagemnt/TransferCertificate/Details";
import TCHistory from "@/components/SchoolManagemnt/TransferCertificate/History";
import CustomTabs from "@/components/customeTab";
import StudentWiseAttendance from "@/components/Attendance/StudentWiseAttendance";
import ClassWiseAttendance from "@/components/Attendance/ClassWiseAttendance";
import EnquiryMaster from "./enquiry-master";
import FollowUp from "./followup";
import { GetStudentListById } from "@/services/api";
import { useRouter } from "next/router";

const StudentEnquiry = () => {
    const router = useRouter()
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
  const tabs = [
    { id: 1, label: "ENQUIRY MASTER" },
    { id: 2, label: "FOLLOW UP/REGISTRATION" },

  ];

  return (
    <Card sx={{ p: 2 }}>
      <CustomTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={setSlectedTab}
      />

      <>
        {selectedTab === 1 && <EnquiryMaster setSlectedTab={setSlectedTab} />}
        {selectedTab === 2 && <FollowUp setSlectedTab={setSlectedTab} />}
      </>
    </Card>
  );
};


export default StudentEnquiry
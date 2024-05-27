"use client";

import React, { useState } from "react";
import { Card } from "@mui/material";

import TCDetails from "@/components/SchoolManagemnt/TransferCertificate/Details";
import TCHistory from "@/components/SchoolManagemnt/TransferCertificate/History";
import CustomTabs from "@/components/customeTab";
import StudentWiseAttendance from "@/components/Attendance/StudentWiseAttendance";
import ClassWiseAttendance from "@/components/Attendance/ClassWiseAttendance";

const AttendanceEntry = () => {
  const [selectedTab, setSlectedTab] = useState(1);
  const tabs = [
    { id: 1, label: "Class Wise" },
    { id: 2, label: "Student Wise" },

  ];

  return (
    <Card sx={{ p: 2 }}>
      <CustomTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={setSlectedTab}
      />

      <>
        {selectedTab === 1 && <ClassWiseAttendance setSlectedTab={setSlectedTab} />}
        {selectedTab === 2 && <StudentWiseAttendance setSlectedTab={setSlectedTab} />}
      </>
    </Card>
  );
};

export default AttendanceEntry;

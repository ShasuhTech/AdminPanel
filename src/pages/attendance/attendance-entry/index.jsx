"use client";

import React, { useState } from "react";
import { Card } from "@mui/material";
import CustomTabs from "@/components/customeTab";
import StudentWiseAttendance from "@/components/Attendance/StudentWiseAttendance";
import ClassWiseAttendance from "@/components/Attendance/ClassWiseAttendance";
import BulkAttendance from "@/components/Attendance/BulkAttendance";

const AttendanceEntry = () => {
  const [selectedTab, setSlectedTab] = useState(1);
  const tabs = [
    { id: 1, label: "Class Wise" },
    { id: 2, label: "Student Wise" },
    { id: 3, label: "Bulk Attendance" },

  ];

  return (
    <Card sx={{ p: 2 }}>
      <CustomTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={setSlectedTab}
        XS={4}
      />

      <>
        {selectedTab === 1 && <ClassWiseAttendance setSlectedTab={setSlectedTab} />}
        {selectedTab === 2 && <StudentWiseAttendance setSlectedTab={setSlectedTab} />}
        {selectedTab === 3 && <BulkAttendance setSlectedTab={setSlectedTab} />}
      </>
    </Card>
  );
};

export default AttendanceEntry;

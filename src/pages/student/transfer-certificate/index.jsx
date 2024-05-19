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
import TCDetails from "@/components/SchoolManagemnt/TransferCertificate/Details";
import TCHistory from "@/components/SchoolManagemnt/TransferCertificate/History";
import CustomTabs from "@/components/customeTab";

const TransferCertificate = () => {
  const router = useRouter();
  const [selectedTab, setSlectedTab] = useState(1);
  const tabs = [
    { id: 1, label: "TC Details" },
    { id: 2, label: "History" },
  ];

  return (
    <Card sx={{ p: 2 }}>
      <CustomTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={setSlectedTab}
      />

      <>
        {selectedTab === 1 && (
          <TCDetails setSlectedTab={setSlectedTab} />
        )}
        {selectedTab === 2 && (
          <TCHistory setSlectedTab={setSlectedTab}  />
        )}
      </>
    </Card>
  );
};

export default TransferCertificate;

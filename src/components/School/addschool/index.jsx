"use client";

import React, { useEffect, useState } from "react";
import CustomTabs from "@/components/customeTab";
import SimpleModal from "@/components/Modal/SimpleModal";
import SchoolBasicInfo from "@/components/School/BasicInfo";
import SchoolAllotments from "@/components/School/Allotments";
import SchoolPayemntType from "@/components/School/PaymentType";
import SmsIntegration from "@/components/School/SMSIntegration";
import SchoolLogo from "../SchoolLogo";
import { Typography } from "@mui/material";
import { GetSchoolList, GetSchoolListById } from "@/services/School";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const AddSchoolModal = ({ open, onClose, data = undefined }) => {
  const [selectedTab, setSlectedTab] = useState(1);
  const [storeStudentId, setStoreStudentId] = useState(data?._id || "");

  // Create tabs array with disabled property
  const tabs = [
    { id: 1, label: "SCHOOL INFO" }, // Fixed typo in "SCHOOL"
    { id: 2, label: "ALLOTMENTS", disabled: !data },
    { id: 3, label: "PAYMENT TYPE", disabled: !data },
    { id: 4, label: "SMS/WHATSAPP INTEGRATION", disabled: !data },
    { id: 5, label: "SCHOOL LOGO", disabled: !data },
  ];

  // Handle tab selection
  const handleTabSelect = (tabId) => {
    // Only allow tab selection if not disabled
    const selectedTabObj = tabs.find((tab) => tab.id === tabId);
    if (!selectedTabObj?.disabled) {
      setSlectedTab(tabId);
    } else {
      toast.warn("Please enter the school's information first.");
    }
  };

  const {
    data: schoolDataById,
    status: schoolStatus,
    isLoading: schoolLoading,
    refetch: schoolRefetch,
  } = useQuery(
    ["schoolsdsDatadd", storeStudentId],
    async () => {
      const res = await GetSchoolListById(storeStudentId);
      return res?.data;
    },
    {
      enabled: !!storeStudentId,
    }
  );

  return (
    <SimpleModal
      open={open}
      width={"95%"}
      handleClose={onClose}
      aria-labelledby="add-service-modal-title"
      aria-describedby="add-service-modal-description"
    >
      <Typography variant="h5">
        {data ? "Edit School" : "Add School"}
      </Typography>
      <CustomTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={handleTabSelect}
        XS={2.3}
      />

      <div className="h-[75vh] overflow-y-scroll">
        {selectedTab === 1 && (
          <SchoolBasicInfo
            setSlectedTab={setSlectedTab}
            data={schoolDataById}
            refetchData={schoolRefetch}
            setStoreStudentId={setStoreStudentId}
          />
        )}
        {selectedTab === 2 && (
          <SchoolAllotments
            setSlectedTab={setSlectedTab}
            data={schoolDataById}
            refetchData={schoolRefetch}
          />
        )}
        {selectedTab === 3 && (
          <SchoolPayemntType
            setSlectedTab={setSlectedTab}
            data={schoolDataById}
            refetchData={schoolRefetch}
          />
        )}
        {selectedTab === 4 && (
          <SmsIntegration
            setSlectedTab={setSlectedTab}
            data={schoolDataById}
            refetchData={schoolRefetch}
          />
        )}
        {selectedTab === 5 && (
          <SchoolLogo
            setSlectedTab={setSlectedTab}
            data={schoolDataById}
            refetchData={schoolRefetch}
          />
        )}
      </div>
    </SimpleModal>
  );
};

export default AddSchoolModal;

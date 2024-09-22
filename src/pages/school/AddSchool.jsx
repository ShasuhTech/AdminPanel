"use client";

import React, { useState } from "react";
import CustomTabs from "@/components/customeTab";
import SimpleModal from "@/components/Modal/SimpleModal";
import SchoolBasicInfo from "@/components/School/BasicInfo";
import SchoolAllotments from "@/components/School/Allotments";
import SchoolPayemntType from "@/components/School/PaymentType";
import SmsIntegration from "@/components/School/SMSIntegration";
import SchoolLogo from "@/components/School/SchoolLogo";

const AddServiceModal = ({ open, onClose, data }) => {
  const [selectedTab, setSlectedTab] = useState(1);
  const tabs = [
    { id: 1, label: "SHOOL INFO" },
    { id: 2, label: "ALLOTMENTS" },
    { id: 3, label: "PAYMENT TYPE" },
    // { id: 4, label: "SMS/WHATSAPP INTEGRATION" },
    { id: 5, label: "SCHOOL LOGO" },

  ];
  return (
    <SimpleModal
      open={open}
      width={'95%'}
      height={'90%'}
      handleClose={onClose}
      aria-labelledby="add-service-modal-title"
      aria-describedby="add-service-modal-description"
    >
      <CustomTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={setSlectedTab}
        XS={3}
      />

      <>
        {selectedTab === 1 && <SchoolBasicInfo setSlectedTab={setSlectedTab} data={data} />}
        {selectedTab === 2 && <SchoolAllotments setSlectedTab={setSlectedTab} data={data} />}
        {selectedTab === 3 && <SchoolPayemntType setSlectedTab={setSlectedTab} />}
        {/* {selectedTab === 4 && <SmsIntegration setSlectedTab={setSlectedTab} />} */}
        {selectedTab === 5 && <SchoolLogo setSlectedTab={setSlectedTab} />}
      </>
     
    </SimpleModal>
  );
};

export default AddServiceModal;

"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import BasicInformation from "@/components/Staff/BasicInformation";
import PayInformation from "@/components/Staff/PayInformation";
import OtherInformation from "@/components/Staff/OtherInformation";
import CustomTabs from "@/components/customeTab";
import AddressDetails from "@/components/Staff/AddressDetails";
import { useRouter } from "next/router";
import { getStallById } from "@/services/api";
import { useQuery } from "react-query";

const AddStaffDetails = () => {
  const [selectedTab, setSlectedTab] = useState(1);
  const tabs = [
    { id: 1, label: "Basic Information" },
    { id: 2, label: "Pay Information" },
    { id: 3, label: "Other Information" },
    { id: 4, label: "Address" },
  ];

  const router = useRouter();
  const id = router?.query?.id;
  const { data: data, refetch: staffRefetch } = useQuery(
    "getStallById",
    async () => {
      if (!id) {
        return;
      }
      const res = await getStallById(id);
      return res?.data;
    }
  );

  useEffect(() => {
    staffRefetch();
  }, [id]);

  return (
    <Card sx={{ p: 2 }}>
      <CustomTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={setSlectedTab}
        XS={3}
      />

      <>
        {selectedTab === 1 && (
          <BasicInformation setSlectedTab={setSlectedTab} data={data} staffRefetch={staffRefetch} />
        )}
        {selectedTab === 2 && (
          <PayInformation setSlectedTab={setSlectedTab} data={data} staffRefetch={staffRefetch} />
        )}
        {selectedTab === 3 && (
          <OtherInformation setSlectedTab={setSlectedTab} data={data} staffRefetch={staffRefetch} />
        )}
        {selectedTab === 4 && (
          <AddressDetails setSlectedTab={setSlectedTab} data={data} staffRefetch={staffRefetch} />
        )}
      </>
    </Card>
  );
};

export default AddStaffDetails;

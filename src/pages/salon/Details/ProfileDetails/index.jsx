import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
// import styles from "./styles.module.css"; // Import external CSS file
import SimpleMap from "@/components/MapPage";
import { useRouter } from "next/router";
import { salonListByid } from "@/services/api";
import { useState } from "react";
import { useEffect } from "react";



const ProfileDetails = ({ index }) => {
  const [data, setSalonData] = useState(undefined);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const id = router?.query?.id;

  const call = async () => {
    if (!id) {
      return;
    }
    const payload = {
      id,
      include: "address",
    };
    try {
      setLoader(true);
      const resp = await salonListByid(payload);
      setLoader(false);
      setSalonData(resp?.data);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useEffect(() => {
    call();
  }, [router, id]);

  return (
    <Grid className="p-4">
      <Box className="flex gap-4 my-1">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Name</Typography>:
        <Typography width={'82%'}>{data?.name}</Typography>
      </Box>

      <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>
          Contact Mobile Number
        </Typography>
        :
        <Typography width={'82%'}>
          {data?.contactMobileNumber}
        </Typography>
      </Box>
      <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Landline Number</Typography>:
        <Typography width={'82%'}>
          {data?.landlineNumber}
        </Typography>
      </Box>

      <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Email</Typography>:
        <Typography width={'82%'}>
          {data?.email}
        </Typography>
      </Box>

      <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Status</Typography>:
        <Typography width={'82%'}>
          {data?.statusText}
        </Typography>
      </Box>
      {/* <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Email</Typography>:
        <Typography width={'82%'}>
          {data?.contactMobileNumber}
        </Typography>
      </Box> */}
      <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Type</Typography>:
        <Typography width={'82%'}>{data?.typeText}</Typography>
      </Box>
      <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Live Status</Typography>:
        <Typography width={'82%'}>{data?.liveStatusText}</Typography>
      </Box>
      <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Working Hours</Typography>:
        <Typography width={'82%'}>
          {(data?.working?.openTime || "") +
            " : " +
            (data?.working?.closeTime || "")}
        </Typography>
      </Box>

      <Box className="flex gap-4 my-2">
        <Typography width={'20%'} variant="h6" fontWeight={'bold'}>Address</Typography>:
        {data?.address?.address && (
          <Typography width={'82%'}>
            {data?.address?.address +
              "," +
              data?.address?.city?.name +
              "," +
              data?.address?.state?.name +
              "," +
              data?.address?.country?.name +
              "," +
              data?.address?.pincode}
          </Typography>
        )}
      </Box>
      <Grid className="my-4">
        <Typography variant="h5" mt={4}>Salon Geolocation on Map</Typography>
       {data?.coordinates&& <SimpleMap lat={data?.coordinates[0]} lng={data?.coordinates[1]} />}
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;

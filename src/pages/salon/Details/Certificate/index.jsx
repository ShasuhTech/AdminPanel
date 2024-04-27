import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
// import styles from "./styles.module.css"; // Import external CSS file
import PdfPreview from "@/components/Modal/PdfPreview";
import { useState } from "react";
import { useRouter } from "next/router";
import { salonListByid } from "@/services/api";
import { useEffect } from "react";

const Certificate = ({}) => {
  const styles = "";
  const [data, setSalonData] = useState({});
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const id = router?.query?.id;
  const call = async () => {
    if (!id) {
      return;
    }
    const payload = {
      id,
      include: "Certificates",
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
    if (Object.keys(data).length === 0 && data?.constructor === Object) {
      call();
    }
  }, [router]);

  const combinedObject = {};
  data?.Certificates?.forEach((item, index) => {
    combinedObject[`verificationNumber${index + 1}`] = item.verificationNumber;
    combinedObject[`verificationCertificateUrl${index + 1}`] =
      item.verificationCertificateUrl;
    combinedObject[`verificationCertificateSlug${index + 1}`] =
      item.verificationCertificateSlug;
    if (item.meta && item.meta.dateOfRegistration) {
      combinedObject["dateOfRegistration"] = item.meta.dateOfRegistration;
    }
  });

  const openPDF = ({ pdfUrl }) => {
    console.log(pdfUrl);
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    } else {
      console.error("PDF URL not provided or invalid");
    }
  };

  const [details, setDetails] = useState({ open: false, url: "" });
  console.log(details);
  return (
    <Grid className="p-4">
      <Box className="flex gap-4 my-4">
        <Typography width={"20%"} variant="h6" fontWeight={"bold"}>
          Registration Number
        </Typography>
        :
        <Typography width={"82%"}>
          {combinedObject?.verificationNumber1}
        </Typography>
      </Box>

      <Box className="flex gap-1 my-4">
        <Typography width={"20%"} variant="h6" fontWeight={"bold"}>
          Registration Certificate
        </Typography>
        :
        {combinedObject?.verificationCertificateUrl1 && (
          <button
            onClick={() => {
              setDetails({
                open: true,
                url: combinedObject?.verificationCertificateUrl1,
              });
            }}
            className={[styles.textRight, "cursor-pointer ml-3 text-blue-600"]}
          >
            View Certificate
          </button>
        )}
      </Box>
      <Box className="flex gap-4 my-4">
        <Typography width={"20%"} variant="h6" fontWeight={"bold"}>
          Salon Registration Date
        </Typography>
        :
        <Typography width={"82%"}>
          {combinedObject?.dateOfRegistration}
        </Typography>
      </Box>
      <Box className="flex gap-4 my-4">
        <Typography width={"20%"} variant="h6" fontWeight={"bold"}>
          Pan Number
        </Typography>
        :
        <Typography width={"82%"}>
          {combinedObject?.verificationNumber2}
        </Typography>
      </Box>
      <Box className="flex gap-1 my-4">
        <Typography width={"20%"} variant="h6" fontWeight={"bold"}>
          Pan Certificate
        </Typography>
        :
        {combinedObject?.verificationCertificateUrl2 && (
          <button
            onClick={() => {
              setDetails({
                open: true,
                url: combinedObject?.verificationCertificateUrl2,
              });
            }}
            className={[styles.textRight, "cursor-pointer ml-3 text-blue-600"]}
          >
            View Certificate
          </button>
        )}
      </Box>
      <Box className="flex gap-4 my-4">
        <Typography width={"20%"} variant="h6" fontWeight={"bold"}>
          Gst Number
        </Typography>
        :
        <Typography width={"82%"}>
          {combinedObject?.verificationNumber3}
        </Typography>
      </Box>
      <Box className="flex gap-1 my-4">
        <Typography width={"20%"} variant="h6" fontWeight={"bold"}>
          Gst Certificate
        </Typography>
        :
        {combinedObject?.verificationCertificateUrl3 && (
          <button
            onClick={() => {
              setDetails({
                open: true,
                url: combinedObject?.verificationCertificateUrl3,
              });
            }}
            className={[styles.textRight, "cursor-pointer ml-3 text-blue-600"]}
          >
            View Certificate
          </button>
        )}
      </Box>
      {
        <PdfPreview
          handleClose={() =>
            setDetails({
              open: false,
              url: "",
            })
          }
          open={details.open}
          data={details.url}
        />
      }
    </Grid>
  );
};

export default Certificate;

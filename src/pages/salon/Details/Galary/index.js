import ImagePreview from "@/components/Modal/ImagePreview";
import { salonListByid } from "@/services/api";
import { Box, Grid, span } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";

const Galary = ({  }) => {


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
      include: "",
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

  let videosrc = data?.meta?.video?.url;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [imageData, setImageData] = useState("");
  const ImageHandler = (item) => {
    setImageData(item);
    handleOpen();
  };

  return (
    <Grid className="p-4">
      <Grid className="w-[100%] gap-5 lg:flex">
        <Grid className="">
          <span className=" font-bold" style={{ fontSize: "17px" }}>
            Salon Images
          </span>
          <Grid className="lg:flex gap-5 my-5">
           { data?.meta?.insideImage?.url&&<Grid>
              <span className="text-center text-[15px] "> Inside Image</span>
              <img
                onClick={() => ImageHandler(data?.meta?.insideImage?.url)}
                src={data?.meta?.insideImage?.url}
                alt=""
                className="w-[300px] h-[250px] object-cover border rounded-lg cursor-pointer"
              />
            </Grid>}
           {data?.meta?.outsideImage?.url&& <Grid>
              <span className="text-center text-[15px] ">Outside Image</span>
              <img
                onClick={() => ImageHandler(data?.meta?.outsideImage?.url)}
                src={data?.meta?.outsideImage?.url}
                alt=""
                className="w-[300px] h-[250px] object-cover border rounded-lg cursor-pointer"
              />
            </Grid>}
          </Grid>
        </Grid>
        {/* {videosrc && (
          <div className="mb-4">
            <span className=" font-bold" style={{ fontSize: "17px" }}>
            Salon Video
            </span>
            <ReactPlayer
              width="300px"
              height="250px"
              style={{
                border: "1px solid #E0E0E0",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "39px",
              }}
              url={videosrc}
              controls={true}
              // light is usefull incase of dark mode
              light={false}
              // picture in picture
              pip={true}
            />
            <source src={videosrc} type="video/mp4" />
          </div>
        )} */}
      </Grid>
      <Grid sx={{marginTop:'35px'}}>
      {videosrc && (
          <div className="mb-4">
            <span className=" font-bold" style={{ fontSize: "17px" }}>
            Salon Video
            </span>
            <ReactPlayer
              width="300px"
              height="250px"
              style={{
                border: "1px solid #E0E0E0",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "39px",
              }}
              url={videosrc}
              controls={true}
              // light is usefull incase of dark mode
              light={false}
              // picture in picture
              pip={true}
            />
            <source src={videosrc} type="video/mp4" />
          </div>
        )}
      </Grid>
      {data?.meta?.images.length > 0 &&<Grid sx={{marginTop:'35px'}}>
        <span
          className=" font-bold"
          style={{ fontSize: "17px", marginTop: "10px" }}
        >
          Salon Gallery
        </span>

        <Grid className="flex gap-5 flex-wrap">
          {data?.meta?.images.length > 0 &&
            data?.meta?.images.map((item, index) => {
              if (item?.fileType === "image") {
                return (
                  <img
                    key={index}
                    src={item?.url}
                    alt=""
                    onClick={() => ImageHandler(item?.url)}
                    className="w-[300px] h-[250px] object-cover border rounded-lg mt-3 gap-4 flex cursor-pointer"
                  />
                );
              } else {
                return (
                  <div
                    key={index}
                    className="relative w-[300px] h-[250px] mt-3"
                  >
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      style={{
                        border: "1px solid #E0E0E0",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                      url={item?.url}
                      controls={true}
                      light={false}
                      pip={true}
                    />
                  </div>
                );
              }
            })}
        </Grid>
      </Grid>}
      {open && (
        <ImagePreview open={open} handleClose={handleClose} data={imageData} />
      )}
    </Grid>
  );
};

export default Galary;

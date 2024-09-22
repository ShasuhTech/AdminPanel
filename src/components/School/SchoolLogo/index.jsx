'use client'

import React from "react";
import dynamic from "next/dynamic";
import { message, Typography, Upload } from "antd";
import SubmitButton from "@/components/CommonButton/SubmitButton";

// Dynamically import InboxOutlined to avoid issues in server-side rendering
const InboxOutlined = dynamic(() => import("@ant-design/icons/InboxOutlined"), { ssr: false });

const { Dragger } = Upload;

const uploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const SchoolLogo = () => (
  <>
    <div className="flex items-center justify-between gap-5 my-10">
      <div>
        <Typography>School logo</Typography>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
      <div>
        <Typography>School favicon</Typography>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
    </div>
    <div className="flex justify-end">
      <SubmitButton>Submit</SubmitButton>
    </div>
  </>
);

export default SchoolLogo;

'use client'

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { message, Typography, Upload, Spin, Card, Tooltip, Button, Modal, Alert, Divider } from "antd";
import SubmitButton from "@/components/CommonButton/SubmitButton";
import { updateSchool } from "@/services/School";

// Dynamically import icons
const InboxOutlined = dynamic(() => import("@ant-design/icons/InboxOutlined"), { ssr: false });
const DeleteOutlined = dynamic(() => import("@ant-design/icons/DeleteOutlined"), { ssr: false });
const EyeOutlined = dynamic(() => import("@ant-design/icons/EyeOutlined"), { ssr: false });
const CheckCircleFilled = dynamic(() => import("@ant-design/icons/CheckCircleFilled"), { ssr: false });
const CloseCircleOutlined = dynamic(() => import("@ant-design/icons/CloseCircleOutlined"), { ssr: false });

const { Dragger } = Upload;
const { Title, Text } = Typography;

const SchoolLogo = ({ data, setSlectedTab }) => {
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [errors, setErrors] = useState({});

  // Load existing data if available
  useEffect(() => {
    if (data && data.branding) {
      // If there's existing logo data, set it
      if (data.branding.logo) {
        setLogoFile({
          uid: '-1',
          name: 'Current logo',
          status: 'done',
          url: data.branding.logo
        });
      }
      
      // If there's existing favicon data, set it
      if (data.branding.favicon) {
        setFaviconFile({
          uid: '-2',
          name: 'Current favicon',
          status: 'done',
          url: data.branding.favicon
        });
      }
    }
  }, [data]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Currently no required validation, but framework is in place
    // for future requirements

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!logoFile && !faviconFile) {
      message.warning('Please upload at least one file before submitting');
      return;
    }

    if (!validateForm()) {
      message.error("Please correct the errors before submitting");
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      
      if (logoFile && logoFile.originFileObj) {
        formData.append('logo', logoFile.originFileObj);
      }
      
      if (faviconFile && faviconFile.originFileObj) {
        formData.append('favicon', faviconFile.originFileObj);
      }
      
      // Create payload for API
      const payload = {
        branding: {
          logo: logoFile ? true : false, // Replace with actual URL from API response
          favicon: faviconFile ? true : false // Replace with actual URL from API response
        }
      };

      if (data && data._id) {
        payload.id = data._id;
      }

      // Upload files first if needed
      if (logoFile?.originFileObj || faviconFile?.originFileObj) {
        // This would be your file upload API endpoint
        const uploadResponse = await fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error(`Upload failed with status ${uploadResponse.status}`);
        }
        
        const uploadResult = await uploadResponse.json();
        
        // Update payload with actual URLs from upload response
        if (uploadResult.logoUrl) payload.branding.logo = uploadResult.logoUrl;
        if (uploadResult.faviconUrl) payload.branding.favicon = uploadResult.faviconUrl;
      }
      
      // Now update the school with the branding info
      const resp = await updateSchool(payload);
      
      if (resp) {
        message.success('School branding updated successfully!');
        if (setSlectedTab) {
          setSlectedTab(2); // Move to next tab if needed
        }
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update school branding";
      message.error(errorMessage);
      console.error("Error updating school branding:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1) || 'Preview');
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      // We're not actually uploading during the drag, just handling the file
      setTimeout(() => {
        onSuccess("ok");
      }, 300);
    } catch (error) {
      onError(error);
    }
  };

  const logoUploadProps = {
    name: "logo",
    multiple: false,
    accept: "image/png, image/jpeg, image/svg+xml",
    maxCount: 1,
    customRequest,
    beforeUpload: (file) => {
      const isImage = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml';
      if (!isImage) {
        message.error('You can only upload PNG, JPG, or SVG image files!');
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      const { status } = info.file;
      
      if (status === "done") {
        setLogoFile(info.file);
        message.success(`${info.file.name} uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed.`);
      } else if (status === "removed") {
        setLogoFile(null);
      }
    },
    onRemove: () => {
      setLogoFile(null);
      return true;
    },
    showUploadList: false,
  };

  const faviconUploadProps = {
    name: "favicon",
    multiple: false,
    accept: "image/x-icon, image/png, image/svg+xml",
    maxCount: 1,
    customRequest,
    beforeUpload: (file) => {
      const isValidType = 
        file.type === 'image/x-icon' || 
        file.type === 'image/png' || 
        file.type === 'image/svg+xml';
      
      if (!isValidType) {
        message.error('Favicon must be .ico, .png, or .svg format!');
        return Upload.LIST_IGNORE;
      }
      
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        message.error('Favicon must be smaller than 1MB!');
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      const { status } = info.file;
      
      if (status === "done") {
        setFaviconFile(info.file);
        message.success(`${info.file.name} uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed.`);
      } else if (status === "removed") {
        setFaviconFile(null);
      }
    },
    onRemove: () => {
      setFaviconFile(null);
      return true;
    },
    showUploadList: false,
  };

  const handleSkip = () => {
    if (setSlectedTab) {
      setSlectedTab(2); // Skip to next tab
    }
  };
  
  const handleBack = () => {
    if (setSlectedTab) {
      setSlectedTab(0); // Go to previous tab
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <Title level={5} className="mb-6">School Branding</Title>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="hover:shadow-md transition-shadow duration-300">
          <div className="mb-4">
            <Text strong className="text-lg">School Logo</Text>
            <Text className="block text-gray-500 mt-1">
              Upload your school's main logo (PNG, JPG, or SVG format)
            </Text>
          </div>
          
          <Dragger {...logoUploadProps} className="bg-gray-50 border border-dashed border-gray-300">
            {logoFile ? (
              <div className="p-4 flex flex-col items-center">
                <div className="mb-2 text-green-600">
                  <CheckCircleFilled style={{ fontSize: 24 }} />
                </div>
                <Text ellipsis className="font-medium">{logoFile.name}</Text>
                <div className="mt-2 flex space-x-2">
                  <Tooltip title="Preview">
                    <Button 
                      icon={<EyeOutlined />} 
                      size="small" 
                      onClick={() => handlePreview(logoFile)}
                    />
                  </Tooltip>
                  <Tooltip title="Remove">
                    <Button 
                      icon={<DeleteOutlined />} 
                      size="small" 
                      onClick={() => setLogoFile(null)}
                      danger
                    />
                  </Tooltip>
                </div>
              </div>
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#1890ff' }} />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to upload
                </p>
                <p className="ant-upload-hint text-gray-500">
                  Recommended size: 250×80px. Maximum file size: 2MB.
                </p>
              </>
            )}
          </Dragger>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-300">
          <div className="mb-4">
            <Text strong className="text-lg">School Favicon</Text>
            <Text className="block text-gray-500 mt-1">
              Upload your browser tab icon (.ico, .png, or .svg format)
            </Text>
          </div>
          
          <Dragger {...faviconUploadProps} className="bg-gray-50 border border-dashed border-gray-300">
            {faviconFile ? (
              <div className="p-4 flex flex-col items-center">
                <div className="mb-2 text-green-600">
                  <CheckCircleFilled style={{ fontSize: 24 }} />
                </div>
                <Text ellipsis className="font-medium">{faviconFile.name}</Text>
                <div className="mt-2 flex space-x-2">
                  <Tooltip title="Preview">
                    <Button 
                      icon={<EyeOutlined />} 
                      size="small" 
                      onClick={() => handlePreview(faviconFile)}
                    />
                  </Tooltip>
                  <Tooltip title="Remove">
                    <Button 
                      icon={<DeleteOutlined />} 
                      size="small" 
                      onClick={() => setFaviconFile(null)}
                      danger
                    />
                  </Tooltip>
                </div>
              </div>
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#1890ff' }} />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to upload
                </p>
                <p className="ant-upload-hint text-gray-500">
                  Recommended size: 32×32px or 16×16px. Maximum file size: 1MB.
                </p>
              </>
            )}
          </Dragger>
        </Card>
      </div>

      {/* Preview section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
        <Text strong className="block mb-4">Preview</Text>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <Text className="text-gray-500 text-sm mb-2">Logo</Text>
            {logoFile ? (
              <div className="w-40 h-16 bg-white flex items-center justify-center p-2 border border-gray-200 rounded">
                <img 
                  src={logoFile.url || (logoFile.originFileObj && URL.createObjectURL(logoFile.originFileObj))} 
                  alt="School Logo Preview" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-40 h-16 bg-white flex items-center justify-center p-2 border border-gray-200 rounded text-gray-400">
                No logo uploaded
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center">
            <Text className="text-gray-500 text-sm mb-2">Favicon</Text>
            {faviconFile ? (
              <div className="w-10 h-10 bg-white flex items-center justify-center p-1 border border-gray-200 rounded">
                <img 
                  src={faviconFile.url || (faviconFile.originFileObj && URL.createObjectURL(faviconFile.originFileObj))} 
                  alt="Favicon Preview" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-white flex items-center justify-center p-1 border border-gray-200 rounded text-gray-400">
               <span style={{ fontSize: '8px' }}>favicon</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Error display */}
      {Object.keys(errors).length > 0 && (
        <Alert 
          message="Please correct the errors before saving" 
          type="error" 
          showIcon 
          className="mb-6" 
          icon={<CloseCircleOutlined />}
        />
      )}

      <Divider className="my-6" />

      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <Button onClick={handleSkip}>
          Skip
        </Button>
        <div className="space-x-4">
          <Button onClick={handleBack}>
            Back
          </Button>
          <SubmitButton 
            onClick={handleSubmit} 
            loading={loading}
            disabled={!logoFile && !faviconFile}
          >
            {loading ? "Saving..." : "Next"}
          </SubmitButton>
        </div>
      </div>

      {/* Image preview modal */}
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img
          alt="Preview"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default SchoolLogo;
'use client'

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Button,
  Stack,
  Grid,
  Divider,
  Alert
} from '@mui/material';
import CustomButton from "@/components/CommonButton/CustomButton";
import { updateSchool } from "@/services/School";
import { toast } from "react-toastify";

const SmsIntegration = ({ data, setSlectedTab }) => {
  // State for form values
  const [smsGateway, setSmsGateway] = useState('');
  const [whatsappIntegration, setWhatsappIntegration] = useState('No');
  const [smsDetails, setSmsDetails] = useState({
    apiKey: '',
    senderId: '',
    username: '',
    password: ''
  });
  const [whatsappDetails, setWhatsappDetails] = useState({
    businessId: '',
    accessToken: '',
    phoneNumberId: ''
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SMS gateway options
  const smsGatewayOptions = [
    'Select SMS Gateway',
    'SmsQuick',
    'Twilio',
    'MessageBird',
    'Plivo',
    'Vonage'
  ];

  // WhatsApp integration options
  const whatsappOptions = [
    'No',
    'Yes'
  ];

  // Load existing data if available
  useEffect(() => {
    if (data) {
      // Load SMS gateway settings
      if (data.smsIntegration) {
        setSmsGateway(data.smsIntegration.gateway || '');
        setSmsDetails({
          apiKey: data.smsIntegration.apiKey || '',
          senderId: data.smsIntegration.senderId || '',
          username: data.smsIntegration.username || '',
          password: data.smsIntegration.password || ''
        });
      }

      // Load WhatsApp integration settings
      if (data.whatsappIntegration) {
        setWhatsappIntegration(data.whatsappIntegration.enabled ? 'Yes' : 'No');
        setWhatsappDetails({
          businessId: data.whatsappIntegration.businessId || '',
          accessToken: data.whatsappIntegration.accessToken || '',
          phoneNumberId: data.whatsappIntegration.phoneNumberId || ''
        });
      }
    }
  }, [data]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate SMS gateway selection
    if (smsGateway && smsGateway !== 'Select SMS Gateway') {
      // Validate SMS gateway details
      if (!smsDetails.apiKey) {
        newErrors.apiKey = "API Key is required";
        isValid = false;
      }
      if (!smsDetails.senderId) {
        newErrors.senderId = "Sender ID is required";
        isValid = false;
      }
    }

    // Validate WhatsApp integration if enabled
    if (whatsappIntegration === 'Yes') {
      if (!whatsappDetails.businessId) {
        newErrors.businessId = "WhatsApp Business ID is required";
        isValid = false;
      }
      if (!whatsappDetails.accessToken) {
        newErrors.accessToken = "WhatsApp Access Token is required";
        isValid = false;
      }
      if (!whatsappDetails.phoneNumberId) {
        newErrors.phoneNumberId = "WhatsApp Phone Number ID is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSmsDetailsChange = (field, value) => {
    setSmsDetails({
      ...smsDetails,
      [field]: value
    });

    // Clear error for the field if it exists
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleWhatsappDetailsChange = (field, value) => {
    setWhatsappDetails({
      ...whatsappDetails,
      [field]: value
    });

    // Clear error for the field if it exists
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please correct the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      smsIntegration: {
        gateway: smsGateway,
        ...smsDetails
      },
      whatsappIntegration: {
        enabled: whatsappIntegration === 'Yes',
        ...whatsappDetails
      }
    };

    if (data && data._id) {
      payload.id = data._id;
    }

    try {
      const resp = await updateSchool(payload);
      if (resp) {
        toast.success("Communication settings updated successfully");
        if (setSlectedTab) {
          setSlectedTab(4); // Go to next tab
        }
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update communication settings";
      toast.error(errorMessage);
      console.error("Error updating communication settings:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (setSlectedTab) {
      setSlectedTab(2); // Go to previous tab
    }
  };

  const handleSkip = () => {
    if (setSlectedTab) {
      setSlectedTab(4); // Skip to next tab
    }
  };

  const renderSmsGatewayDetails = () => {
    if (!smsGateway || smsGateway === 'Select SMS Gateway') return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
          SMS Gateway Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="API Key"
              value={smsDetails.apiKey}
              onChange={(e) => handleSmsDetailsChange('apiKey', e.target.value)}
              placeholder="Enter API Key"
              error={!!errors.apiKey}
              helperText={errors.apiKey}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Sender ID"
              value={smsDetails.senderId}
              onChange={(e) => handleSmsDetailsChange('senderId', e.target.value)}
              placeholder="Enter Sender ID"
              error={!!errors.senderId}
              helperText={errors.senderId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              value={smsDetails.username}
              onChange={(e) => handleSmsDetailsChange('username', e.target.value)}
              placeholder="Enter Username"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={smsDetails.password}
              onChange={(e) => handleSmsDetailsChange('password', e.target.value)}
              placeholder="Enter Password"
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderWhatsappDetails = () => {
    if (whatsappIntegration !== 'Yes') return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
          WhatsApp Business API Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="WhatsApp Business ID"
              placeholder="Enter Business ID"
              value={whatsappDetails.businessId}
              onChange={(e) => handleWhatsappDetailsChange('businessId', e.target.value)}
              error={!!errors.businessId}
              helperText={errors.businessId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="WhatsApp Access Token"
              placeholder="Enter Access Token"
              value={whatsappDetails.accessToken}
              onChange={(e) => handleWhatsappDetailsChange('accessToken', e.target.value)}
              error={!!errors.accessToken}
              helperText={errors.accessToken}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="WhatsApp Phone Number ID"
              placeholder="Enter Phone Number ID"
              value={whatsappDetails.phoneNumberId}
              onChange={(e) => handleWhatsappDetailsChange('phoneNumberId', e.target.value)}
              error={!!errors.phoneNumberId}
              helperText={errors.phoneNumberId}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const handleSmsGatewayChange = (value) => {
    setSmsGateway(value);
    
    // Clear errors related to SMS gateway
    const newErrors = { ...errors };
    ['apiKey', 'senderId', 'username', 'password'].forEach(field => {
      delete newErrors[field];
    });
    setErrors(newErrors);
  };

  const handleWhatsappIntegrationChange = (value) => {
    setWhatsappIntegration(value);
    
    // Clear errors related to WhatsApp if disabled
    if (value === 'No') {
      const newErrors = { ...errors };
      ['businessId', 'accessToken', 'phoneNumberId'].forEach(field => {
        delete newErrors[field];
      });
      setErrors(newErrors);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        SMS / WhatsApp Integration
      </Typography>

      <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={4}>
            {/* SMS Integration Section */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  SMS Integration
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="sms-gateway-label">Select SMS Gateway</InputLabel>
                  <Select
                    labelId="sms-gateway-label"
                    value={smsGateway}
                    label="Select SMS Gateway"
                    onChange={(e) => handleSmsGatewayChange(e.target.value)}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300
                        }
                      }
                    }}
                  >
                    {smsGatewayOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Choose your SMS service provider</FormHelperText>
                </FormControl>
              </Box>
            </Grid>

            {/* WhatsApp Integration Section */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  WhatsApp Integration
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="whatsapp-integration-label">WhatsApp Integration</InputLabel>
                  <Select
                    labelId="whatsapp-integration-label"
                    value={whatsappIntegration}
                    label="WhatsApp Integration"
                    onChange={(e) => handleWhatsappIntegrationChange(e.target.value)}
                  >
                    {whatsappOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Enable WhatsApp business integration</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Conditional rendering of SMS details */}
          {renderSmsGatewayDetails()}

          {/* Conditional rendering of WhatsApp details */}
          {renderWhatsappDetails()}

          {/* Error summary if needed */}
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Please correct the errors before saving
            </Alert>
          )}
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="space-between">
        <Button 
          variant="text" 
          onClick={handleSkip}
        >
          Skip
        </Button>
        <Box>
          <Button 
            variant="outlined" 
            sx={{ mr: 2 }}
            onClick={handleBack}
          >
            Back
          </Button>
          <CustomButton 
            width={100} 
            py={2}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Next"}
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SmsIntegration;
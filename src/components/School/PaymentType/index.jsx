"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Stack,
  Grid,
  Divider,
  FormHelperText,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "@/components/CommonButton/CustomButton";
import { updateSchool } from "@/services/School";
import { toast } from "react-toastify";

const SchoolPaymentType = ({ data, setSlectedTab ,refetchData}) => {
  // Initial state setup with pre-filled data if available
  const [paymentGateways, setPaymentGateways] = useState([
    {
      id: 1,
      gateway: "",
      merchantId: "",
      merchantKey: "",
      channelId: "",
      industryId: "",
      websiteWeb: "",
      websiteApp: "",
      mode: "",
      active: true,
    },
  ]);
console.log(paymentGateways,'=paymentGatewayspaymentGateways')
  // Form errors state
  const [errors, setErrors] = useState({});
  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Track last used values to copy them to new forms
  const [lastUsedValues, setLastUsedValues] = useState({
    gateway: "",
    mode: "",
    websiteWeb: "",
    websiteApp: "",
  });

  // Payment gateway options
  const gatewayOptions = [
    "Stripe",
    "PayPal",
    "Razorpay",
    "PayU",
    "Paytm",
    "Authorize.net",
  ];

  // Mode options
  const modeOptions = ["Test", "Live"];

  // Load existing data if available
  useEffect(() => {
    if (data && data.paymentGateways && data.paymentGateways.length > 0) {
      // Map the server data to match our component state structure
      const mappedGateways = data.paymentGateways.map((gateway, index) => ({
        id: index + 1,
        gateway: gateway.gateway || "",
        merchantId: gateway.merchantId || "",
        merchantKey: gateway.merchantKey || "",
        channelId: gateway.channelId || "",
        industryId: gateway.industryId || "",
        websiteWeb: gateway.websiteWeb || "",
        websiteApp: gateway.websiteApp || "",
        mode: gateway.mode || "",
        active: gateway.active !== undefined ? gateway.active : true,
      }));
      setPaymentGateways(mappedGateways);
      
      // If there's at least one gateway, save its values as the last used values
      if (mappedGateways.length > 0) {
        const latestGateway = mappedGateways[0];
        setLastUsedValues({
          gateway: latestGateway.gateway,
          mode: latestGateway.mode,
          websiteWeb: latestGateway.websiteWeb,
          websiteApp: latestGateway.websiteApp,
        });
      }
    }
  }, [data]);

  const handleAddGateway = () => {
    // Get highest ID to ensure unique IDs even after deletions
    const highestId = Math.max(...paymentGateways.map(g => g.id), 0);
    
    // Create new gateway with common values pre-filled
    const newGateway = {
      id: highestId + 1,
      gateway: lastUsedValues.gateway,
      merchantId: "", // Unique per gateway
      merchantKey: "", // Unique per gateway
      channelId: "", // Typically unique
      industryId: "", // Typically unique
      websiteWeb: lastUsedValues.websiteWeb,
      websiteApp: lastUsedValues.websiteApp,
      mode: lastUsedValues.mode,
      active: true,
    };
    
    setPaymentGateways(prev => [...prev, newGateway]);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    paymentGateways.forEach((gateway) => {
      // Required field validation using gateway.id for error keys
      if (!gateway.gateway) {
        newErrors[`${gateway.id}-gateway`] = "Payment gateway is required";
        isValid = false;
      }
      if (!gateway.merchantId) {
        newErrors[`${gateway.id}-merchantId`] = "Merchant ID is required";
        isValid = false;
      }
      if (!gateway.merchantKey) {
        newErrors[`${gateway.id}-merchantKey`] = "Merchant Key is required";
        isValid = false;
      }
      if (!gateway.mode) {
        newErrors[`${gateway.id}-mode`] = "Mode is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Reset payment gateway IDs to be sequential before submitting
    const formattedGateways = paymentGateways.map((gateway, index) => ({
      ...gateway,
      formId: index + 1 // Add sequential formId for display purposes
    }));
    
    const payload = {
      paymentGateways: formattedGateways.map(({
        id, formId, // Remove the local ids before sending to server
        ...rest
      }) => rest),
    };

    if (data && data._id) {
      payload.id = data._id;
    }

    try {
      const resp = await updateSchool(payload);
      if (resp) {
        toast.success("Payment configuration successfully updated");
        setSlectedTab(4);
        refetchData()
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update payment configuration";
      toast.error(errorMessage);
      console.error("Error updating payment configuration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveGateway = (id) => {
    setPaymentGateways(paymentGateways.filter((gateway) => gateway.id !== id));

    // Clean up errors for the removed gateway
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`${id}-`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const handleGatewayChange = (id, field, value) => {
    setPaymentGateways(
      paymentGateways.map((gateway) =>
        gateway.id === id ? { ...gateway, [field]: value } : gateway
      )
    );

    // Update lastUsedValues for common fields
    if (["gateway", "mode", "websiteWeb", "websiteApp"].includes(field)) {
      setLastUsedValues(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error for the field if it exists
    if (errors[`${id}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${id}-${field}`];
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    if (setSlectedTab) {
      setSlectedTab(1); // Assuming previous tab is 1
    }
  };

  const handleSkip = () => {
    if (setSlectedTab) {
      setSlectedTab(4); // Go to next tab without saving
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Payment Configuration
        </Typography>

        <CustomButton width={100} py={2} onClick={handleAddGateway}>
          + Add
        </CustomButton>
      </Stack>

      {paymentGateways.map((gateway, index) => (
        <Card
          key={gateway.id}
          variant="outlined"
          sx={{ mb: 3, borderRadius: 2 }}
        >
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Gateway #{index + 1}
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl 
                  fullWidth 
                  required
                  error={!!errors[`${gateway.id}-gateway`]}
                >
                  <InputLabel id={`gateway-label-${gateway.id}`}>
                    Select Payment Gateway
                  </InputLabel>
                  <Select
                    labelId={`gateway-label-${gateway.id}`}
                    value={gateway.gateway}
                    label="Select Payment Gateway"
                    onChange={(e) =>
                      handleGatewayChange(gateway.id, "gateway", e.target.value)
                    }
                  >
                    {gatewayOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors[`${gateway.id}-gateway`] && (
                    <FormHelperText>{errors[`${gateway.id}-gateway`]}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Merchant ID"
                  value={gateway.merchantId}
                  onChange={(e) =>
                    handleGatewayChange(
                      gateway.id,
                      "merchantId",
                      e.target.value
                    )
                  }
                  error={!!errors[`${gateway.id}-merchantId`]}
                  helperText={errors[`${gateway.id}-merchantId`]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Merchant Key"
                  value={gateway.merchantKey}
                  onChange={(e) =>
                    handleGatewayChange(
                      gateway.id,
                      "merchantKey",
                      e.target.value
                    )
                  }
                  error={!!errors[`${gateway.id}-merchantKey`]}
                  helperText={errors[`${gateway.id}-merchantKey`]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Channel ID"
                  value={gateway.channelId}
                  onChange={(e) =>
                    handleGatewayChange(gateway.id, "channelId", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Industry ID"
                  value={gateway.industryId}
                  onChange={(e) =>
                    handleGatewayChange(
                      gateway.id,
                      "industryId",
                      e.target.value
                    )
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website For Web"
                  value={gateway.websiteWeb}
                  onChange={(e) =>
                    handleGatewayChange(
                      gateway.id,
                      "websiteWeb",
                      e.target.value
                    )
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website For App"
                  value={gateway.websiteApp}
                  onChange={(e) =>
                    handleGatewayChange(
                      gateway.id,
                      "websiteApp",
                      e.target.value
                    )
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl 
                  fullWidth 
                  required
                  error={!!errors[`${gateway.id}-mode`]}
                >
                  <InputLabel id={`mode-label-${gateway.id}`}>
                    Select A Mode
                  </InputLabel>
                  <Select
                    labelId={`mode-label-${gateway.id}`}
                    value={gateway.mode}
                    label="Select A Mode"
                    onChange={(e) =>
                      handleGatewayChange(gateway.id, "mode", e.target.value)
                    }
                  >
                    {modeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors[`${gateway.id}-mode`] && (
                    <FormHelperText>{errors[`${gateway.id}-mode`]}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={gateway.active}
                        onChange={(e) =>
                          handleGatewayChange(
                            gateway.id,
                            "active",
                            e.target.checked
                          )
                        }
                        color="primary"
                      />
                    }
                    label="Active"
                  />

                  {paymentGateways.length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveGateway(gateway.id)}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={handleSkip}>Skip</Button>
        <Box>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={handleBack}>
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

export default SchoolPaymentType;
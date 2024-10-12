import CustomButton from "@/components/CommonButton/CustomButton";
import {
  AddConfigsFeeGrpMaster,
  GetConfigsIdFeeGrpMaster,
  GetConfigsListFee,
  updateConfigsFeeGrpMaster,
} from "@/services/api";
import {
  GetAssignById,
  addAssignTeacherList,
  updateAssignList,
} from "@/services/Attendance";
import Config from "@/utilities/Config";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const CreateConfigModal = ({ open, handleClose, selectedItem }) => {
  const names = [];
  const [classSectionName, setClassSectionName] = useState([]);
  const [feeGroupSelect, setfeeGroupSelect] = useState();
  const [feeAccountSelect, setfeeAccountSelect] = useState();
  const [feeStreamSelect, setfeeStreamSelect] = useState();

  const submitHandler = async () => {
    const payload = {
      class_section: classSectionName,
      fee_group: feeGroupSelect,
      account: feeAccountSelect,
      stream: feeStreamSelect,
    };

    try {
      if (!selectedItem?._id) {
        await AddConfigsFeeGrpMaster(payload);
      } else {
        await updateConfigsFeeGrpMaster({ ...payload, id: selectedItem._id });
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const { data: AssignData, refetch: AssignRefetch } = useQuery(
    "GetHolidayById",
    async () => {
      if (!selectedItem?._id) return null;
      const res = await GetConfigsIdFeeGrpMaster(selectedItem._id);
      return res?.data;
    },
    {
      enabled: !!selectedItem?._id,
    }
  );

  const {
    data: configData,
    isLoading: classLoading,
    refetch: classRefetch,
  } = useQuery("getFeeGroupList", async () => {
    const payload = { type: ["FeeGroup", "Account", "Stream"] };
    const res = await GetConfigsListFee(payload);
    return res?.data;
  });

  console.log(configData,'----configData')

  useEffect(() => {
    if (selectedItem?._id) {
      AssignRefetch();
    }
  }, [selectedItem?._id]);

  useEffect(() => {
    if (selectedItem?._id) {
      if (AssignData) {
        console.log("Fetched Holiday Data:", AssignData);
        setClassSectionName(AssignData?.class_section || []);

        // setRemark(AssignData?.remark || "");
      }
    } else {
      // Reset to initial state when selectedItem?._id is undefined
      setClassSectionName([]);
      // setRemark("");
    }
  }, [AssignData, selectedItem?._id]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClassSectionName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  Config.ClassList.forEach((classItem) => {
    Config.SectionList.forEach((sectionItem) => {
      names.push(`${classItem.value}-${sectionItem.value}`);
    });
  });
  const ITEM_HEIGHT = 90;
  const ITEM_PADDING_TOP = -10;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const FeeGroup = [{ label: "iii-v", id: 1 }];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      width={"800px"}
    >
      <Box sx={style}>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Fee Group </InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={feeGroupSelect}
            label="Selected Status"
            onChange={(e) => setfeeGroupSelect(e.target.value)}
          >
            {configData?.FeeGroup?.map((item, ind) => (
              <MenuItem key={ind} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="my-3" sx={{ my: 1.5 }}>
          <InputLabel id="status-select-label">Account</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={feeAccountSelect}
            label="Selected Status"
            onChange={(e) => setfeeAccountSelect(e.target.value)}
          >
            {configData?.Account?.map((item, ind) => (
              <MenuItem key={ind} value={item._id}>
                {item.feeAccount}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Stream</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={feeStreamSelect}
            label="Selected Status"
            onChange={(e) => setfeeStreamSelect(e.target.value)}
          >
           {configData?.Stream?.map((item, ind) => (
              <MenuItem key={ind} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 2 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Select Class and Section
          </InputLabel>

          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={classSectionName}
            onChange={handleChange}
            input={<OutlinedInput label="Select Class and Section" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={classSectionName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid className="flex justify-end mt-6">
          <CustomButton onClick={submitHandler} variant="contained">
            {!selectedItem?._id ? "Submit" : "Update"}
          </CustomButton>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CreateConfigModal;

import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import Config from "@/utilities/Config";

// SectionSelection Component
const SectionSelection = ({ selectSection, setSelectSection }) => {
    return (
      <FormControl fullWidth>
        <InputLabel id="section-select-label">Selected Section</InputLabel>
        <Select
          labelId="section-select-label"
          id="section-select"
          value={selectSection}
          label="Selected Section"
          onChange={(e) => setSelectSection(e?.target?.value)}
        >
          {Config?.SectionList.map((item, index) => (
            <MenuItem key={index} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  SectionSelection.propTypes = {
    selectSection: PropTypes.string.isRequired,
    setSelectSection: PropTypes.func.isRequired,
  };

// StatusSelection Component
const StatusSelection = ({ selectStatus, setSelectStatus }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="status-select-label">Selected Status</InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        value={selectStatus}
        label="Selected Status"
        onChange={(e) => setSelectStatus(e.target.value)}
      >
        {Config.followupStatus.map((item, ind) => (
          <MenuItem key={ind} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

StatusSelection.propTypes = {
  selectStatus: PropTypes.string.isRequired,
  setSelectStatus: PropTypes.func.isRequired,
};

// ClassSelection Component
const ClassSelection = ({ selectClass, setSelectClass, classList }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="class-select-label">Selected Class</InputLabel>
      <Select
        labelId="class-select-label"
        id="class-select"
        value={selectClass}
        label="Selected Class"
        onChange={(e) => setSelectClass(e.target.value)}
      >
        {Config.ClassList.map((item, index) => (
          <MenuItem key={index} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

ClassSelection.propTypes = {
  selectClass: PropTypes.string.isRequired,
  setSelectClass: PropTypes.func.isRequired,
  classList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export { ClassSelection, SectionSelection, StatusSelection };

"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  CircularProgress,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  AddAgeCriteria,
  GetAgeCriteriaId,
  GetStudentLsit,
  updateAgeCriteria,
} from "@/services/api";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import SimpleModal from "@/components/Modal/SimpleModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import * as Yup from "yup";
import Config from "@/utilities/Config";
import { addHolidayList } from "@/services/Attendance";
import dayjs from "dayjs";
import CustomButton from "@/components/CommonButton/CustomButton";

const AgeCriteria = () => {
  const [folloeupModeModal, setFolloeupModeModal] = useState(false);
  const router = useRouter();

  const {
    data: studentData,
    status: studentStatus,
    isLoading: studentLoading,
    refetch: studentRefetch,
  } = useQuery("studentData", async () => {
    const res = await GetStudentLsit();
    console.log(res, "---sdf");
    return res?.data;
  });
  const handleclose = () => {
    setFolloeupModeModal(false);
  };
  const handleOpen = () => {
    setFolloeupModeModal(true);
  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
          <Grid item xs={12} sm={12} md={12} className="flex gap-2 justify-end">
            <Button variant="contained" onClick={handleOpen} size="large">
              Add Age Criteria
            </Button>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="left">Sl.No</StyledTableCell>
                  <StyledTableCell align="left">Class</StyledTableCell>
                  <StyledTableCell align="left">Session</StyledTableCell>
                  <StyledTableCell align="left">Min Birth Date</StyledTableCell>
                  <StyledTableCell align="left">Max Birth Date</StyledTableCell>
                  <StyledTableCell align="left">Comments</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {false ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : true ? (
                  <>
                    {[1, 1, 1, 1]?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
                        // selectedItem={selectedItem}
                      />
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        No Data Found
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>{" "}
      <RegStartModal open={folloeupModeModal} handleClose={handleclose} />
    </div>
  );
};

export default AgeCriteria;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails, index, router, selectedItem } =
    props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{"Nursary"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"2023"}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"01/07/2023"}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"01/07/2023"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "250px" }}>
          <Typography>{"Comments"}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "100px", gap: 2 }}>
          <Button variant="outlined">Edit</Button>
          <Button sx={{ marginLeft: "10px" }} variant="outlined" color="error">
            Delete
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

const RegStartModal = ({ open, handleClose, selectedItem }) => {
  const [selectClass, setselectClass] = useState()
  const [minDateBirth, setminDateBirth] = useState(dayjs(new Date()));
  const [maxDateBirth, setmaxDateBirth] = useState(dayjs(new Date()));
  const [session, setsession] = useState("");
  const [remark, setRemark] = useState("");

  const submitHandler = async () => {
    const payload = {
      from: minDateBirth,
      holiday_type: session,
      remark: remark,
    };
    if (value !== "single") {
      payload.to = maxDateBirth;
    }

    try {
      if (!selectedItem?._id) {
        await AddAgeCriteria(payload);
      } else {
        await updateAgeCriteria({ ...payload, id: selectedItem._id });
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const { data: HolidayData, refetch: HolidayRefetch } = useQuery(
    "GetAgeCriteriaById",
    async () => {
      if (!selectedItem?._id) return null;
      const res = await GetAgeCriteriaId(selectedItem._id);
      return res?.data;
    },
    {
      enabled: !!selectedItem?._id,
    }
  );

  useEffect(() => {
    if (selectedItem?._id) {
      HolidayRefetch();
    }
  }, [selectedItem?._id]);

  useEffect(() => {
    if (selectedItem?._id) {
      if (HolidayData) {
        console.log("Fetched Holiday Data:", HolidayData);
        setminDateBirth(
          HolidayData?.from ? dayjs(HolidayData?.from) : dayjs(new Date())
        );
        setmaxDateBirth(HolidayData?.to ? dayjs(HolidayData?.to) : dayjs(new Date()));
        setsession(HolidayData?.holiday_type || "");
        setRemark(HolidayData?.remark || "");
      }
    } else {
      // Reset to initial state when selectedItem?._id is undefined
      setminDateBirth(dayjs(new Date()));
      setmaxDateBirth(dayjs(new Date()));
      setsession("");
      setRemark("");
    }
  }, [HolidayData, selectedItem?._id]);

  return (
    <SimpleModal open={open} handleClose={handleClose}>
      <Typography variant="h5">Age Criteria</Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="holiday-type-label">Class</InputLabel>
            <Select
              labelId="holiday-type-label"
              id="holiday-type"
              value={session}
              label="Class"
              onChange={(e) => setsession(e.target.value)}
            >
              {Config?.ClassList.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={6} className="">
          <DatePicker
            label={"Min Birth Date"}
            value={minDateBirth}
            className="w-full"
            onChange={(newValue) => setminDateBirth(newValue)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="">
          <DatePicker
            label="Max Birth Date"
            value={maxDateBirth}
            className="w-full"
            fullWidth
            onChange={(newValue) => setmaxDateBirth(newValue)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="holiday-type-label">Class</InputLabel>
            <Select
              labelId="holiday-type-label"
              id="holiday-type"
              value={session}
              label="Class"
              onChange={(e) => setsession(e.target.value)}
            >
              {Config?.ClassList.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="remark"
            label="Remark"
            fullWidth
            value={remark}
            variant="outlined"
            onChange={(e) => setRemark(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className="flex justify-end">
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            // disabled={isSubmitting}
          >
            Submit
          </CustomButton>
        </Grid>
      </Grid>
    </SimpleModal>
  );
};

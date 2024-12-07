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
  DeleteAgeCriteriaId,
  GetAgeCriteriaId,
  GetAgeCriteriaList,
  updateAgeCriteria,
} from "@/services/api";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import SimpleModal from "@/components/Modal/SimpleModal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Config from "@/utilities/Config";
import dayjs from "dayjs";
import CustomButton from "@/components/CommonButton/CustomButton";
import { toast } from "react-toastify";
import moment from "moment";

const AgeCriteria = () => {
  const [ageCriteriaModalOpen, setAgeCriteriaModal] = useState(false);
  const router = useRouter();
  const [selectedRow, setselectedRow] = useState("");

  const {
    data: ageCriteriaData,
    isLoading: ageCriteriaLoading,
    refetch: ageCriteriaRefetch,
  } = useQuery("ageCriteria", async () => {
    const res = await GetAgeCriteriaList();
    return res?.data;
  });
  const handleclose = () => {
    setAgeCriteriaModal(false);
    ageCriteriaRefetch();
  };
  const handleOpen = () => {
    setAgeCriteriaModal(true);
    setselectedRow("");
  };

  const deleteAgeCriteria = async (id) => {
    alert("Are You sure you want to delete");
    try {
      const res = await DeleteAgeCriteriaId(id);
      if (res?.success) {
        ageCriteriaRefetch();
        toast.success("Successfully Deleted...");
      }
    } catch (error) {}
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
                {ageCriteriaLoading ? (
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
                ) : ageCriteriaData?.length > 0 ? (
                  <>
                    {ageCriteriaData?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
                        deleteAgeCriteria={deleteAgeCriteria}
                        setselectedRow={setselectedRow}
                        setAgeCriteriaModal={setAgeCriteriaModal}
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
      <AgeCriteriaModal
        open={ageCriteriaModalOpen}
        handleClose={handleclose}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default AgeCriteria;

const Row = (props) => {
  const { row, index, deleteAgeCriteria, setselectedRow, setAgeCriteriaModal } =
    props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            fontWeight: "600",
            color: "#000",
            // overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{row?.class}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.session}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.min_birth_date).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.max_birt_date).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "250px" }}>
          <Typography>{row?.remark}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "100px", gap: 2 }}>
          <Button
            onClick={() => {
              setselectedRow(row);
              setAgeCriteriaModal(true);
            }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteAgeCriteria(row?._id)}
            sx={{ marginLeft: "10px" }}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

const AgeCriteriaModal = ({ open, handleClose, selectedRow }) => {
  const [selectClass, setselectClass] = useState();
  const [minDateBirth, setminDateBirth] = useState(dayjs(new Date()));
  const [maxDateBirth, setmaxDateBirth] = useState(dayjs(new Date()));
  const [session, setsession] = useState("");
  const [remark, setRemark] = useState("");

  const submitHandler = async () => {
    const payload = {
      class: selectClass,
      min_birth_date: minDateBirth,
      max_birt_date: maxDateBirth,
      session: session,
      remark: remark,
    };

    try {
      if (!selectedRow?._id) {
        await AddAgeCriteria(payload);
        toast.success("Age Criteria Successfully Added");
      } else {
        await updateAgeCriteria({ ...payload, id: selectedRow._id });
        toast.success("Age Criteria Successfully Updated");
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const { data: HolidayData, refetch: HolidayRefetch } = useQuery(
    "GetAgeCriteriaById",
    async () => {
      if (!selectedRow?._id) return null;
      const res = await GetAgeCriteriaId(selectedRow._id);
      return res?.data;
    },
    {
      enabled: !!selectedRow?._id,
    }
  );

  useEffect(() => {
    if (selectedRow?._id) {
      HolidayRefetch();
    }
  }, [selectedRow?._id]);

  useEffect(() => {
    if (selectedRow?._id) {
      setminDateBirth(
        selectedRow?.min_birth_date
          ? dayjs(selectedRow?.min_birth_date)
          : dayjs(new Date())
      );
      setmaxDateBirth(
        selectedRow?.max_birt_date
          ? dayjs(selectedRow?.max_birt_date)
          : dayjs(new Date())
      );
      setsession(selectedRow?.session || "");
      setRemark(selectedRow?.remark || "");
      setselectClass(selectedRow?.class || "");
    } else {
      // Reset to initial state when selectedRow?._id is undefined
      setminDateBirth(dayjs(new Date()));
      setmaxDateBirth(dayjs(new Date()));
      setsession("");
      setRemark("");
      setselectClass("");
    }
  }, [HolidayData, selectedRow?._id]);

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
              value={selectClass}
              label="Class"
              onChange={(e) => setselectClass(e.target.value)}
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
            <InputLabel id="holiday-type-label">Session</InputLabel>
            <Select
              labelId="holiday-type-label"
              id="holiday-type"
              value={session}
              label="Session"
              onChange={(e) => setsession(e.target.value)}
            >
              {Config?.joiningYear.map((item) => (
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
            onClick={submitHandler}
          >
            Submit
          </CustomButton>
        </Grid>
      </Grid>
    </SimpleModal>
  );
};

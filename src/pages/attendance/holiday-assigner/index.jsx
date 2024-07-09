import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
  TextField,
} from "@mui/material";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { GetStudentLsit } from "@/services/api";
import { useQuery } from "react-query";
import CustomButton from "@/components/CommonButton/CustomButton";
import AssignTeacherModal from "./Modal";
import QuickSearchToolbar from "@/components/SearchBar";
import HolidayAssignModal from "./Modal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DeleteHolidayById, getHolidayList } from "@/services/Attendance";
import moment from "moment";
import { ErrorMessage } from "formik";

const initialData = [
  { id: 1, userId: "adm", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 2, userId: "SCHOOLADMIN_1", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 3, userId: "ANAND.TIWARI", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 4, userId: "ABIR.MUKHERJEE", classSec: "X-A" },
];

const HolidayAssigner = () => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSlectedItem] = useState();
  const [date, setDate] = useState(dayjs(new Date()));
  const updateAttahdance = (item) => {
    setOpen(true);
    setSlectedItem(item);
  };

  const {
    data: HolidayData,
    status: HolidayStatus,
    isLoading: HolidayLoading,
    refetch: HolidayRefetch,
  } = useQuery("getHolidayList", async () => {
    const payload = {};
    (payload.page = 1), (payload.limit = 100);
    // (payload.q = searchText),
    // (payload.classNumber = selectClass),
    // (payload.section = selectSection),
    // (payload.status = selectStatus);

    const res = await getHolidayList(payload);
    return res?.data;
  });

  useEffect(() => {
    HolidayRefetch();
  }, [open]);

  const deleteHoliday = async (id) => {
    alert("Are You sure you want to delete");
    try {
      await DeleteHolidayById(id);
      HolidayRefetch();
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* <QuickSearchToolbar
              onChange={(event) => setSearchText(event.target.value)}
              isTeamMember="Search by Name"
              value={searchText}
              fullWidth
              rootSx={{ p: 0, pb: 0, marginLeft: 0, width: "300px" }}
              variant="outlined"
            /> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker", "DatePicker"]}
              >
                <DatePicker
                  label={'"month" and "year"'}
                  views={["month", "year"]}
                />
              </DemoContainer>
            </LocalizationProvider> */}
            <DatePicker
              label="Date Of Birth"
              value={date}
              views={["month", "year"]}
              fullWidth
              className="w-[20%]"
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  // required
                  error={false}
                  helperText={<ErrorMessage name="dob" />}
                />
              )}
            />
            <CustomButton
              onClick={() => {
                setOpen(true);
                setSlectedItem();
              }}
              sx={{ marginRight: "10px" }}
              variant="outlined"
              color="success"
              width={"170px"}
              py={2}
            >
              Add Holiday
            </CustomButton>
          </div>

          <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow style={{ fontWeight: "500", color: "#000" }}>
                    <StyledTableCell align="center">Sl.No</StyledTableCell>
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="left">Type</StyledTableCell>
                    <StyledTableCell align="left">Remark</StyledTableCell>
                    <StyledTableCell align="left">Class-Sec</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  style={{
                    height: "auto",
                    position: "relative",
                  }}
                >
                  {HolidayLoading ? (
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
                  ) : HolidayData?.length > 0 ? (
                    <>
                      {HolidayData?.map((row, index) => (
                        <Row
                          key={index}
                          row={row}
                          index={index}
                          updateAttahdance={updateAttahdance}
                          deleteHoliday={deleteHoliday}
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
            <div className="mt-10" />
          </Paper>
        </div>
      </div>
      <HolidayAssignModal
        open={open}
        handleClose={() => setOpen(false)}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default HolidayAssigner;
const Row = (props) => {
  const { index, row, updateAttahdance, deleteHoliday } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            // background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "10px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{moment(row?.from).format("DD-MM-YYYY")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>
            {row?.holiday_type === "1" ? "Holiday" : "Working"}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.remark}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "400px" }}>
          <Typography>{row?.class_section}</Typography>
        </StyledTableCell>

        <StyledTableCell
          align="left"
          style={{
            minWidth: "200px",
            gap: 5,
            display: "flex",
            // marginTop: "30px",
          }}
        >
          <CustomButton
            onClick={() => updateAttahdance(row)}
            sx={{ marginRight: "10px" }}
            variant="outlined"
            color="success"
            width={"70px"}
            py={2}
          >
            Edit
          </CustomButton>

          <Button
            onClick={() => deleteHoliday(row?._id)}
            variant="outlined"
            color="error"
            className="my-3"
          >
            Delete
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

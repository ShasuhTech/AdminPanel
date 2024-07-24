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
import { DeleteFollowUpById, getHolidayList } from "@/services/Attendance";
import moment from "moment";
import { ErrorMessage } from "formik";

const initialData = [
  { id: 1, userId: "adm", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 2, userId: "SCHOOLADMIN_1", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 3, userId: "ANAND.TIWARI", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 4, userId: "ABIR.MUKHERJEE", classSec: "X-A" },
];

const FollowUpMode = () => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSlectedItem] = useState();
  const [date, setDate] = useState(dayjs(new Date()));
  const updateFollowUp = (item) => {
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

  const deleteFollowUp = async (id) => {
    alert("Are You sure you want to delete");
    try {
      await DeleteFollowUpById(id);
      HolidayRefetch();
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-end gap-4 mb-4">
           
            
            <CustomButton
              onClick={() => {
                setOpen(true);
                setSlectedItem();
              }}
              sx={{ marginRight: "10px" }}
              variant="outlined"
              color="success"
              width={"200px"}
              py={2}
            >
              Add FollowUp Mode
            </CustomButton>
          </div>

          <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow style={{ fontWeight: "500", color: "#000" }}>
                    <StyledTableCell align="center">Sl.No</StyledTableCell>
                    <StyledTableCell align="left">FollowUp</StyledTableCell>
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
                          updateFollowUp={updateFollowUp}
                          deleteFollowUp={deleteFollowUp}
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

export default FollowUpMode;
const Row = (props) => {
  const { index, row, updateFollowUp, deleteFollowUp } = props;

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
        <StyledTableCell align="center" style={{ minWidth: "50px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
       
        <StyledTableCell align="left" style={{ minWidth: "750px" }}>
          <Typography>{'Phone'}</Typography>
        </StyledTableCell>
        <StyledTableCell
          align="center"
          style={{
            minWidth: "200px",
            gap: 5,
            display: "flex",
            // marginTop: "30px",
          }}
        >
          <CustomButton
            onClick={() => updateFollowUp(row)}
            sx={{ marginRight: "10px" }}
            variant="outlined"
            color="success"
            width={"70px"}
            py={2}
          >
            Edit
          </CustomButton>

          <Button
            onClick={() => deleteFollowUp(row?._id)}
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

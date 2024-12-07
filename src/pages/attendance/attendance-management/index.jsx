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
} from "@mui/material";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { GetStudentLsit } from "@/services/api";
import { useQuery } from "react-query";
import CustomButton from "@/components/CommonButton/CustomButton";
import AssignTeacherModal from "./Modal";
import QuickSearchToolbar from "@/components/SearchBar";
import { DeleteAssignById, getAssignList } from "@/services/Attendance";

const initialData = [
  { id: 1, userId: "adm", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 2, userId: "SCHOOLADMIN_1", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 3, userId: "ANAND.TIWARI", classSec: "I-A, IV-C, VII-F, XI-FPN..." },
  { id: 4, userId: "ABIR.MUKHERJEE", classSec: "X-A" },
];

const AttendanceManagement = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSlectedItem] = useState();

  const updateAssignTeacher = (item) => {
    setOpen(true);
    setSlectedItem(item);
  };

  const {
    data: AssignData,
    status: AssignStatus,
    isLoading: AssignLoading,
    refetch: AssignRefetch,
  } = useQuery("getAssignList", async () => {
    const payload = {};
    (payload.page = 1), (payload.limit = 100);
    // (payload.q = searchText),
    // (payload.classNumber = selectClass),
    // (payload.section = selectSection),
    // (payload.status = selectStatus);

    const res = await getAssignList(payload);
    return res?.data;
  });

  useEffect(() => {
    AssignRefetch();
  }, [open]);

  const deleteAssign = async (id) => {
    alert("Are You sure you want to delete");
    try {
      await DeleteAssignById(id);
      AssignRefetch();
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <QuickSearchToolbar
              onChange={(event) => setSearchText(event.target.value)}
              isTeamMember="Search by Name"
              value={searchText}
              fullWidth
              rootSx={{ p: 0, pb: 0, marginLeft: 0, width: "300px" }}
              variant="outlined"
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
              Assign Teacher
            </CustomButton>
          </div>

          <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow style={{ fontWeight: "500", color: "#000" }}>
                    <StyledTableCell align="center">Sl.No</StyledTableCell>
                    <StyledTableCell align="left">Teacher Name</StyledTableCell>
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
                  {AssignLoading ? (
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
                  ) : AssignData?.length > 0 ? (
                    <>
                      {AssignData?.map((row, index) => (
                        <Row
                          key={index}
                          row={row}
                          index={index}
                          updateAssignTeacher={updateAssignTeacher}
                          deleteAssign={deleteAssign}
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
      <AssignTeacherModal
        open={open}
        handleClose={() => setOpen(false)}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default AttendanceManagement;
const Row = (props) => {
  const { index, row, updateAssignTeacher, deleteAssign } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            // background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            // overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "10px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.teacher_id?.first_name}</Typography>
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
            onClick={() => updateAssignTeacher(row)}
            sx={{ marginRight: "10px" }}
            variant="outlined"
            color="success"
            width={"70px"}
            py={2}
          >
            Edit
          </CustomButton>

          <Button
            onClick={() => deleteAssign(row?._id)}
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

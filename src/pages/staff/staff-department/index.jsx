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
import { useQuery } from "react-query";
import CustomButton from "@/components/CommonButton/CustomButton";
import { DeleteDepartmentId, DeleteStaffDepartmentId, GetDepartmentList, GetStaffDepartmentList } from "@/services/api";
import { toast } from "react-toastify";
import StaffDepartmentModal from "./Modal";

const StaffDepartment = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSlectedItem] = useState();

  const updateStaffDepartment = (item) => {
    setOpen(true);
    setSlectedItem(item);
  };

  const {
    data: StaffDepartmentData,
    status: StaffDepartmentStatus,
    isLoading: StaffDepartmentLoading,
    refetch: StaffDepartmentRefetch,
  } = useQuery("GetDepartmentList", async () => {
    const payload = {};
    (payload.page = 1), (payload.limit = 100);
    const res = await GetDepartmentList(payload);
    return res?.data;
  });

  useEffect(() => {
    StaffDepartmentRefetch();
  }, [open]);

  const deleteStaffDepartment = async (id) => {
    alert("Are You sure you want to delete");
    try {
      const res = await DeleteDepartmentId(id);
      if (res.success) {
        toast.success("Successfully Deleted...");
        StaffDepartmentRefetch();
      }
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
                setSlectedItem("");
              }}
              sx={{ marginRight: "10px" }}
              variant="outlined"
              color="success"
              width={"250px"}
              py={2}
            >
              Create Staff Department
            </CustomButton>
          </div>

          <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow style={{ fontWeight: "500", color: "#000" }}>
                    {/* <StyledTableCell align="center">Sl.No</StyledTableCell> */}
                    <StyledTableCell align="left">
                      Staff Department
                    </StyledTableCell>
                    <StyledTableCell align="left">Priority</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  style={{
                    height: "auto",
                    position: "relative",
                  }}
                >
                  {StaffDepartmentLoading ? (
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
                  ) : StaffDepartmentData?.length > 0 ? (
                    <>
                      {StaffDepartmentData?.map((row, index) => (
                        <Row
                          key={index}
                          row={row}
                          index={index}
                          updateStaffDepartment={updateStaffDepartment}
                          deleteStaffDepartment={deleteStaffDepartment}
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
      <StaffDepartmentModal
        open={open}
        handleClose={() => setOpen(false)}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default StaffDepartment;
const Row = (props) => {
  const { index, row, updateStaffDepartment, deleteStaffDepartment } = props;

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
        {/* <StyledTableCell align="center" style={{ minWidth: "50px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell> */}

        <StyledTableCell align="left" style={{ minWidth: "600px" }}>
          <Typography>{row?.name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "200px" }}>
          <Typography>{index + 1}</Typography>
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
            onClick={() => updateStaffDepartment(row)}
            sx={{ marginRight: "10px" }}
            variant="outlined"
            color="success"
            width={"70px"}
            py={2}
          >
            Edit
          </CustomButton>

          <Button
            onClick={() => deleteStaffDepartment(row?._id)}
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

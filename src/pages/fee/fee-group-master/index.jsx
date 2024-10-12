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
import CreateConfigModal from "./Modal";
import {
  DeleteConfigsId,
  DeleteConfigsIdFee,
  DeleteConfigsIdFeeAccount,
  DeleteConfigsIdFeeGrpMaster,
  GetConfigsListFee,
  GetConfigsListFeeAccount,
  GetConfigsListFeeGrpMaster,
} from "@/services/api";

const FeeGroupMaster = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    data: classData,
    isLoading: classLoading,
    refetch: classRefetch,
  } = useQuery("abc", async () => {
    const res = await GetConfigsListFeeGrpMaster();
    return res?.data;
  });

  useEffect(() => {
    if (open === false) classRefetch();
  }, [open, classRefetch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await DeleteConfigsIdFeeGrpMaster(id);
        classRefetch();
      } catch (error) {
        console.error("Failed to delete...:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-end gap-4 mb-4">
            <CustomButton
              onClick={() => {
                setSelectedItem(null);
                setOpen(true);
              }}
              sx={{ marginRight: "10px" }}
              variant="outlined"
              color="success"
              width="170px"
              py={2}
            >
              Fee Group
            </CustomButton>
          </div>

          <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10,justifyContent:'space-between' }}>
            <TableContainer>
              <Table aria-label="house table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Sl.No</StyledTableCell>
                    <StyledTableCell align="left">Fee Group</StyledTableCell>
                    <StyledTableCell align="left">Account</StyledTableCell>
                    <StyledTableCell align="left">Stream</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classLoading ? (
                    <LoadingRow />
                  ) : classData?.length ? (
                    classData.map((row, index) => (
                      <Row
                        key={row._id}
                        row={row}
                        index={index}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <NoDataRow />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>

      <CreateConfigModal
        open={open}
        handleClose={() => setOpen(false)}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default FeeGroupMaster;

const Row = ({ index, row, handleEdit, handleDelete }) => (
  <TableRow
    sx={{ "& > *": { borderBottom: "unset", fontWeight: 600, color: "#000" } }}
  >
    <StyledTableCell width={'150px'}  align="center">{index + 1}</StyledTableCell>
    <StyledTableCell width={'350px'} align="left">{row?.feeAccount}</StyledTableCell>
    <StyledTableCell width={'350px'} align="left">{row?.reportHeader}</StyledTableCell>
    <StyledTableCell width={'350px'} align="left">{row?.reportHeader}</StyledTableCell>
    <StyledTableCell width={'200px'} align="center" sx={{ display: "flex", gap: 1,alignItems:'center' }}>
      <CustomButton
        onClick={() => handleEdit(row)}
        sx={{ marginRight: "10px" }}
        variant="outlined"
        color="success"
        width="70px"
        py={2}
      >
        Edit
      </CustomButton>
      <Button
        onClick={() => handleDelete(row?._id)}
        variant="outlined"
        color="error"
      >
        Delete
      </Button>
    </StyledTableCell>
  </TableRow>
);

const LoadingRow = () => (
  <TableRow>
    <TableCell colSpan={3} align="center">
      <div
        style={{
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    </TableCell>
  </TableRow>
);

const NoDataRow = () => (
  <TableRow>
    <TableCell colSpan={3} align="center">
      <div
        style={{
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No Data Found
      </div>
    </TableCell>
  </TableRow>
);

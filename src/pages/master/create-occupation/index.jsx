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
import { DeleteConfigsId, GetConfigsList } from "@/services/api";

const CreateCofigList = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSlectedItem] = useState();

  const updateClass = (item) => {
    setOpen(true);
    setSlectedItem(item);
  };

  const {
    data: classData,
    isLoading: classLoading,
    refetch: classRefetch,
  } = useQuery("getcountryList", async () => {
    const payload = {};
    payload.type = "Occupation";

    const res = await GetConfigsList(payload);
    return res?.data;
  });

  useEffect(() => {
    classRefetch();
  }, [open]);

  const deleteclass = async (id) => {
    alert("Are You sure you want to delete");
    try {
      await DeleteConfigsId(id);
      classRefetch();
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
              width={"170px"}
              py={2}
            >
              Add Occupation
            </CustomButton>
          </div>

          <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow style={{ fontWeight: "500", color: "#000" }}>
                    <StyledTableCell align="center">Sl.No</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  style={{
                    height: "auto",
                    position: "relative",
                  }}
                >
                  {classLoading ? (
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
                  ) : classData?.length > 0 ? (
                    <>
                      {classData?.map((row, index) => (
                        <Row
                          key={index}
                          row={row}
                          index={index}
                          updateClass={updateClass}
                          deleteclass={deleteclass}
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
      <CreateConfigModal
        open={open}
        handleClose={() => setOpen(false)}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default CreateCofigList;
const Row = (props) => {
  const { index, row, updateClass, deleteclass } = props;

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
        <StyledTableCell align="center" style={{ width: "100px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "700px" }}>
          <Typography>{row?.name}</Typography>
        </StyledTableCell>

        <StyledTableCell
          align="center"
          style={{
            minWidth: "100px",
            gap: 5,
            display: "flex",
            // marginTop: "30px",
          }}
        >
          <CustomButton
            onClick={() => updateClass(row)}
            sx={{ marginRight: "10px" }}
            variant="outlined"
            color="success"
            width={"70px"}
            py={2}
          >
            Edit
          </CustomButton>

          <Button
            onClick={() => deleteclass(row?._id)}
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

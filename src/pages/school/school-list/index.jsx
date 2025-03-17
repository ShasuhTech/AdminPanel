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
  Select,
  Button,
  InputLabel,
  Pagination,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import QuickSearchToolbar from "@/components/SearchBar";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FormControl from "@mui/material/FormControl";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { GetSchoolList, GetSchoolListDelete } from "@/services/School";
import { useQuery } from "react-query";
import AddSchoolModal from "@/components/School/AddSchool";
import { Edit } from "@mui/icons-material";
import { TrashCan } from "mdi-material-ui";
import { SlLogin } from "react-icons/sl";
import { MdLogin } from "react-icons/md";
import { TbFileDownload } from "react-icons/tb";
import { Tooltip } from "antd";
import { toast } from "react-toastify";

// Style for truncated text with ellipsis
const truncatedTextStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "150px", // Adjust based on your needs
  display: "block",
};
const pageSize = 10; // Items per page

const SchoolList = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [filterType, setFilterType] = useState(""); // To manage select filter type
  const [currentPage, setCurrentPage] = useState(1);
  // New state for delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const {
    data: schoolData,
    status: schoolStatus,
    isLoading: schoolLoading,
    refetch: schoolRefetch,
  } = useQuery(["schoolData", currentPage], async () => {
    const payload = { page: currentPage, limit: pageSize }; // Adjust payload if necessary
    const res = await GetSchoolList(payload);
    return res;
  });
  console.log(schoolData, "=schoolDataschoolData");
  const editHandler = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Modified to show confirmation dialog first
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  // Actual delete operation
  const confirmDelete = async () => {
    try {
      const resp = await GetSchoolListDelete(itemToDelete);
      console.log(resp, "=sdffew");
      if (resp?.success) {
        toast.success("Successfully Deleted");
        schoolRefetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Submission.");
    } finally {
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    schoolRefetch();
  }, [isModalOpen]);

  const handleFilterClick = () => {
    // Implement filtering logic
    schoolRefetch();
  };

  const handleSelectChange = (event) => {
    setFilterType(event.target.value);
    // Implement additional filtering logic here if needed
  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            padding: "10px 0px",
            alignItems: "center",
            background: "#FFF",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
          className="shadow-lg"
        >
          <Grid className="lg:flex px-2 justify-between  w-[100%]">
            <Grid className="lg:flex text-center items-center">
              <div>
                <QuickSearchToolbar
                  onChange={(event) => setSearchText(event.target.value)}
                  isTeamMember="Search by Customer name"
                  value={searchText}
                  rootSx={{ p: 0, pb: 0, marginLeft: 0, width: "300px" }}
                  variant="outlined"
                />
              </div>
              <div>
                <FormControl sx={{ width: "200px", mr: 2 }} size="large">
                  <InputLabel id="demo-simple-select-label">
                    Select Type
                  </InputLabel>

                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Select Type"
                    value={filterType}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={1}>All</MenuItem>
                    <MenuItem value={2}>Active</MenuItem>
                    <MenuItem value={3}>InActive</MenuItem>
                    <MenuItem value={4}>Pending</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button
                onClick={handleFilterClick}
                className="border p-2 rounded-lg"
              >
                <FilterAltIcon style={{ fontSize: "35px" }} />
              </button>
            </Grid>

            <Grid className="gap-2 lg:flex items-center text-center">
              <CustomButton
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedItem(null); // Reset selected item for new entry
                }}
              >
                <AddIcon />
                Add School
              </CustomButton>
            </Grid>
          </Grid>
        </div>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            boxShadow: 10,
            position: "relative",
          }}
        >
          <TableContainer
            sx={{
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "4px",
              },
            }}
          >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Id</StyledTableCell>
                  <StyledTableCell align="left">School Name</StyledTableCell>
                  <StyledTableCell align="left">School Address</StyledTableCell>
                  <StyledTableCell align="left">School Website</StyledTableCell>
                  <StyledTableCell align="left">Contact Name</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Phone No</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      position: "sticky",
                      right: 0,
                      backgroundColor: "#f5f5f5",
                      zIndex: 2,
                      borderLeft: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ height: "auto", position: "relative" }}>
                {schoolLoading ? (
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
                ) : schoolData?.data?.length > 0 ? (
                  <>
                    {schoolData?.data?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        editHandler={editHandler}
                        deleteHandler={handleDeleteClick}
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
          <TablePagination
            component="div"
            rowsPerPageOptions={[]} // Disable rowsPerPage selection
            count={schoolData?.totalCount || 0} // Assuming `totalItems` is the total number of records
            rowsPerPage={pageSize}
            page={currentPage - 1}
            onPageChange={(event, newPage) => setCurrentPage(newPage + 1)} // Convert zero-based index to 1-based
          />
        </Paper>
      </div>
      {isModalOpen && (
        <AddSchoolModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedItem}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this school? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Row = (props) => {
  const { row, editHandler, deleteHandler } = props;

  // Function to create truncated text with tooltip
  const TruncatedText = ({ text, maxWidth = "150px" }) => {
    const displayText = text || "N/A";

    return (
      <Tooltip title={displayText} placement="topLeft">
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: maxWidth,
            cursor: "pointer",
          }}
        >
          {displayText}
        </div>
      </Tooltip>
    );
  };

  // Format address
  const formatAddress = () => {
    const address = `${row?.address?.address || ""}, ${
      row?.address?.street || ""
    }, ${row?.address?.city || ""}`.replace(/^,|,$/g, "N/A");

    return address || "N/A";
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            fontWeight: "600",
            color: "#000",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "50px" }}>
          <Typography>{row?.id || 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <TruncatedText text={row?.school_name} maxWidth="140px" />
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <TruncatedText text={formatAddress() || "Na"} maxWidth="140px" />
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          {row?.website ? (
            <Tooltip title={row.website}>
              <a
                href={row.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500"
                style={{ ...truncatedTextStyle, display: "inline-block" }}
              >
                {row.website}
              </a>
            </Tooltip>
          ) : (
            "N/A"
          )}
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <TruncatedText text={row?.contact_person_name} maxWidth="140px" />
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <TruncatedText text={row?.email} maxWidth="140px" />
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{row?.phone || "N/A"}</Typography>
        </StyledTableCell>
        <StyledTableCell
          align="center"
          style={{
            minWidth: "150px",
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
          sx={{
            position: "sticky",
            right: 0,
            backgroundColor: "#fff",
            zIndex: 1,
            borderLeft: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <div className="flex justify-center items-center gap-2 ">
            <Tooltip title={"Edit/View"}>
              <Edit
                size={"30px"}
                onClick={() => editHandler(row)}
                className="cursor-pointer text-blue-500"
              />
            </Tooltip>
            <Tooltip title={"Delete"}>
              <TrashCan
                size={"25px"}
                onClick={() => deleteHandler(row?._id)}
                className="cursor-pointer text-red-500"
              />
            </Tooltip>

            <Tooltip title={"Migration"}>
              <TbFileDownload
                size={"27px"}
                className="cursor-pointer text-blue-500"
              />
            </Tooltip>
            <Tooltip title={"School Login"}>
              <MdLogin size={"25px"} className="cursor-pointer text-blue-500" />
            </Tooltip>
          </div>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default SchoolList;
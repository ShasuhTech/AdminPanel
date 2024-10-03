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
} from "@mui/material";
import QuickSearchToolbar from "@/components/SearchBar";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FormControl from "@mui/material/FormControl";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { GetSchoolList } from "@/services/School";
import AddSchoolModal from "@/components/School/AddSchool";
import { useQuery } from "react-query";

const SchoolList = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [filterType, setFilterType] = useState(""); // To manage select filter type

  const {
    data: schoolData,
    status: schoolStatus,
    isLoading: schoolLoading,
    refetch: schoolRefetch,
  } = useQuery("schoolData", async () => {
    const payload = {}; // Payload could be updated with filters
    const res = await GetSchoolList(payload);
    return res?.data;
  });

  const editHandler = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
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

              <img
                src={"/images/Export CSV.svg"}
                className="w-[103px] h-[40px] cursor-pointer mr-5"
                // onClick={csvHandler} // Implement csvHandler logic
              />
            </Grid>
          </Grid>
        </div>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Id</StyledTableCell>
                  <StyledTableCell align="left">School Name</StyledTableCell>
                  <StyledTableCell align="left">School Address</StyledTableCell>
                  <StyledTableCell align="left">School Website</StyledTableCell>
                  <StyledTableCell align="left">
                    Contact Person Name
                  </StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Phone No</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
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
                ) : schoolData?.length > 0 ? (
                  <>
                    {schoolData?.map((row, index) => (
                      <Row key={index} row={row} editHandler={editHandler} />
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
      </div>
      <AddSchoolModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedItem}
      />
    </div>
  );
};

const Row = (props) => {
  const { row, editHandler } = props;

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
        <StyledTableCell align="left" style={{ minWidth: "200px" }}>
          <Typography>{row?.school_name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "200px" }}>
          <Typography>
            {row?.address?.address +
              "," +
              row?.address?.street +
              "," +
              row?.address?.city}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>
            <a
              href={row?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500"
            >
              {row?.website}
            </a>
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.contact_person_name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{row?.email}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{row?.phone}</Typography>
        </StyledTableCell>
        <StyledTableCell
          align="center"
          style={{
            minWidth: "150px",
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          <CustomButton width={80} py={2} onClick={() => editHandler(row)}>
            Edit
          </CustomButton>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default SchoolList;

"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
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
  Box,
  Autocomplete,
  Pagination,
  Radio,
  TablePagination,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { addServices, adminCategory, serviceList } from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { Close } from "mdi-material-ui";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/FilterButton";
import ResetButton from "@/components/CommonButton/ResetButton";
import FormControl from "@mui/material/FormControl";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
const AddServiceModal = ({
  open,
  onClose,
  onSubmit,
  data,
  errorMsg,
  setSelectedValue,
  selectedValue,
}) => {
  const [name, setName] = useState("");
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errorMsg1, setErrorMsg1] = useState("");

  const handleChangeMinTime = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, '');
    setMinTime(sanitizedValue);
    if (sanitizedValue.length > 3) {
      setErrorMsg1("Min Time must be 3 or fewer digits");
    } else {
      setErrorMsg1("");
    }
  };

  const handleChangeMaxTime = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, '');
    setMaxTime(sanitizedValue);
    if (sanitizedValue.length > 3) {
      setErrorMsg1("Max Time must be 3 or fewer digits");
    } else {
      setErrorMsg1("");
    }
  };

  const handleChangedec = (e) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
    if (inputValue.length > 249) {
      setErrorMsg1("Description must be less than 250 characters");
    } else {
      setErrorMsg1("");
    }
  };

  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };
  const [searchValue, setsearchValue] = useState(`${""}`);

  const handleSubmit = () => {
    onSubmit({ name, description, categoryId, minTime, maxTime });
  };
  const handleClose = () => {
    setName("");
    setDescription("");
    setCategoryId("");
    onClose();
    setMinTime("");
    setMaxTime("");
  };

  const handleChangeRadion = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setCategoryId("");
      setMinTime("");
      setMaxTime("");
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-service-modal-title"
      aria-describedby="add-service-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Grid className=" lg:w-[600px] w-[300px] h -[100%]">
          <Grid className="flex justify-between items-center text-center">
            <Typography
              variant="h5"
              fontWeight={"bold"}
              id="add-service-modal-title"
              gutterBottom
            >
              Add Service
            </Typography>
            <Grid
              onClick={handleClose}
              className="absolute  right-4 cursor-pointer font-bold top-3"
            >
              <Close />
            </Grid>
          </Grid>
          <Typography variant="h5" fontWeight={"bold"} fontSize={15} mt={2}>
            Select Gender
          </Typography>
          {
            <Box sx={{ display: "flex", gap: 2 }}>
              <Grid className="flex text-center items-center">
                <Typography>Female</Typography>
                <Radio
                  checked={selectedValue === "2"}
                  onChange={handleChangeRadion}
                  value="2"
                  name="radio-buttons"
                  slotProps={{ input: { "aria-label": "2" } }}
                />
              </Grid>
              <Grid className="flex text-center items-center">
                <Typography>Male</Typography>
                <Radio
                  checked={selectedValue === "1"}
                  onChange={handleChangeRadion}
                  value="1"
                  name="radio-buttons"
                  slotProps={{ input: { "aria-label": "1" } }}
                />
              </Grid>
            </Box>
          }
          <Box sx={{ minWidth: "100%" }}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              margin="normal"
              // helperText={errorMsg?.name[0] || ""}
              FormHelperTextProps={{
                style: {
                  color: "red", // Change text color to red
                },
              }}
            />
            {errorMsg?.name?.length > 0 && errorMsg?.name[0] && (
              <Typography className="text-red-500 px-5">
                {errorMsg?.name[0] || ""}
              </Typography>
            )}
          </Box>
          <Box sx={{ minWidth: "100%", marginTop: "10px" }}>
            <Autocomplete
              id="combo-box-demo"
              onChange={(event, newValue) => {
                setCategoryId(newValue?.value);
              }}
              options={data}
              getOptionLabel={(option) => `${option?.key}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => setCategoryId(e?.target?.value)}
                  label="Select Category"
                  variant="outlined"
                  // InputLabelProps={{ shrink: false }}
                  style={{ fontSize: 30 }}
                />
              )}
            />
            {errorMsg?.categoryId?.length > 0 && errorMsg?.categoryId[0] && (
              <Typography className="text-red-500 px-5">
                {errorMsg?.categoryId[0] || ""}
              </Typography>
            )}
          </Box>
          <Box sx={{ minWidth: "100%" }}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={handleChangedec}
              variant="outlined"
              margin="normal"
              inputProps={{ maxLength: 250 }} // Limit maximum characters to 250
              FormHelperTextProps={{ style: { color: "red" } }}
            />
            {errorMsg?.desc?.length > 0 && errorMsg?.desc[0] && (
              <Typography className="text-red-500 px-5">
                {errorMsg?.desc[0] || ""}
              </Typography>
            )}
            {
              <Typography className="text-red-500 px-5">
                {errorMsg1 || ""}
              </Typography>
            }
          </Box>
          <Grid className="flex gap-4 justify-between">
            <Box sx={{ minWidth: "49%" }}>
              <TextField
                fullWidth
                label="Min Time (in Minutes)"
                value={minTime}
                onChange={handleChangeMinTime}
                variant="outlined"
                margin="normal"
                // helperText={errorMsg?.name[0] || ""}
                FormHelperTextProps={{
                  style: {
                    color: "red", // Change text color to red
                  },

                }}
                inputProps={{ maxLength: 3 }}
              />
              {errorMsg?.minTime?.length > 0 && errorMsg?.minTime[0] && (
                <Typography className="text-red-500 px-5">
                  {errorMsg?.minTime[0] || ""}
                </Typography>
              )}
            </Box>
            <Box sx={{ minWidth: "49%" }}>
              <TextField
                fullWidth
                label="Max Time (in Minutes)"
                value={maxTime}
                onChange={handleChangeMaxTime}
                variant="outlined"
                margin="normal"
                // helperText={errorMsg?.name[0] || ""}
                FormHelperTextProps={{
                  style: {
                    color: "red", // Change text color to red
                  },
                }}
                inputProps={{ maxLength: 3 }}
              />
              {errorMsg?.maxTime?.length > 0 && errorMsg?.maxTime[0] && (
                <Typography className="text-red-500 px-5">
                  {errorMsg?.maxTime[0] || ""}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid className="mt-[50px] text-right">
            <Button
              style={{
                padding: "10px 30px",
                fontWeight: "bold",
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={(setMaxTime === "", setMinTime === "")}

            >
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              style={{
                marginLeft: "10px",
                backgroundColor: "gray",
                padding: "10px 30px",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

const SalonService = () => {
  const [loading, setLoading] = useState(false);
  const [userSalonData, setUserSalonData] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [filter, setFilter] = useState({
    search: "",
    status: 2,
  });

  const initialFilterState = {
    search: "",
    status: 2,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page
  const [selectedValue, setSelectedValue] = useState("2");
  const [data, setCategorydata] = useState();
  const [gender, setGender] = useState(10);
  const [category, setCategory] = useState(10);
  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddService = async ({
    name,
    description,
    categoryId,
    minTime,
    maxTime,
  }) => {
    const payload = {
      name: name,
      desc: description,
      categoryId: categoryId,
      minTime: minTime,
      maxTime: maxTime,
      genderId: Number(selectedValue),
    };

    try {
      const response = await addServices(payload);
      if (response?.code === 200) {
        toast.success("Service added successfully");
        setIsModalOpen(false);
        getUserData({});
      }
      console.log("Service added successfully:", response.data);
    } catch (error) {
      setErrorMsg(error?.response?.data?.errors);
      console.error("Error adding service:", error);
    }
  };

  const getUserData = async (page) => {
    setLoading(true);
    try {
      const payload = {
        q: searchText,
        categoryId: category === 10 ? null : category,
        genderId: gender === 10 ? null : gender === 20 ? 1 : gender === 30 ? 2 : null,
        page,
        // status: filter?.status,
      };
      const res = await serviceList(payload);
      setPagination(res?.meta?.pagination);
      setUserSalonData(res?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  const csvHandler = async ({ page }) => {
    setLoading(true);
    try {
      const payload = {
        q: searchText,
        page,
        // status: filter?.status,
      };
      const res = await serviceList(payload);
      if (res?.code === 200) {
        exportToCSV(res?.data, "service_report.csv");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  const handleChangePage = (event, page) => {
    getUserData(page + 1);
    // setCurrentPage(page);
  };
  const getAdminCatByGender = async () => {
    const payload = { genderId: selectedValue };
    try {
      setLoading(true);
      const res = await adminCategory({ payload });
      setCategorydata(res?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  const getAdminCategoryByGender = async (selectedValue) => {
    const payload = { genderId: selectedValue };
    try {
      setLoading(true);
      const res = await adminCategory({ payload });
      setCategorydata(res?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };
  // const { data, status, isLoading, refetch } = useQuery(
  //   "adminCategory",
  //   async () => {
  //     const res = await adminCategory({ payload });
  //     return res?.data;
  //   }
  // );
  useEffect(() => {
    getUserData({});
  }, []);

  useEffect(() => {
    getAdminCatByGender();
  }, [selectedValue]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    getUserData({ page: 1 });
  };

  const handleResetFilter = () => {
    setFilter(initialFilterState);
    setSearchText("");
    window.location.reload();
  };

  const handleGenderChange = async (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    const genderId =
      selectedGender === 20 ? 1 : selectedGender === 30 ? 2 : null;
    if (selectedGender === 10) {
      setCategory(10);
    }
    if (genderId !== null) {
      await getAdminCategoryByGender(genderId);
      setCategory(10);
    }
    else {
      console.log("genderId is null")
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
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
            <Grid className="lg:flex gap-3 text-center items-center">
              <QuickSearchToolbar
                onChange={(event) => setSearchText(event.target.value)}
                isTeamMember="Search by Customer name"
                // width="100%"
                value={searchText}
                rootSx={{ p: 0, pb: 0, marginLeft: 0, width: "300px" }}
                variant="outlined"
                onFilterClick={handleFilterClick}
              />
              <FormControl sx={{ m: 1, width:'150px' }} size="small">
                {/* <InputLabel id="demo-select-small-label">Gender</InputLabel> */}
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={gender}
                  // label="Gender"
                  onChange={handleGenderChange}
                >
                  {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
                  <MenuItem value={10}>Select Gender</MenuItem>
                  <MenuItem value={20}>Male</MenuItem>
                  <MenuItem value={30}>Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: '150px' }} size="small" disabled={gender === 10}>
                {/* <InputLabel id="demo-select-small-label">Category</InputLabel> */}
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={category}
                  // label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value={10}>Select Category</MenuItem>
                  {data &&
                    data.map((category) => (
                      <MenuItem key={category?.value} value={category?.value}>
                        {category?.key}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* <IconButton onClick={handleFilterClick}>
                <SearchIcon />
              </IconButton> */}
                <button onClick={handleFilterClick} className="filter-btncuston">
              <FilterAltIcon />
            </button>
              {/* <CustomButton onClick={handleFilterClick}>Filter</CustomButton> */}
              {/* <ResetButton onClick={handleResetFilter} /> */}
            </Grid>
      
            <Grid className="gap-2 lg:flex  items-center text-center">
            <button onClick={handleOpenModal} className="addservices">
            <AddIcon />Add Services
            </button>
            {/* <button onClick={csvHandler} className="csvbtn">
            Export To Csv
            </button> */}
              {/* <CustomButton onClick={csvHandler}>Export To Csv</CustomButton> */}
              <img
              src={"/images/Export CSV.svg"}
              className="w-[103px] h-[40px] cursor-pointer mt-3 mb-auto mr-5"
              onClick={csvHandler}
            />
            </Grid>
          </Grid>
        </div>
        <AddServiceModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddService}
          data={data}
          errorMsg={errorMsg}
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
        />
        {/* <Button variant="outlined" onClick={handleOpenModal}>
                Add Service
              </Button> */}
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="left">Id</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Gender</StyledTableCell>
                  <StyledTableCell align="center">Min Time</StyledTableCell>
                  <StyledTableCell align="center">Max Time</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {loading ? (
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
                ) : userSalonData?.length > 0 ? (
                  <>
                    {userSalonData?.map((row, index) => (
                      <Row key={index} row={row} />
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
            rowsPerPageOptions={[]}
            count={pagination?.total || 0}
            rowsPerPage={15}
            page={pagination?.currentPage ? pagination?.currentPage - 1 : 0}
            onPageChange={handleChangePage}
          />
          {/* <Grid className="flex items-center justify-between my-3">
            <Typography variant="h6" fontWeight={"bold"} px={2}>
              Total Count:- {pagination?.total || 0}
            </Typography>
            <Pagination
              component="div"
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              boundaryCount={2} // Adjust as needed
              color="primary"
              showFirstButton
              showLastButton
              siblingCount={2} // Adjust as needed
            />
          </Grid> */}
        </Paper>
      </div>{" "}
    </div>
  );
};

export default SalonService;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
          },
        }}
      >
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.categoryText}</Typography>
        </StyledTableCell>
        <StyledTableCell
          align="left"
          style={{
            minWidth: "150px",
            maxWidth: "200px",
            wordWrap: "break-word",
          }}
        >
          <Typography>{row?.desc}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.gender}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.minTime}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.maxTime}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.statusText}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

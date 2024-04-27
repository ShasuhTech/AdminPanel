"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import axiosInstance from "@/utilities/configureAxios";

function BroadcastingNotificationModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [partnerChecked, setPartnerChecked] = useState(false);
  const [salonChecked, setSalonChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSalonData, setUserSalonData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [selectedSalonNames, setSelectedSalonNames] = useState([]);
  const [selectedSalonCount, setSelectedSalonCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; 


  const totalItems = pagination ? pagination.total : 0;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setSelectedSalonCount(selectedSalonNames.length);
  }, [selectedSalonNames]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle("");
    setDescription("");
    setPartnerChecked(false);
    setSalonChecked(false);
    setSelectedSalonNames([]);
    onClose();
  };

  const handleChangePage = (e, page) => {
    getUserData(page + 1);
    // setIsAllSelected(false);
  };

  const getUserData = async (page) => {
    setLoading(true);
    try {
      const payload = {};
      payload.q = "";
      payload.status = "";
      payload.page = page;
      const res = await axiosInstance.get(
        `admin/salon/list?q=&status=[5]&page=${page || ""}`
      );
      setPagination(res?.data?.meta?.pagination);
      setUserSalonData(res?.data?.data);
      setLoading(false);
      const isDataPresent = res.data.data.every((salon) =>
        selectedRows.includes(salon.id)
      );
      if (selectedRows.length === 0) {
        setSelectedRows(
          Array.from({ length: res?.data?.meta?.pagination?.total }).fill(null)
        );
      }
      if (isDataPresent) {
        setIsAllSelected(true);
      } else {
        setIsAllSelected(false);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  const handleSalonCheckboxChange = async (event) => {
    setSalonChecked(event.target.checked);
    if (event.target.checked) {
      await getUserData(1);
    } else {
      setUserSalonData([]);
      setPagination(null);
      setSelectedSalonNames([]);
    }
  };

  const handleSalonSelect = (id, name) => {
    if (selectedSalonNames.includes(name)) {
      setSelectedSalonNames(
        selectedSalonNames.filter((salonName) => salonName !== name)
      );
    } else {
      setSelectedSalonNames([...selectedSalonNames, name]);
    }
  };


  return (
    <Modal
      open={true}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className=""
        style={{
          padding: "20px",
          backgroundColor: "#FFF",
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <h2>Broadcast New Message</h2>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={partnerChecked}
                onChange={(e) => setPartnerChecked(e.target.checked)}
              />
            }
            label="Partner"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={salonChecked}
                onChange={handleSalonCheckboxChange}
              />
            }
            label="Salon"
          />
          {salonChecked && (
            <div>
              Selected Salon Count:{" "}
              {selectedRows.reduce((acc, curr) => (curr ? acc + 1 : acc), 0)}
            </div>
          )}
        </div>
        {/* {selectedSalonNames.map((name, index) => (
          <div key={index} style={{ display: "inline-block", margin: "5px" }}>
            {name}
          </div>
        ))} */}
        {salonChecked && (
          <PendingSalons
            loading={loading}
            userSalonData={userSalonData}
            pagination={pagination}
            handleChangePage={handleChangePage}
            onSalonSelect={handleSalonSelect}
            salonChecked={salonChecked}
            setSelectedSalonNames={setSelectedSalonNames}
            setIsAllSelected={setIsAllSelected}
            isAllSelected={isAllSelected}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" type="submit">
            Send Broadcast
          </Button>
        </form>
      </div>
    </Modal>
  );
}

const PendingSalons = ({
  loading,
  userSalonData,
  pagination,
  handleChangePage,
  onSalonSelect,
  salonChecked,
  setSelectedSalonNames,
  setIsAllSelected,
  isAllSelected,
  selectedRows,
  setSelectedRows,
}) => {
  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      const allSalonNames = userSalonData.map((row) => row.name);
      setIsAllSelected(true);
      setSelectedSalonNames((prevData) => [...prevData, ...allSalonNames]);
      setSelectedRows((prevData) => {
        const test = [...prevData, ...userSalonData.map((row) => row.id)];
        const newData = [...prevData];
        const index =
          pagination?.currentPage * pagination?.count - pagination?.count;
        newData.splice(index, pagination?.count);
        newData.splice(index, 0, ...userSalonData.map((row) => row.id));
        return newData;
      });
    } else {
      const nullData = Array.from({ length: pagination?.count }).fill(null);

      setSelectedSalonNames((prevData) => {
        const newData = [...prevData];
        const index =
          pagination?.currentPage * pagination?.count - pagination?.count;
        newData.splice(index, pagination?.count);
        newData.splice(index, 0, ...nullData);
        return newData;
      });
      setSelectedRows((prevData) => {
        const newData = [...prevData];
        const index =
          pagination?.currentPage * pagination?.count - pagination?.count;
        newData.splice(index, pagination?.count);
        newData.splice(index, 0, ...nullData);
        return newData;
      });
      setIsAllSelected(false);
    }
  };


  const handleRowSelect = (id, name, index) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(() => {
        const newData = [...selectedRows];
        const idx = newData.indexOf(id);
        newData[idx] = null;
        return newData;
      });
      onSalonSelect(id, name);
    } else {
      setSelectedRows((selectedRows) => {
        const idx = pagination.currentPage * pagination.count - pagination.count + index;
        const newData = [...selectedRows];
        newData[idx] = id;
        return newData;
      });
      onSalonSelect(id, name);
    }
  };

  return (
    <div
      className=""
      style={{ display: salonChecked ? "block" : "none", marginTop: "20px" }}
    >
      <Paper
        sx={{
          width: "100%",
          overflow: "scroll",
          boxShadow: 10,
          borderRadius: "10px",
        }}
      >
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ fontWeight: "500", color: "#000" }}>
                <TableCell>
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAllRows}
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < userSalonData.length
                    }
                  />
                </TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Contact Mobile Number</TableCell>
                <TableCell align="center">Brand Mobile Number</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Live Status</TableCell>
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
              ) : userSalonData.length > 0 ? (
                <>
                  {userSalonData.map((row, index) => (
                    <Row
                      key={index}
                      row={row}
                      onSelect={() => handleRowSelect(row.id, row.name, index)}
                      selectedRows={selectedRows}
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
          rowsPerPageOptions={[]}
          count={pagination?.total || 0}
          rowsPerPage={15}
          page={pagination?.currentPage ? pagination?.currentPage - 1 : 0}
          onPageChange={handleChangePage}
        />
      </Paper>
    </div>
  );
};

const Row = ({ row, onSelect, selectedRows }) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={selectedRows.includes(row.id)} onChange={onSelect} />
      </TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell align="center">{row.contactMobileNumber}</TableCell>
      <TableCell align="center">{row.brandMobileNumber}</TableCell>
      <TableCell>{row.typeText}</TableCell>
      <TableCell>{row.liveStatusText}</TableCell>
    </TableRow>
  );
};

export default BroadcastingNotificationModal;

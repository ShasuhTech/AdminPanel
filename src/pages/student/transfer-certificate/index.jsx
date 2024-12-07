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
  Button,
  Box,
  TextField,
} from "@mui/material";
import { GetStudentLsit } from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import moment from "moment";
import Config from "@/utilities/Config";
import {
  ClassSelection,
  SectionSelection,
  StatusSelection,
} from "@/components/ClassSelection";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import TransferCertificateModal from "./transferModal/TCModal";
import SimpleModal from "@/components/Modal/SimpleModal";

const TransferCertificate = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [selectAdmissionNo, setSelectAdmissionNo] = useState();
  const [transferCertificatePopup, settransferCertificatePopup] =
    useState(false);
  const [transferCertModal, settransferCertModal] = useState(false);
  const [dropOuttModal, setdropOuttModal] = useState(false);
  const [backToInstituteModal, setbackToInstituteModal] = useState(false);
  const [selectStatus, setSelectStatus] = useState();
  const [selectStatusItems, setSelectStatusItems] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const {
    data: studentData,
    status: studentStatus,
    isLoading: studentLoading,
    refetch: studentRefetch,
  } = useQuery("studentData", async () => {
    const payload = {};
    (payload.page = 1),
      (payload.limit = 100),
      (payload.q = searchText),
      (payload.classNumber = selectClass),
      (payload.section = selectSection),
      (payload.status = selectStatus);
    const res = await GetStudentLsit(payload);
    console.log(res, "---sdf");
    return res?.data;
  });
  const handleclose = () => {
    settransferCertificatePopup(false);
  };

  const handleFilterClick = () => {
    studentRefetch();
  };
  const handleResetClick = () => {
    setSearchText("");
    setSelectClass();
    setSelectSection();
    setSelectStatus();
    setTimeout(() => {
      studentRefetch();
    }, 500);
  };

  const exportPDF = () => {
    const input = document.getElementById("my-table");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("table.pdf");
    });
  };

  const csvHandler = async ({ page }) => {
    exportToCSV(studentData, "StudentList.csv");
    // setLoading(true);
    // try {
    //   const payload = {
    //     q: searchText,
    //     page,
    //     // status: filter?.status,
    //   };
    //   const res = await serviceList(payload);
    //   if (res?.code === 200) {
    //     exportToCSV(res?.data, "service_report.csv");
    //   }
    //   // setLoading(false);
    // } catch (err) {
    //   // setLoading(false);
    //   console.error("Error fetching salon data:", err);
    // }
  };

  const exportToExcel = () => {
    const table = document.getElementById("my-table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, "table.xlsx");
  };

  const backToInstitute = ({ item }) => {
    setSelectedItem(item);
    setbackToInstituteModal(true);
  };

  const detailsBtnHandler = (item) => {
    setSelectStatusItems(item);
    settransferCertificatePopup(true);
  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} className="bg-white">
        <Grid
          container
          spacing={2}
          sx={{
            py: 2,
            px: 2,
            alignItems: "center",
            // justifyContent: "space-between",
          }}
        >
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <QuickSearchToolbar
              onChange={(event) => setSearchText(event.target.value)}
              isTeamMember="Search by Enquiry No, name, Class, Section"
              value={searchText}
              fullWidth
              rootSx={{ p: 0, pb: 0, marginLeft: 0 }}
              variant="outlined"
              // onFilterClick={handleFilterClick}
            />
          </Grid>
          {/* <Grid item justifyContent={"center"} xs={12} sm={4} md={2}>
            <StatusSelection
              selectStatus={selectStatus}
              setSelectStatus={setSelectStatus}
            />
          </Grid> */}
          <Grid item justifyContent={"center"} xs={12} sm={6} md={3}>
            <ClassSelection
              selectClass={selectClass}
              setSelectClass={setSelectClass}
              classList={Config.ClassList}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={2.5}>
            <SectionSelection
              selectClass={selectSection}
              setSelectClass={setSelectSection}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={0.5}>
            <button onClick={handleFilterClick} className="filter-btncuston">
              <FilterAltIcon />
            </button>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={0.5}>
            <button onClick={handleResetClick} className="filter-btncuston">
              Reset
            </button>
          </Grid>
        </Grid>
        <Grid
          container
          className="flex justify-end mb-5 mr-3"
          sx={{ mb: 2, mr: 2 }}
        >
          <Grid onClick={csvHandler} item xs={12} sm={4} md={1}>
            <button className="border-2 rounded-lg px-4 py-2.5 ">
              Export CSV
            </button>
          </Grid>
          <Grid item xs={12} sm={4} md={1}>
            <button
              onClick={exportPDF}
              className="border-2 rounded-lg px-4 py-2.5 "
            >
              Export PDF
            </button>
          </Grid>
          <Grid item xs={12} sm={4} md={1}>
            <button
              onClick={exportToExcel}
              className="border-2 rounded-lg px-4 py-2.5"
            >
              Export Excel
            </button>
          </Grid>
          <Grid item xs={9} sm={4} md={2.3}>
            <CustomButton
              width={"250px"}
              onClick={() => settransferCertificatePopup(true)}
            >
              <AddIcon />
              Add Transfer Certificate
            </CustomButton>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Sl.No</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Admission No</StyledTableCell>
                  <StyledTableCell align="center">TC Date</StyledTableCell>
                  <StyledTableCell align="center">
                    Class - Section
                  </StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {studentLoading ? (
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
                ) : studentData?.length > 0 ? (
                  <>
                    {studentData?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
                        backToInstitute={backToInstitute}
                        detailsBtnHandler={detailsBtnHandler}
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

          {/* <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            // count={pagination?.total || 0}
            // rowsPerPage={15}
            // page={pagination?.currentPage ? pagination?.currentPage - 1 : 0}
            // onPageChange={handleChangePage}
          /> */}
          {/* <Grid sx={{ display: "flex", justifyContent: "end", p: 3 }}>
            <Button variant="contained" size="large">
              Submit
            </Button>
          </Grid> */}
        </Paper>
      </div>{" "}
      <TransferCertificateModal
        open={transferCertificatePopup}
        handleClose={handleclose}
        data={selectStatusItems}
      />
      <BackToInstituteModal
        open={backToInstituteModal}
        handleClose={() => setbackToInstituteModal(false)}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default TransferCertificate;

const Row = (props) => {
  const { row, index, detailsBtnHandler, backToInstitute } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            fontWeight: "600",
            color: "#000",
            // overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
          <Typography>
            {(
              (row?.name?.first_name || "") +
              " " +
              (row?.name?.middle_name || "") +
              " " +
              (row?.name?.last_name || "")
            ).trim()}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
          <Typography>{row?.admission_number}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>{moment(row?.tc_date).format("DD-MM-YYYY")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>
            {row?.class}
            {row?.section && "-" + row?.section}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
          <Grid sx={{ gap: 1, display: "flex" }}>
            <CustomButton width={"80px"} onClick={() => detailsBtnHandler(row)}>
              Details
            </CustomButton>
            <CustomButton
              width={"150px"}
              onClick={() => backToInstitute(row?._id)}
            >
              Back To Institute
            </CustomButton>
          </Grid>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

const BackToInstituteModal = ({ open, handleClose, selectedItem }) => {
  const [remark, setRemark] = useState();
  return (
    <SimpleModal open={open} handleClose={handleClose} width={800}>
      <Box sx={{ width: "100%", mt: 5 }}>
        <TextField
          id="outlined-basic"
          value={remark}
          fullWidth
          onChange={(e) => setRemark(e?.target?.value)}
          label="Remark"
          variant="outlined"
        />
      </Box>
      <div className="flex justify-end mt-6">
        <CustomButton>Submit</CustomButton>
      </div>
    </SimpleModal>
  );
};

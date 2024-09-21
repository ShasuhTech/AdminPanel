"use client";
import React from "react";
import {
  Typography,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Table,
  CircularProgress,
} from "@mui/material";
import { StyledTableCell } from "@/styles/TableStyle/indx";

const DetailsTable = ({ topTenSchoolData, loading }) => {
  console.log(topTenSchoolData, "--topTenSchoolData");

  return (
    <TableContainer style={{ maxHeight: 520 }}>
      <Table aria-label="collapsible table" className="">
        <TableHead style={{ backgroundColor: "#F3F6F9" }}>
          <TableRow style={{ fontWeight: "500", color: "#000" }}>
            <StyledTableCell align="center"> School ID</StyledTableCell>
            <StyledTableCell align="center"> School Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">
              Contacted Person Name
            </StyledTableCell>
            <StyledTableCell align="center">Website</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody
          style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}
        >
          {loading ? (
            <TableRow>
              <StyledTableCell colSpan={12}>
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
              </StyledTableCell>
            </TableRow>
          ) : topTenSchoolData?.length > 0 ? (
            <>
              {topTenSchoolData?.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </>
          ) : (
            <TableRow>
              <StyledTableCell colSpan={12}>
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
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailsTable;

const Row = (props) => {
  const { row } = props;

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
        <StyledTableCell align="center" style={{ maxWidth: "250px" }}>
          <Typography>{row?._id}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ maxWidth: "300px" }}>
          <Typography>{row?.school_name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ maxWidth: "150px" }}>
          <Typography>{row?.email}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.phone}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.contact_person_name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.website}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

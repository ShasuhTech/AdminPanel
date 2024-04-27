"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  CircularProgress,
  styled,
  tableCellClasses,
  debounce,
} from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "@/utilities/configureAxios";
import { useRouter } from "next/router";
import QuickSearchToolbar from "@/components/SearchBar";
import moment from "moment";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { salonListByid } from "@/services/api";



const HolidayTable = ({ data }) => {

  

  return (
    <TableContainer style={{ maxHeight: "auto",overflow:'overflow-set' }}>
      <Table aria-label="collapsible table" className="">
        <TableHead>
          <TableRow style={{ fontWeight: "500", color: "#000" }}>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Salon Id</StyledTableCell>
            <StyledTableCell align="center">From</StyledTableCell>
            <StyledTableCell align="center">To</StyledTableCell>
            {/* <StyledTableCell align="center">Status</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody
          style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}
        >
          {data?.holiday?.length > 0 ? (
            <>
              {data?.holiday?.map((row, index) => (
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

export default HolidayTable

const Row = (props) => {
  const { row, } = props;

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };

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
        <StyledTableCell style={{ minWidth: "50px", }} align="center">
          <Typography>{row?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.salonId}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{formatDateTime(row?.fromDate)}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{formatDateTime(row?.toDate)}</Typography>
        </StyledTableCell>
        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{(row?.liveStatusText)}</Typography>
        </StyledTableCell> */}
        

      </TableRow>
    </React.Fragment>
  );
};



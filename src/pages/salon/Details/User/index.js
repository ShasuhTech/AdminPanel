import React, { useState } from "react";
import {
  Container,
  FormControl,
  Button,
  InputAdornment,
  InputLabel,
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
  IconButton,
  TablePagination,
  CircularProgress,
  Collapse,
  Select,
  MenuItem,
  styled,
  tableCellClasses,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { salonListByid } from "@/services/api";
import { useRouter } from "next/router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    textTransform: "capitalize",
    fontWeight: 500,
    fontSize: 13,
    lineHeight: "24px",
    borderBottom: "1px solid #D7D7D7",
    minWidth: 100,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    lineHeight: "21px",
    color: theme.palette.common.black,
    minWidth: 100,
    fontWeight: 400,
    borderBottom: "1px solid #D7D7D7",
  },
}));

const User = ({  }) => {
  const [userData, setUserData] = useState();
  const [data, setSalonData] = useState({});
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const id = router?.query?.id;
  const call = async () => {
    if (!id) {
      return;
    }
    const payload = {
      id,
      include: "users",
    };
    try {
      setLoader(true);
      const resp = await salonListByid(payload);
      setLoader(false);
      setUserData(resp?.data?.users);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(data).length === 0 && data?.constructor === Object) {
      call();
    }
  }, [router]);


  // useEffect(() => {
  //   setUserData(data?.users);
  // }, [data]);

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "scroll" }}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Email Id</StyledTableCell>
                <StyledTableCell align="center">Mobile Number</StyledTableCell>
                <StyledTableCell align="center">user Type</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                height: "auto",
                position: "relative",
              }}
            >
              {userData?.length > 0 ? (
                <>
                  {userData?.map((row) => (
                    <Row key={row?.id} row={row} />
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
      </Paper>
    </div>
  );
};

export default User;

const Row = (props) => {
  const { row, router } = props;
  console.log(row, "---");
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
        }}
      >
        <StyledTableCell align="left" sx={{ cursor: "pointer" }}>
          {row.firstName.charAt(0).toUpperCase() +
            row.firstName.slice(1).toLowerCase() +
            " " +
            row.lastName.charAt(0).toUpperCase() +
            row.lastName.slice(1).toLowerCase()}
        </StyledTableCell>
        <StyledTableCell align="left">{row.email}</StyledTableCell>
        <StyledTableCell align="center">
          {row.contactMobileNumber}
        </StyledTableCell>
        <StyledTableCell align="center">
          <Typography>{row.userTypeText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center">
          <Typography>{row.gender}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

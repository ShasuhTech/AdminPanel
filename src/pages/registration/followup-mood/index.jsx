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
  TablePagination,
  MenuItem,
  Select,
  Menu,
  IconButton,
  InputLabel,
  TextField,
  Button,
  Checkbox,
  ListItemText,
} from "@mui/material";
import {
  GetStudentLsit,
  addServices,
  adminCategory,
  serviceList,
} from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { toast } from "react-toastify";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FormControl from "@mui/material/FormControl";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { Plus } from "mdi-material-ui";
import { useQuery } from "react-query";
import moment from "moment";
import StudentDetails from "@/components/SchoolManagemnt/Modal/DetailsModal";
import Config from "@/utilities/Config";
import SimpleModal from "@/components/Modal/SimpleModal";

const FollowUpMode = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const {
    data: studentData,
    status: studentStatus,
    isLoading: studentLoading,
    refetch: studentRefetch,
  } = useQuery("studentData", async () => {
    const res = await GetStudentLsit();
    console.log(res, "---sdf");
    return res?.data;
  });
  const [folloeupModeModal, setFolloeupModeModal] = useState(false);
  const handleclose = () => {
    setFolloeupModeModal(false);
  };
  const handleOpen = () => {
    setFolloeupModeModal(true);
  };
 

 
  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
 
          <Grid item xs={12} sm={12} md={4} >
            <Button variant="contained" onClick={handleOpen} size="large">
              Create New Followup Mode
            </Button>
          </Grid>
         
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="left">FollowUp</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {false ? (
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
                ) : true? (
                  <>
                    {[1,1,1,1]?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
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

          
        </Paper>
      </div>{" "}
      <FollowUpModal open={folloeupModeModal} handleClose={handleclose} />
    </div>
  );
};

export default FollowUpMode;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails, index, router } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell> */}
        <StyledTableCell align="left" style={{ minWidth: "250px" }}>
          <Typography>
           {row?.name||'Email'}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "250px" ,gap:2,}}>
          <Button variant="outlined">Edit</Button>
          <Button sx={{marginLeft:'10px'}} variant="outlined" color="error">Delete</Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

const FollowUpModal =({open,handleClose})=>{
  return(
    <SimpleModal open={open} handleClose={handleClose}>
      <div>sfwefewf</div>
    </SimpleModal>
  )
}
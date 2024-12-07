import { GetStudentLsit } from '@/services/api';
import { StyledTableCell } from '@/styles/TableStyle/indx';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

const YearWiseDetails = () => {
    const {
        data: studentData,
        status: studentStatus,
        isLoading: studentLoading,
        refetch: studentRefetch,
      } = useQuery("studentData", async () => {
        const res = await GetStudentLsit();
        return res?.data;
      });
  return (
    <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" ,}}>
                  <StyledTableCell align="center">SESSION</StyledTableCell>
                  <StyledTableCell align="center">NEW</StyledTableCell>
                  <StyledTableCell align="center">TC</StyledTableCell>
                  <StyledTableCell align="center">DROPOUT</StyledTableCell>
                  <StyledTableCell align="center">TOTAL</StyledTableCell>
                  <StyledTableCell align="center">PN BOYS</StyledTableCell>
                  <StyledTableCell align="center">PN GIRLS</StyledTableCell>
                  <StyledTableCell align="center">N BOYS</StyledTableCell>
                  <StyledTableCell align="center">N GIRLS</StyledTableCell>
                  <StyledTableCell align="center">KG BOYS</StyledTableCell>
                  <StyledTableCell align="center">KG GIRLS</StyledTableCell>
                  <StyledTableCell align="center">I BOYS</StyledTableCell>
                  <StyledTableCell align="center">I GIRLS</StyledTableCell>
                  <StyledTableCell align="center">II BOYS</StyledTableCell>
                  <StyledTableCell align="center">II GIRLS</StyledTableCell>
                  <StyledTableCell align="center">III BOYS</StyledTableCell>
                  <StyledTableCell align="center">III GIRLS</StyledTableCell>
                  <StyledTableCell align="center">IV BOYS</StyledTableCell>
                  <StyledTableCell align="center">IV GIRLS</StyledTableCell>
                  <StyledTableCell align="center">V BOYS</StyledTableCell>
                  <StyledTableCell align="center">V GIRLS</StyledTableCell>
                  <StyledTableCell align="center">VI BOYS</StyledTableCell>
                  <StyledTableCell align="center">VI GIRLS</StyledTableCell>
                  <StyledTableCell align="center">VII BOYS</StyledTableCell>
                  <StyledTableCell align="center">VII GIRLS</StyledTableCell>
                  <StyledTableCell align="center">VIII BOYS</StyledTableCell>
                  <StyledTableCell align="center">VIII GIRLS</StyledTableCell>
                  <StyledTableCell align="center">IX BOYS</StyledTableCell>
                  <StyledTableCell align="center">IX GIRLS</StyledTableCell>
                  <StyledTableCell align="center">X BOYS</StyledTableCell>
                  <StyledTableCell align="center">X GIRLS</StyledTableCell>
                  <StyledTableCell align="center">XI BOYS</StyledTableCell>
                  <StyledTableCell align="center">XI GIRLS</StyledTableCell>
                  <StyledTableCell align="center">XII BOYS</StyledTableCell>
                  <StyledTableCell align="center">XII GIRLS</StyledTableCell>
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
                    {[1]?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
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
  )
}

export default YearWiseDetails

const Row = (props) => {
    const { row, salonDetails, setSalonDetails, index } = props;
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
              // overflow: "scroll",
              cursor: "pointer",
            },
          }}
        >
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>{index + 1}</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>
             232
            </Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>16</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>05</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>300</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>20</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" style={{ minWidth: "50px" }}>
            <Typography>30</Typography>
          </StyledTableCell>
        </TableRow>
      </React.Fragment>
    );
  };
  
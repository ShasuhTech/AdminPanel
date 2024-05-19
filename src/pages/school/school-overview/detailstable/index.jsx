import { GetStudentLsit } from '@/services/api';
import { StyledTableCell } from '@/styles/TableStyle/indx';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

const SchoolOverviewData = () => {
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
  return (
    <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" ,}}>
                  <StyledTableCell align="center">Class Name</StyledTableCell>
                  <StyledTableCell align="center">Section Name</StyledTableCell>
                  <StyledTableCell align="center">Boys</StyledTableCell>
                  <StyledTableCell align="center">Girls</StyledTableCell>
                  <StyledTableCell align="center">Section Total</StyledTableCell>
                  <StyledTableCell align="center">TC</StyledTableCell>
                  <StyledTableCell align="center">Dropout</StyledTableCell>
                  <StyledTableCell align="center">New</StyledTableCell>
                  <StyledTableCell align="center">{`< 3`}</StyledTableCell>
                  <StyledTableCell align="center">3</StyledTableCell>
                  <StyledTableCell align="center">4</StyledTableCell>
                  <StyledTableCell align="center">5</StyledTableCell>
                  <StyledTableCell align="center">6</StyledTableCell>
                  <StyledTableCell align="center">7</StyledTableCell>
                  <StyledTableCell align="center">8</StyledTableCell>
                  <StyledTableCell align="center">9</StyledTableCell>
                  <StyledTableCell align="center">10</StyledTableCell>
                  <StyledTableCell align="center">11</StyledTableCell>
                  <StyledTableCell align="center">12</StyledTableCell>
                  <StyledTableCell align="center">13</StyledTableCell>
                  <StyledTableCell align="center">14</StyledTableCell>
                  <StyledTableCell align="center">15</StyledTableCell>
                  <StyledTableCell align="center">16</StyledTableCell>
                  <StyledTableCell align="center">17</StyledTableCell>
                  <StyledTableCell align="center">18</StyledTableCell>
                  <StyledTableCell align="center">{`> 18`}</StyledTableCell>
                  <StyledTableCell align="center">CBSE</StyledTableCell>
                  <StyledTableCell align="center">ICSE</StyledTableCell>
                  <StyledTableCell align="center">IB</StyledTableCell>
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

export default SchoolOverviewData

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
              overflow: "scroll",
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
  
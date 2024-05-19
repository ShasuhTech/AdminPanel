import SimpleModal from '@/components/Modal/SimpleModal';
import { GetStudentLsit } from '@/services/api';
import { StyledTableCell } from '@/styles/TableStyle/indx';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

const AuditLogs = ({open,handleClose,data,}) => {
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
    <SimpleModal open={open} handleClose={handleClose} width={900}>
<Typography variant='h5' className='mb-2'>Audit Log</Typography>
    <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10,mt:2 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" ,}}>
                  <StyledTableCell align="center">Sl.No</StyledTableCell>
                  <StyledTableCell align="center">Admission No</StyledTableCell>
                  <StyledTableCell align="center">Student Name</StyledTableCell>
                  <StyledTableCell align="center">Data Modified</StyledTableCell>
                  <StyledTableCell align="center">Modified Date</StyledTableCell>
                  <StyledTableCell align="center">User ID</StyledTableCell>
                  
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
        </SimpleModal>
  )
}

export default AuditLogs

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
         
        </TableRow>
      </React.Fragment>
    );
  };
  


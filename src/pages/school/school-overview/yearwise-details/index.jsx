import { GetStudentList } from '@/services/api';
import { StyledTableCell } from '@/styles/TableStyle/indx';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const columns = [
  "SESSION", "NEW", "TC", "DROPOUT", "TOTAL", "PN BOYS", "PN GIRLS", "N BOYS", "N GIRLS",
  "KG BOYS", "KG GIRLS", "I BOYS", "I GIRLS", "II BOYS", "II GIRLS", "III BOYS", "III GIRLS",
  "IV BOYS", "IV GIRLS", "V BOYS", "V GIRLS", "VI BOYS", "VI GIRLS", "VII BOYS", "VII GIRLS",
  "VIII BOYS", "VIII GIRLS", "IX BOYS", "IX GIRLS", "X BOYS", "X GIRLS", "XI BOYS", "XI GIRLS",
  "XII BOYS", "XII GIRLS"
];

const YearWiseDetails = () => {
  const { data: studentData, isLoading } = useQuery("studentData", async () => {
    const res = await GetStudentList();
    return res?.data || [];
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "auto", boxShadow: 10 }}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <StyledTableCell key={col} align="center">{col}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ height: 200 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : studentData?.length > 0 ? (
              studentData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <Row key={index} row={row} index={index} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ height: 200 }}>
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={studentData?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

const Row = ({ row, index }) => {
  return (
    <TableRow>
      <StyledTableCell align="center"><Typography>{index + 1}</Typography></StyledTableCell>
      {columns.slice(1).map((col, i) => (
        <StyledTableCell key={i} align="center">
          <Typography>{row[col.toLowerCase().replace(/ /g, '_')] || 0}</Typography>
        </StyledTableCell>
      ))}
    </TableRow>
  );
};

export default YearWiseDetails;
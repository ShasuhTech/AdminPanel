import { GetStudentLsit } from '@/services/api';
import { StyledTableCell } from '@/styles/TableStyle/indx';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';

const columnHeaders = [
  'Class Name', 'Section Name', 'Boys', 'Girls', 'Section Total', 'TC', 'Dropout', 'New',
  '< 3', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '> 18',
  'CBSE', 'ICSE', 'IB', 'X BOYS', 'X GIRLS', 'XI BOYS', 'XI GIRLS', 'XII BOYS', 'XII GIRLS'
];

const SchoolOverviewData = () => {
  const { data: studentData, isLoading: studentLoading } = useQuery('studentData', async () => {
    const res = await GetStudentLsit();
    return res?.data || [];
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'scroll', boxShadow: 10 }}>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {columnHeaders.map((header, index) => (
                <StyledTableCell key={index} align="center">
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentLoading ? (
              <TableRow>
                <TableCell colSpan={columnHeaders.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : studentData?.length > 0 ? (
              studentData?.map((row, index) => <Row key={index} row={row} index={index} />)
            ) : (
              <TableRow>
                <TableCell colSpan={columnHeaders.length} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SchoolOverviewData;

const Row = ({ row, index }) => {
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset', fontWeight: '600', cursor: 'pointer' } }}>
      <StyledTableCell align="center">
        <Typography>{index + 1}</Typography>
      </StyledTableCell>
      {Object.values(row).map((value, idx) => (
        <StyledTableCell key={idx} align="center">
          <Typography>{value || '-'}</Typography>
        </StyledTableCell>
      ))}
    </TableRow>
  );
};

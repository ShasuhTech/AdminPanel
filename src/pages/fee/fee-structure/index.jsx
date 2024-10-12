import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Typography
} from '@mui/material';
import { Button } from 'antd';
import CustomButton from '@/components/CommonButton/CustomButton';
import { useQuery } from 'react-query';
import { GetConfigsListFee } from '@/services/api';
import { Grid } from 'mdi-material-ui';
import { Box } from '@mui/system';

const FeeStructureTable = () => {
  const initialFees = [
    { head: 'TUITION & OTHER FEES', type: 'Installment', qtr1: 36300, qtr2: 36300, qtr3: 36300, qtr4: 36300 },
    { head: 'DEVELOPMENT FEES', type: 'Installment', qtr1: 3000, qtr2: 3000, qtr3: 3000, qtr4: 3000 },
    { head: 'LUNCH & REFRESHMENT', type: 'Installment', qtr1: 9000, qtr2: 9000, qtr3: 9000, qtr4: 9000 },
    { head: 'ADMISSION FEE', type: 'Lifetime', qtr1: 90000, qtr2: 0, qtr3: 0, qtr4: 0 },
    { head: 'SECURITY DEPOSIT', type: 'Lifetime', qtr1: 80000, qtr2: 0, qtr3: 0, qtr4: 0 },
    { head: 'REGISTRATION FEE', type: 'Installment', qtr1: 0, qtr2: 0, qtr3: 0, qtr4: 0 },
  ];
  const [feeGroupSelect, setfeeGroupSelect] = useState();

  const [fees, setFees] = useState(initialFees);

  const handleAmountChange = (index, quarter, value) => {
    const updatedFees = [...fees];
    updatedFees[index][quarter] = Number(value);
    setFees(updatedFees);
  };

  const handleTypeChange = (index, value) => {
    const updatedFees = [...fees];
    updatedFees[index].type = value;
    if (value === 'Lifetime') {
      updatedFees[index].qtr2 = 0;
      updatedFees[index].qtr3 = 0;
      updatedFees[index].qtr4 = 0;
    }
    setFees(updatedFees);
  };

  const calculateTotal = (fee) => {
    return fee.qtr1 + fee.qtr2 + fee.qtr3 + fee.qtr4;
  };

  const calculateColumnTotal = (quarter) => {
    return fees.reduce((sum, fee) => sum + fee[quarter], 0);
  };

  const handleSubmit = () => {
    const formattedData = fees.map(fee => ({
      name: fee.head,
      type: fee.type,
      qtr1: fee.qtr1,
      qtr2: fee.qtr2,
      qtr3: fee.qtr3,
      qtr4: fee.qtr4
    }));

    console.log('Submitted data:', formattedData);
    // Here you would typically send this data to your server
    // For example: 
    // fetch('/api/submit-fees', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formattedData)
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
  };

  const {
    data: feeGrpData,
    isLoading: classLoading,
    refetch: classRefetch,
  } = useQuery("abc", async () => {
    const payload = { type: "FeeGroup" };
    const res = await GetConfigsListFee(payload);
    return res?.data;
  });
console.log(feeGrpData,'--feeGrpData')
  return (
    <>
    <Box sx={{display:'flex',justifyContent:'space-between',mb:2,alignItems:'center'}}>
    <Typography variant='h5' >Fee Structure Details</Typography>

    <FormControl  sx={{bgcolor:'white',width:300}}>
          <InputLabel id="status-select-label">Fee Group </InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={feeGroupSelect}
            label="Selected Status"
            onChange={(e) => setfeeGroupSelect(e.target.value)}
          >
            {feeGrpData?.map((item, ind) => (
              <MenuItem key={ind} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold',fontSize:14}}>Fee Head</TableCell>
            <TableCell sx={{fontWeight:'bold',fontSize:14}}>Type</TableCell>
            <TableCell sx={{fontWeight:'bold',fontSize:14}}>QTR 1</TableCell>
            <TableCell sx={{fontWeight:'bold',fontSize:14}}>QTR 2</TableCell>
            <TableCell sx={{fontWeight:'bold',fontSize:14}}>QTR 3</TableCell>
            <TableCell sx={{fontWeight:'bold',fontSize:14}}>QTR 4</TableCell>
            <TableCell sx={{fontWeight:'bold',fontSize:14}}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fees.map((fee, index) => (
            <TableRow key={index}>
              <TableCell sx={{fontWeight:'bold',fontSize:12}}>{fee.head}</TableCell>
              <TableCell>
                <Select
                  value={fee.type}
                  fullWidth
                  onChange={(e) => handleTypeChange(index, e.target.value)}
                >
                  <MenuItem value="Installment">Installment</MenuItem>
                  <MenuItem value="Annual">Annual</MenuItem>
                  <MenuItem value="Lifetime">Lifetime</MenuItem>
                </Select>
              </TableCell>
              {['qtr1', 'qtr2', 'qtr3', 'qtr4'].map((quarter) => (
                <TableCell key={quarter}>
                  <TextField
                    type="number"
                    value={fee[quarter]}
                    onChange={(e) => handleAmountChange(index, quarter, e.target.value)}
                    disabled={fee.type === 'Lifetime' && quarter !== 'qtr1'}
                  />
                </TableCell>
              ))}
              <TableCell>{calculateTotal(fee)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{fontWeight:'bold',fontSize:14}} colSpan={2}>Total</TableCell>
            {['qtr1', 'qtr2', 'qtr3', 'qtr4'].map((quarter) => (
              <TableCell key={quarter}>{calculateColumnTotal(quarter)}</TableCell>
            ))}
            <TableCell>
              {fees.reduce((sum, fee) => sum + calculateTotal(fee), 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <div className="mt-4 float-end">
        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
      </div>
    </>
  );
};

export default FeeStructureTable;
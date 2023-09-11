import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DropdownComp from './Helper Component/DropDownComp';
import { useDispatch, useSelector } from 'react-redux';
import { addBankDetails } from '../redux/bankDetails/bankDetailsSlice';

const BankDetails = () => {
  // const [accountHolderName, setAccountHolderName] = useState('');
  // const [bankName, setBankName] = useState(null);
  // const [accountNumber, setAccountNumber] = useState('');
  // const [ifscCode, setIfscCode] = useState('');
  // const [branchAddress, setBranchAddress] = useState('');
  const [dropDownValue, setDropDownValue] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branchAddress: '',
    accountType: '',
  });

  // const {
  //   accountHolderName,
  //   bankName,
  //   accountNumber,
  //   ifscCode,
  //   branchAddress,
  //   // accountType,
  // } = useSelector((state) => state.bank);
  const dispatch = useDispatch();
  const bankNames = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'CBI - Central Bank of India',
    'BOB',
    'BOI',
    // Add more bank names here
  ];
  const handleBankChange = (event, newValue) => {
    setBankDetails({
      ...bankDetails,
      bankName: newValue,
    });
  };

  useEffect(() => {
    dispatch(
      addBankDetails({
        ...bankDetails,
        accountType: dropDownValue,
      })
    );
  }, [dropDownValue, bankDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: value,
    });
  };
  return (
    <>
      {/* <Grid container spacing={1}> */}
      <Grid
        style={{ marginBottom: '1rem', marginTop: '1rem' }}
        item
        xs={12}
        sm={12}
      >
        <Typography variant='h5' fontWeight={700}>
          Add Bank Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          variant='outlined'
          type='text'
          name='accountHolderName'
          value={bankDetails.accountHolderName}
          fullWidth
          id='accountHolderName'
          label='Account Holder Name'
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Autocomplete
          id='bank-autocomplete'
          name='bankName'
          options={bankNames}
          getOptionLabel={(option) => option}
          value={bankDetails.bankName}
          onChange={handleBankChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Bank Name'
              variant='outlined'
              fullWidth
            />
          )}
          PaperComponent={({ children }) => (
            <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
              {children}
            </Paper>
          )}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField
          variant='outlined'
          type='text'
          value={bankDetails.accountNumber}
          fullWidth
          id='accountno'
          name='accountNumber'
          label='Account Number'
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField
          variant='outlined'
          fullWidth
          value={bankDetails.ifscCode}
          id='ifsc'
          name='ifscCode'
          label='Ifsc Code'
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField
          variant='outlined'
          fullWidth
          value={bankDetails.branchAddress}
          id='Branch'
          name='branchAddress'
          label='Branch Aaddress'
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <DropdownComp
          dropDownLable={'Account Type'}
          dropDownValue={dropDownValue}
          menuItemArray={['Saving Account', 'Current Account']}
          setDropDownValue={setDropDownValue}
          ddselectlabel={'Account Type'}
        ></DropdownComp>
      </Grid>
      {/* </Grid> */}
    </>
  );
};

export default BankDetails;

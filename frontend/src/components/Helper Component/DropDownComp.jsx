import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
const DropdownComp = ({
  dropDownValue,
  setDropDownValue,
  dropDownLable,
  menuItemArray,
  ddselectlabel,
}) => {
  return (
    <>
      <FormControl fullWidth variant='outlined'>
        <InputLabel id='demo-simple-select-outlined-label'>
          {dropDownLable}
        </InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={dropDownValue}
          onChange={(e) => setDropDownValue(e.target.value)}
          label={ddselectlabel}
        >
          <MenuItem value=' '>
            <em>{''}</em>
          </MenuItem>
          {menuItemArray.map((menuitem) => (
            <MenuItem key={menuitem} value={menuitem}>
              {menuitem}
            </MenuItem>
          ))}
          {/* <MenuItem value={"Permanent"}>Permanent</MenuItem>
          <MenuItem value={"Temporary"}>Temporary</MenuItem>
          <MenuItem value={"Office"}>Office</MenuItem> */}
        </Select>
      </FormControl>
    </>
  );
};
export default DropdownComp;

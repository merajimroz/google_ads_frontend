
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown = () => {
  const [selectedType, setSelectedType] = useState('');

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="ad-type-label">Select Ad Type</InputLabel>
      <Select
        labelId="ad-type-label"
        id="ad-type"
        value={selectedType}
        onChange={handleChange}
        label="Select Ad Type"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="responsive-search">AdGroups Responsive Search Ads</MenuItem>
        <MenuItem value="display-search">Display Search Ads</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Dropdown;

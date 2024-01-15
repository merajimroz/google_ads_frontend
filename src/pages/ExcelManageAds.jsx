import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ExcelManageAds = () => {
  const [file, setFile] = useState(null);
  const { customerId, campaignId, adGroupId } = useParams()
  let query = useQuery();
  const type = query.get('type')

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };


  const handleDownload = async(event) => {
    event.preventDefault()

    console.log(customerId, campaignId, adGroupId)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/adflare/api/excel-ads-template?type=${type}`, {
        customerId: customerId,
        campaignId: campaignId, 
        adGroupId: adGroupId
      }, {
        responseType: 'blob'
      })

      if(response.statusText === 'OK'){
        const data = response.data
        const a = document.createElement('a')
        a.href = window.URL.createObjectURL(new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}))

        a.download = 'ads_template.xlsx'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a);
      }
    } catch (error){
      console.error('There was an error downloading the file:', error);
    }
  }

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/adflare/api/excel-manage-ads?type=${type}`, formData, 
      )

      if(response.statusText === 'OK'){
        console.log('/success')
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Grid container spacing={5} sx={{marginTop: 10, marginLeft: 2}}>
        <Grid item xs={12}>
            <Typography variant='body2'>
              Download Template
            </Typography>
            <Button variant='outlined' onClick={handleDownload}>
              Download
            </Button>
            
        </Grid>
        <Grid item xs={12}>
            <Input type="file" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" onClick={handleFileUpload}>Upload</Button>
        </Grid>
    </Grid>
  );
};

export default ExcelManageAds;
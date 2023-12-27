import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';
import { useClient } from '../context/ClientContext';

const AdGroupForm = () => {

  const navigate = useNavigate()
  const {currentClient, setCurrentClient} = useClient()
  const [formDetails, setFormDetails] = useState({
    'adGroupName': '',
    'bidAmount': ''
  })

  console.log(currentClient)
  const handleClientDetails = (property) => event => {
    setCurrentClient({
        ...currentClient,
        [property]: event.target.value
    })
  }

  const handleChange = (property) => event => {
    setFormDetails({
        ...formDetails,
        [property]: event.target.value
    })
  }

  const handleCreateAdGroup = async() => {
    const data = {
        'adGroupName': formDetails.adGroupName,
        'bidAmount': formDetails.bidAmount,
        'campaignId': currentClient.campaignId,
        'customerId': currentClient.customerId
    }

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/adflare/api/add-adgroup`, data)
    console.log(response.data)
    if(response.statusText === 'OK') {

      const {currentClient, setCurrentClient} = useClient()
      ({
            ...currentClient,
            'adGroupResourceName': response.data
        })
        
        navigate('/googleads/dynamic-search')
    }
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create Ad Group
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Campaign ID"
                variant="outlined"
                value={currentClient?.campaignId}
                onChange={handleClientDetails('campaignId')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="AdGroup Name"
                variant="outlined"
                value={formDetails?.adGroupName}
                onChange={handleChange('adGroupName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bid Amount"
                variant="outlined"
                value={formDetails?.bidAmount}
                onChange={handleChange('bidAmount')}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleCreateAdGroup}>
                Create AdGroup
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdGroupForm;

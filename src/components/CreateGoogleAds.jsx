import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper'
import { useClient } from "../context/ClientContext";

const CreateGoogleAds = () => {

    const { currentClient, setClient } = useClient()
    const [adDescription, setAdDescription] = useState('');
    const navigate = useNavigate()

    const adGroupResourceName = currentClient.adGroupResourceName
    const handleSubmit = async(event) => {
      event.preventDefault();
      // Perform actions with the obtained values (e.g., call API, perform validation, etc.)
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/adflare/api/dynamic-search-ads`, {
        'adDescription': adDescription,
        'adGroupResourceName': adGroupResourceName
      })

      if(response.statusText=== 'OK') {
        navigate('/googleads/success')
      }
    };
  
    return (
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Google Ad
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ad Group Resource Name"
                variant="outlined"
                value={adGroupResourceName}
                onChange={(e) => setAdGroupResourceName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ad Description"
                variant="outlined"
                multiline
                rows={4}
                value={adDescription}
                onChange={(e) => setAdDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Ad
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    )
}

export default CreateGoogleAds
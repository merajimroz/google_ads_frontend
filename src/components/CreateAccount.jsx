import { useState, useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const CreateAccount = () => {
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken']);
  const [customerId, setCustomerId] = useCookies(['customerId'])
  const [messageSuccess, setMessageSuccess] = useState(false)

  const navigate = useNavigate()

  const [accountDetails, setAccountDetails] = useState({
    'accountName': '',
    'currency': 'USD',
    'timeZone': 'America/New_York'
  });


  const handleChange = property => event => {

    setAccountDetails({
      ...accountDetails,
      [property]: event.target.value
    })
  }

  const createAdsAccount = () => {

    const data = {
      ...accountDetails,
      refreshToken: refreshToken['refreshToken'],
      mytoken: token['token'],
      customer_id: customerId['customerId'],
    };

    try {
      const response = axios.post(`${window.env.API_URL}/api/create-customer-account/`, data)
      if(response.statusText === 'OK'){
        console.log('Account Created!')
        setMessageSuccess('True')
      }
    } catch (error){
      console.error('Error in Creating Account for Customer Google Ads')
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={10} sm={8} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Create Google Ads Accounts
            </Typography>

            {messageSuccess ? (
              <Fragment>
                <Button href='/googleads/customers' variant="contained" color="success">
                  Return
                </Button>
              </Fragment>
            ) : (
              <Stack className='googleads-account' spacing={2}>
                {/* Form fields */}
                <TextField
                  label="Account name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={accountDetails.accountName}
                  onChange={handleChange('accountName')}
                />
                <FormControl  variant="outlined" fullWidth>
                  <InputLabel id="currency-label">Select Currency</InputLabel>
                  <Select
                    labelId="currency-label"
                    id="currency"
                    value={accountDetails.currency}
                    onChange={handleChange('currency')}
                    label="Select currency"
                  >
                    <MenuItem value='USD'>US Dollars</MenuItem>
                    <MenuItem value='ARS'>Argentine Peso</MenuItem>
                    <MenuItem value="BRL">Brazilian Real</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant='outlined' fullWidth>
                    <InputLabel id="timezone-label">Select time Zone</InputLabel>
                    <Select
                      labelId='timezone-label'
                      id="time-zone"
                      value={accountDetails.timeZone}
                      onChange={handleChange('timeZone')}
                      label="Select time Zone"
                    >
                      <MenuItem value="America/New_York">US East Coast</MenuItem>
                      <MenuItem value="America/Los_Angeles">US West Coast</MenuItem>
                      <MenuItem value="America/Argentia/Buenos_Aires">Argentia</MenuItem>
                    </Select>
                </FormControl>
                <Button  onClick={createAdsAccount} variant="contained" color="success">
                  CREATE
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateAccount;
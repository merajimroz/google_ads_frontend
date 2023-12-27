import axios from 'axios'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const GoogleRefreshTokenPage = () => {

    const handleGoogleButton = async (event) => {
        event.preventDefault()
    
        const url = `${import.meta.env.VITE_API_URL}/adflare/api/connect`
        const response = await axios.get(url)
    
        if (response.statusText == 'OK') {
          window.location.href = response.data.url
        }
      }

    return (
        <Grid container justifyContent="center" spacing={2} my={3}>
            <Grid item xs={8}>
              <Typography variant='body1'>
                  Click to here to get Refresh Token
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleButton}
              >
                Google
              </Button>
            </Grid>
          </Grid>
    )
}

export default GoogleRefreshTokenPage
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Navbar from '../components/Navbar'

import "./styles.css"

const advertisingQuotes = [
  {
    text: "The best way to predict the future is to create it.",
    author: "- Peter Drucker"
  },
  {
    text: "Good advertising does not just circulate information. It penetrates the public mind with desires and beliefs.",
    author: "- Leo Burnett"
  },
  // Add more quotes as needed
];

const HomePage = () => {

  const [token, setToken] = useCookies('token')

   // grab query string
   const queryString = window.location.search;

   // parse que query string's parameters
   const urlParams = new URLSearchParams(queryString)

   // get the code that is the access code of user after authenticating and authorizing permission
   const googleAccessCode = urlParams.get('code')
   let refreshToken = localStorage.getItem('refreshToken')

   console.log('Refresh Token', refreshToken)

   useEffect(() => {
    if(googleAccessCode && (refreshToken === null)) {
      const response = axios.post(`${import.meta.env.VITE_API_URL}/adflare/api/get-token`, {
        'googleAccessCode': googleAccessCode,
        'token': token
      })

      if(response.statusText === 'OK') {
          console.log(response)
          localStorage.setItem('refreshToken', response.data.refreshToken)
      }
    }

   }, [googleAccessCode, token])

  return (
    <Box sx={{ my: 0.5 }}>
      <Navbar />
      {/* Your home page content */}
      <Card variant="outlined">
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{my:3}}>Welcome to Adflare!</Typography>
          <hr style={{ border: '1px solid #ccc' }} /> {/* Horizontal line */}
          <Grid container justifyContent="center" spacing={2}>
            {
              advertisingQuotes.map((randomQuote) => 
                <Grid item xs={8} sx={{fontSize: 15}}>
                  <Typography variant="h6">
                    {randomQuote.text}
                  </Typography>
                  <Typography variant="caption">
                    {randomQuote.author}
                  </Typography>
                </Grid>
              )
            }
          </Grid>
        </Paper>
      </Card>
    </Box>
  )
}

export default HomePage
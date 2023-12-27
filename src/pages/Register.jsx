import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate, redirect } from 'react-router-dom'

import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const RegisterPage = () => {
    const [userInfos, setUserInfos] = useState({
        'email': '',
        'password': ''
    })
    const navigate = useNavigate()

    const handleChange = (property) => event => {
      setUserInfos({
        ...userInfos,
        [property]: event.target.value
      })
    }

    const handleSignUpButton = async(event) => {
      event.preventDefault()

      try  {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/adflare/api/create-account`, JSON.stringify(userInfos))

        if (response.statusText === 'OK'){
            navigate('/login')
        }

      } catch(error) {
        console.log('Error Occurred in SignUp!')
      } finally {

        setUserInfos({
          ...userInfos,
          'email': '',
          'password': ''
        })
      }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{my:30}}>
      <div>
        <Typography sx={{ my:2, mx:15, font: 'Roboto'}} component="h1" variant="h5">
            Register
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={userInfos?.email}
                autoComplete="email"
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={userInfos?.password}
                autoComplete="current-password"
                onChange={handleChange('password')}
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              my:2
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUpButton}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    )
 }

 export default RegisterPage
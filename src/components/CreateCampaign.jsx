import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateNewCampaign = () => {

    const navigate = useNavigate()
    const [campaign, setCampaign] = useState({
        'customerId': '',
        'budget': '',
        'campaignName': ''
    })

    const handleChange = (property) => event => {
        event.preventDefault()

        setCampaign({
            ...campaign,
            [property]: event.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_API_URL}/adflare/api/create-campaign`
        const response = await axios.post(url, campaign)

        if(response.statusText === 'OK'){
            navigate('/googleads')
        }
        
      };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="div">
                    Create Google Campaign
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Campaign Name"
                        fullWidth
                        margin="normal"
                        value={campaign.campaignName}
                        onChange={handleChange('campaignName')}
                    />
                    <TextField
                        label="Customer ID"
                        fullWidth
                        margin="normal"
                        value={campaign.customerId}
                        onChange={handleChange('customerId')}
                    />
                    <TextField
                        label="Budget Amount"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={campaign.budget}
                        onChange={handleChange('budget')}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Create
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default CreateNewCampaign
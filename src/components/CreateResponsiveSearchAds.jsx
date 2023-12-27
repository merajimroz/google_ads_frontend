import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';

import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ResponsiveSearchAds = () => {
    const [headlines, setHeadlines] = useState(["", "", ""]);
    const [descriptions, setDescriptions] = useState(["", ""]);
    const [finalUrl, setFinalUrl] = useState('');
    const [amount, setAmount] = useState('');
    const [paths, setPaths] = useState(["", ""])

    const navigate = useNavigate()

    const handleAddDescription = () => {
        setDescriptions([...descriptions, ""]);
    };

    const handleHeadlineChange = (index, value) => {
        const newHeadlines = [...headlines];
        newHeadlines[index] = value;
        setHeadlines(newHeadlines);
    };

    const handleDescriptionChange = (index, value) => {
        const newDescriptions = [...descriptions];
        newDescriptions[index] = value;
        setDescriptions(newDescriptions);
    };

    const handleSubmit = async(event) => {
        event.preventDefault()
        const data = {
            'customerID': '',
            'adGroupID': '',
            'finalUrl': finalUrl,
            'adDetails': {
                'headlines': headlines,
                'descriptions': descriptions,
                'paths': paths
            }
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/adflare/api/responsive-search-ad`, data)
            if(response.statusText === 'OK') {
                navigate('/googleads/success')
            }
        } catch (error) {
            console.log(error)
        }}

    return (
        <Box >
            <Typography variant="h5" gutterBottom>
                Responsive Search Ads
            </Typography>
            <Card variant="outlined" className='wrapper'>
                <CardContent>
                    <Grid container spacing={2} direction='column'>
                        <Grid item >
                            <Typography variant='body1'>
                                Add at least three headlines
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Stack spacing={2}>
                                {headlines.map((headline, index) => (
                                    <TextField
                                        required={true}
                                        key={`headline-${index}`}
                                        label={`Headline ${index + 1}`}
                                        value={headline}
                                        onChange={(e) => handleHeadlineChange(index, e.target.value)}
                                        fullWidth
                                    />
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card variant="outlined" className='wrapper'>
                <CardContent>
                    <Grid container spacing={2} direction='column'>
                        <Grid item >
                            <Typography variant='body1'>
                                Add at least two descriptions
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Stack spacing={2} mt={2}>
                                {descriptions.map((description, index) => (
                                    <TextField
                                        key={`description-${index}`}
                                        label={`Description ${index + 1}`}
                                        value={description}
                                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                        fullWidth
                                    />
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card variant="outlined" className='wrapper'>
                <CardContent>
                    <Grid container spacing={2} direction='column'>
                        <Grid item >
                            <TextField
                                label="Final URL"
                                value={finalUrl}
                                onChange={(e) => setFinalUrl(e.target.value)}
                                fullWidth
                                mt={2}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                fullWidth
                                mt={2}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Button variant="outlined" color="primary" sx={{my:2}} onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default ResponsiveSearchAds;

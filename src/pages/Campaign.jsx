import { useLoaderData } from 'react-router-dom'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'
import CampaignTable from '../components/CampaignTable'


const CampaignPage = () => {

    const campaigns = useLoaderData()
    const { customerId }  = useParams()

    return (
        <>
            {campaigns ? <CampaignTable campaigns={campaigns}/> : <Box sx={{ minWidth: 275 }}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            Create a Campaign First
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href={`/googleads/campaigns/new/${customerId}`}>Add</Button>
                    </CardActions>
                </Card>
            </Box>}
        </>
    )
}

export default CampaignPage
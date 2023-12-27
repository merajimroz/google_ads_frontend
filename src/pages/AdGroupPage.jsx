import { useLoaderData } from 'react-router-dom'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'
import AdgroupTable from '../components/AdgroupsTable'

const AdgroupPage = () => {

    const adgroups = useLoaderData()
    const { customerId, campaignId }  = useParams()

    return (
        <>
            {adgroups ? <AdgroupTable adgroups={adgroups}/> : <Box sx={{ minWidth: 275 }}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            Create a Adgroup First
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href={`/googleads/adgroups/new/${customerId}/${campaignId}`}>Add</Button>
                    </CardActions>
                </Card>
            </Box>}
        </>
    )
}

export default AdgroupPage
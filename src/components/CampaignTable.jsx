import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';

const CampaignTable = ({ campaigns}) => {

  const navigate = useNavigate()
  const { customerId }  = useParams()

  const handleClick = (campaign) => event => {
    event.preventDefault()
    navigate(`/googleads/adgroups/${customerId}/${campaign.campaignId}`)
  
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Campaign</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.campaignId} onClick={handleClick(campaign)} hover>
              <TableCell component="th" scope="row">
                {campaign.campaignId}
              </TableCell>
              <TableCell align="right">{campaign.campaignName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default CampaignTable
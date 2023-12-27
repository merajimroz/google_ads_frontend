import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';


const AdgroupTable = ({ adgroups}) => {

  const navigate = useNavigate()
  const { customerId, campaignId }  = useParams()

  const handleClick = (adgroup) => event => {
    event.preventDefault()

    console.log(adgroup, customerId, campaignId, adgroup.id)
    navigate(`/googleads/excel-manage-ads/${customerId}/${campaignId}/${adgroup.id}`)
  
  }

  console.log('adgroup table', adgroups)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>type</TableCell>
            <TableCell>status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adgroups.map((adgroup) => (
            <TableRow key={adgroup.id} onClick={handleClick(adgroup)} hover>
              <TableCell component="th" scope="row">
                {adgroup.id}
              </TableCell>
              <TableCell align="center">{adgroup.name}</TableCell>
              <TableCell align="center">{adgroup.type}</TableCell>
              <TableCell align="center">{adgroup.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default AdgroupTable
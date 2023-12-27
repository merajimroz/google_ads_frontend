import { useLoaderData, useNavigate } from 'react-router-dom'
import { useClient } from '../context/ClientContext'

import Card from '@mui/material/Card'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { useEffect, useState } from 'react'

const GoogleAdsCustomersPage = () => {

    const accounts = useLoaderData()
    const navigate = useNavigate()
    const { currentClient, setCurrentClient } = useClient()

    const handleClick = customer => event => {
        event.preventDefault()

        console.log(customer)
        setCurrentClient({
            ...currentClient,
            'customerId': customer.customerId
        })
        navigate(`/googleads/campaigns/${customer.customerId}`)
    }
    return (
        <>
            {accounts ?
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Descriptive Name</TableCell>
                                <TableCell>Currency Code</TableCell>
                                <TableCell>Time Zone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map((account) => (
                                <TableRow key={account.customerId} onClick={handleClick(account)} hover>
                                    <TableCell>{account.customerId}</TableCell>
                                    <TableCell>{account.descriptiveName}</TableCell>
                                    <TableCell>{account.currencyCode}</TableCell>
                                    <TableCell>{account.timeZone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Create New Customer Account
                        </Typography>
                        <Typography variant="body1" component="div">
                            To create a new customer account, click the button below.
                        </Typography>
                        <Button variant="contained" sx={{my:2}} color="primary" onClick={() => navigate('/googleads/customer/create')}>
                            Create
                        </Button>
                    </CardContent>
                </Card>
            }
        </>
    )
}

export default GoogleAdsCustomersPage
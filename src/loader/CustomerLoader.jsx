import axios from 'axios'

const CustomerLoader = async() => {
    
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/adflare/api/account-list`)
        if(response.statusText === 'OK') {
            console.log(response)
             return response.data
        }
        return null
    } catch(error) {
        console.log('Error in Customer Loader')
        return null
    }
}

export default CustomerLoader
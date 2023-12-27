import axios from 'axios'

const AdgroupLoader = async ({params} ) => {

    try {
        const url = `${import.meta.env.VITE_API_URL}/adflare/api/adgroups/${params.customerId}/${params.campaignId}`
        const response = await axios.get(url)

        if(response.statusText === 'OK'){
            const data = response.data
            return data
        }
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

export default AdgroupLoader
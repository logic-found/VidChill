import axios from 'axios'
import { ApiFormat } from '../Types'


const FetchData = async ({method, url} : ApiFormat) => {
    const URL = `${url}&key=${process.env.VITE_APP_YOUTUBE_API_KEY}`
    const response = await axios({method, url : URL})
    const responseData = response?.data
    return responseData
}


export default FetchData
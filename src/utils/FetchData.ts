import axios from 'axios'
import { ApiFormat } from '../Types'


const FetchData = async ({method, url} : ApiFormat) => {
    const URL = `${url}&key=${process.env.VITE_APP_YOUTUBE_API_KEY}`
    const {data} = await axios({method, url : URL})
    return data
}


export default FetchData
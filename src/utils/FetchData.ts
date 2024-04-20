import axios from 'axios'
import { ApiFormat } from '../Types'


const FetchData = async ({method, url, headers} : ApiFormat) => {
    const URL = `${url}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
    const {data} = await axios({method, url : URL, headers})
    return data
}


export default FetchData
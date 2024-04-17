import { useEffect, useState } from "react"
import fetchData from "./FetchData"
import { ApiFormat } from "../Types"
import ErrorHandler from "./ErrorHandler"

const useAxios = ({method, url, data} : ApiFormat) => {
    const [loading, setLoading] = useState(false)
    const [responseData, setResponseData] = useState(null)
    useEffect(() => {
        (
            async() => {
                try{
                    setLoading(true)
                    const response = await fetchData({method, url, data})
                    setResponseData(response)
                    setLoading(false)   
                }
                catch(err){
                    setLoading(false)
                    ErrorHandler(err)
                }
            }
            )()
        }, [])
    return {loading, data: responseData}
}

export default useAxios
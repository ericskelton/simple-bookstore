import { useState, useEffect } from "react";
import axios from 'axios'

export default function useAxiosGet(url, http_method = 'get'){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState({})
    const [response, setResponse] = useState({}) 

    let axiosMethod = null
    switch(http_method.toLowerCase()){
        case 'get':
            axiosMethod = axios.get
            break
        case 'put':
            axiosMethod = axios.put
            break
        case 'post':
            axiosMethod = axios.post
            break
        default: 
            axiosMethod = axios.get
    }

    
    
    const sendRequest = () => {
        setLoading(true)
        axiosMethod(url).then(res =>{
            setData(res.data)
            setError(false)
            setLoading(false)
            setResponse(res)
        }).catch(err =>{
            setError(true)
            setData(err.data)
            setResponse(err)
            setLoading(false)

        })
        
        
    }
    useEffect(() =>{
        const fetchData = async () =>{
            
            return sendRequest(http_method, url)
        }

        fetchData()

    }, [url])

    return {data, loading, error, response}
}
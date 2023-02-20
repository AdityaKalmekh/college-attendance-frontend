import http from "../http-common";
import { useCallback, useState } from "react";

const useHttp = () => {
    const [error, setError] = useState(null);

    const sendRequest = useCallback( async (requestConfig,applyData) => {
        if (requestConfig.method === 'get'){
            try {
                const responseData = await http.get(requestConfig.url);
                if (!responseData.statusText){
                    throw new Error('Request failed')
                }
                console.log(responseData.data);
                applyData(responseData.data);
            }
            catch(err){
                setError(err.message || "Somthing went wrong")
            }
        }else if (requestConfig.method === 'post'){
            try {
                const responesData = await http.post(requestConfig.url,requestConfig.data)
                applyData(responesData.data)
                console.log(responesData);
                if (!responesData.statusText){
                    throw new Error('Request failed')    
                }
            }catch(err){
                setError(err.message || "Somthing went wrong")
            }
        }else if (requestConfig.method === 'delete'){
            try {
                 const responseData = await http.delete(`${requestConfig.url}?id=${requestConfig.id}`)
                 applyData(responseData.data)
            }catch(err){
                setError(err.message || "Somthing went wrong")
            }
        }else if (requestConfig.method === "put"){
            try {
                const responseData = await http.put(requestConfig.url,requestConfig.data)
                applyData(responseData.data);
            }catch(err){
                setError(err.message || "Somthing went wrong")
            }
        } 
    },[])  

    return {
        error,
        sendRequest
    }
}
export default useHttp
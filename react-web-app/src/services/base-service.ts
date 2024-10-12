import { AxiosRequestConfig } from "axios";
import store, { RootState } from "../store/store";

export default class BaseService
{

    public createHeaders(): AxiosRequestConfig
    {
        const state: RootState = store.getState()
        const token = state.authentication.token

        const config: AxiosRequestConfig<any> = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token !== null) 
        {
             config.headers!['Authorization'] = `Bearer ${token}`
        }

        return config
        
    }
}

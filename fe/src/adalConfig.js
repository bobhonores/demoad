import { AuthenticationContext, adalFetch, adalGetToken, withAdalLogin } from 'react-adal';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const axiosInterceptor = (authContext) => {
    axios.interceptors.request.use(
        async config => {
            let token = await adalGetToken(authContext, process.env.REACT_APP_GATEWAY_ID);

            console.log(token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config
        },
        err => Promise.reject(err)
    );
}

export const endpoint = process.env.REACT_APP_CLIENT_ID;

export const adalConfig = {
    tenant: process.env.REACT_APP_TENANT_ID,
    clientId: process.env.REACT_APP_CLIENT_ID,
    endpoints: {
        api: endpoint,
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
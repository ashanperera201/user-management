import axios from 'axios';

export const baseUrl = 'http://localhost:4011';
// export const baseUrl = 'http://localhost:4001';

// Create axios client, pre-configured with baseURL
const httpApiKit = axios.create({
    baseURL: `${baseUrl}`,
    timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token: string) => {
    httpApiKit.interceptors.request.use((config: any) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
return config;
    });
};

export default httpApiKit;
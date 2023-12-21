import apiKit from '../helpers/axios-http-kit';
import { AxiosResponse } from 'axios';

export const fetchRolesAsync = (): Promise<AxiosResponse> => {
    return apiKit.get(`/api/roles/get-all`);
}

export const saveRolesAsync = (payload: any): Promise<AxiosResponse> => {
    return apiKit.post(`/api/roles/save`, payload);
}

export const updateRoleAsync = (payload: any): Promise<AxiosResponse> => {
    return apiKit.put(`/api/roles/update`, payload)
}

export const deleteRoleAsync = (payload: any): Promise<AxiosResponse> => {
    return apiKit.post(`/api/roles/delete`, payload)
}
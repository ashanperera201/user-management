import apiKit from '../helpers/axios-http-kit';
import { AxiosResponse } from 'axios';

export const savePermissionAsync = (permissionPayload: any): Promise<AxiosResponse> => {
    return apiKit.post(`/api/permissions/save`, permissionPayload);
}

export const fetchPermissionsAsync = (): Promise<AxiosResponse> => {
    return apiKit.get(`/api/permissions/get-all`);
}

export const updatePermissionAsync = (permissionPayload: any): Promise<AxiosResponse> => {
    return apiKit.put(`/api/permissions/update`, permissionPayload)
}

export const deletePermissionAsync = (permissionIds: string[]): Promise<AxiosResponse> => {
    return apiKit.post(`/api/permissions/delete`, permissionIds);
}

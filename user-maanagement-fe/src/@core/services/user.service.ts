
import apiKit from '../helpers/axios-http-kit';
import { IUserServiceResponse } from '../interfaces/user.interface';
import { AxiosResponse } from 'axios';


export const getUserAsync = (userId: string): Promise<any> => {
    return apiKit.get(`/api/user/${userId}`);
}

export const getUserDetailsList = (): Promise<AxiosResponse<IUserServiceResponse>> => {
    return apiKit.get(`/api/user/all-details`);
}

export const registerUserAsync = (userPayload: any): Promise<any> => {
    return apiKit.post(`/api/user/auth/sign-up`, userPayload);
}

export const basicUserUpdate = (userPayload: any): Promise<any> => {
    return apiKit.put(`/api/user/update`, userPayload)
}

export const userDelete = (payload: string[]): Promise<any> => {
    return apiKit.post(`/api/user/delete`, payload);
}

import apiKit from '../helpers/axios-http-kit';
import jwt_decode from "jwt-decode";

export const onUserLoginAsync = (userLogin: any): Promise<any> => {
    return apiKit.post(`/api/auth/login`, userLogin);
}

export const decodeJwtToken = (token: string): any => {
    return jwt_decode(token);
}
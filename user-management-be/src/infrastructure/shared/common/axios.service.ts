import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosService {

    private _axiosInstance: AxiosInstance;

    constructor() {
        this._axiosInstance = axios.create();
    }

    getAxiosInstance = (): AxiosInstance => {
        return this._axiosInstance;
    }

    setAxiosInstance = (axiosInstance: AxiosInstance): void => {
        this._axiosInstance = axiosInstance;
    }
}

import {schoolApi} from "@/api/schoolApi";
import type { AuthResponse } from "../interface/auth.response";

export const checkAuthAction = async() : Promise<AuthResponse> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
       const {data} = await schoolApi.get<AuthResponse>('/auth/check-status');
       localStorage.setItem('token', data.token);
       return data;
    } catch (error) {
       console.log(error);
       localStorage.removeItem('token');
       throw new Error('Token expired or not valid')
    }
}




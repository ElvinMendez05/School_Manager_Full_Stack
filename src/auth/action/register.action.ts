import { schoolApi } from "@/api/schoolApi"
import type { AuthResponse } from "../interface/auth.response"


export const registerAction = async (
    email: string, 
    password: string,
    role: string,
): Promise<AuthResponse> => {
   try {
      const {data} = await schoolApi.post<AuthResponse>('/auth/register', {
        email,
        password,
        role,
      })
      return data;

   } catch (error){
     console.log(error)
     throw error   
   }
} 
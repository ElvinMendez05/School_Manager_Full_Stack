import type { User } from "@/interface/users.interface";

export interface AuthResponse {
    user:  User;
    token: string;
}


import { api } from "@/lib/axios";

export interface SingInBody {
    registration: string
}

export async function singIn({ registration }: SingInBody){
    await api.post('/authenticate', { registration })
}
import { api } from "@/lib/axios";

export interface SingInBody {
    registration: string
    password: string
}

export async function singIn({ registration, password }: SingInBody){
    await api.post('/authenticate', { registration,password  })
}
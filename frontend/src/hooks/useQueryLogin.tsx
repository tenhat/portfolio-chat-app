import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const authLogin = (username: string, password: string) => {
    const data = axios.post('http://localhost:5000/auth/login', {
        username: username,
        password: password
    })
    return data
}

export const useQueryLogin = (username: string, password: string) => {
    return useQuery<any, Error>({
        queryKey: ['login'],
        queryFn: () => authLogin(username, password),
    })
}

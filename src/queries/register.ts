import { useMutation } from "@tanstack/react-query"
import axios from "../lib/axios"
import { RegisterFormData } from "../schemas/registerSchema"

export const useRegisterMutation = () => useMutation({
    mutationFn: async (data: RegisterFormData) => {
        return await axios.post('/api/register', data)
    },
  })
import { useMutation } from "@tanstack/react-query"
import axios from "../lib/axios"
import { LoginFormData } from "../schemas/loginSchema"
import { Login } from "../types/login"

export const useLoginMutation = () => useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await axios.post<Login>('/api/login', data)
    },
  })
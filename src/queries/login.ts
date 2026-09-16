import { useMutation } from "@tanstack/react-query"
import axios from "../lib/axios"
import { LoginFormData } from "../schemas/loginSchema"

export const useLoginMutation = () => useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await axios.post<{access_token: string}>('/api/login', data)
    },
  })
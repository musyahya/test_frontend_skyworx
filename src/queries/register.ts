import { useMutation } from "@tanstack/react-query"
import axios from "../lib/axios"
import { RegisterFormData } from "../schemas/registerSchema"

export const useRegisterMutation = () => useMutation({
    mutationFn: (data: RegisterFormData) => {
      return axios.post('/register', data)
    },
  })
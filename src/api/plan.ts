import request from '@/request'

interface Plan {
  created_at: number
  description: string
  id: number
  name: string
  price: number
  updated_at: number
}

export const GetPlans = () => {
  return request.get<Plan[]>('/v1/plan')
}

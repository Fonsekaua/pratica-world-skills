import { VacancyType } from "../types/Vagacy"
import api from "./api"

export const createVagacy = async (data: VacancyType) => {
  const response = await api.post('/api/vagas', data)
  return response.data
}

export const findManyVacancies = async () => {
  const response = await api.get('/api/vagas')
  return response.data
}
export const deleteVacancy = async (id: string) => {
  const response = await api.delete(`/api/vagas/${id}`)
  return response.data
}

export const findVacancy = async (id: string) => {
  const response = await api.get(`/api/vagas/${id}`)
  return response.data
}

export const editVacancy = async (id: string, vacancy: VacancyType) => {
  const response = await api.put(`/api/vagas/${id}`, vacancy)
  return response.data
}

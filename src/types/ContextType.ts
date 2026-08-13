import { User } from "./User"
import { VacancyType } from "./Vagacy"


export type ContextType = {
    logged: boolean
    setLogged:(e: boolean) => void 
    vacancies: VacancyType[]
    setVacancies: (e: VacancyType[]) => void
    user: User | null
    setUser: (e: User) => void
}
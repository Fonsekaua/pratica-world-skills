import { VacancyType } from "./Vagacy"


export type ContextType = {
    logged: boolean
    setLogged:(e: boolean) => void 
    vacancies: VacancyType[]
    setVacancies: (e: VacancyType[]) => void
}
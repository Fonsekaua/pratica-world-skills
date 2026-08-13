'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ContextType } from "../types/ContextType";
import { children } from "../types/Children";
import { findManyVacancies } from "../services/authService";
import { VacancyType } from "../types/Vagacy";

export const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: children) => {
    const [logged, setLogged] = useState(false)
    const [vacancies, setVacancies] = useState<VacancyType[]>([]);
    useEffect(() => {
        const getLogged = () => {
            const token = localStorage.getItem("token")
            setLogged(!!token)

        }

        getLogged()
    }, [logged])

    useEffect(() => {
        const getVacancy = async() => {
            const response = await findManyVacancies()
            setVacancies(response)
        }

        getVacancy()
    },[])
    
    const ContextValue: ContextType = {
        logged,
        setLogged,
        vacancies,
        setVacancies
    }

    return (
        <AuthContext.Provider value={ContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useUser deve ser usado dentro de um UserProvider");
    }

    return ctx;

}
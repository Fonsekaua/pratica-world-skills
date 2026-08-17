'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ContextType } from "../types/ContextType";
import { children } from "../types/Children";
import { perfil, findManyVacancies } from "../services/authService";
import { VacancyType } from "../types/Vagacy";
import { User } from "../types/User";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: children) => {
    type PerfilResponse = {
        usuario: User;
    };
    const router = useRouter()
    const [logged, setLogged] = useState(false)
    const [vacancies, setVacancies] = useState<VacancyType[]>([]);
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const getLogged = () => {
            const token = localStorage.getItem("token")
            if (token) {
                setLogged(true)
            } else {
                setLogged(false)
                setVacancies([])
            }

        }

        getLogged()
    }, [logged])
    useEffect(() => {
        console.clear()
    },[])
    useEffect(() => {

        if (!logged) return

        const getVacancies = async () => {

            try {

                const response = await findManyVacancies()

                if (Array.isArray(response)) {

                    setVacancies(response)

                } else {

                    setVacancies([])

                }

            } catch (error) {

                console.error(
                    "Erro ao buscar vagas:",
                    error
                )

                setVacancies([])
            }
        }

        getVacancies()

    }, [logged])

    useEffect(() => {

        if (!logged) return

        const getUser = async () => {

            try {

                const data: PerfilResponse = await perfil()

                if (data?.usuario) {

                    setUser(data.usuario)

                } else {

                    localStorage.removeItem("token")

                    setLogged(false)
                    setUser(null)
                    setVacancies([])

                    router.push("/auth/login")
                }

            } catch (error) {

                console.error(
                    "Erro ao buscar perfil:",
                    error
                )

                localStorage.removeItem("token")

                setLogged(false)
                setUser(null)
                setVacancies([])

                router.push("/auth/login")
            }
        }

        getUser()

    }, [logged, router])

    const ContextValue: ContextType = {
        logged,
        setLogged,
        vacancies,
        setVacancies,
        user,
        setUser
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
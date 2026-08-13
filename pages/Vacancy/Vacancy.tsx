'use client'
import CardVacancy from "@/src/components/CardVacancy/CardVacancy"
import Input from "@/src/components/Input/Input"
import { useAuth } from "@/src/contexts/AuthContext"
import { createVagacy, deleteVacancy } from "@/src/services/authService"
import { VacancyType } from "@/src/types/Vagacy"

import React, { ChangeEvent, FormEvent, SubmitEventHandler, useState } from "react"

const Vacancy = () => {
    const { vacancies, setVacancies } = useAuth()
    const [modal, setModal] = useState(false)
    const [vacancy, setVacancy] = useState<VacancyType>({
        title: '',
        company: '',
        description: '',
        location: '',
        status: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setVacancy(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await createVagacy(vacancy)

        const newList = vacancies
        newList.push(vacancy)
        setVacancies(newList)

        console.log(response)
        setModal(!modal)

        setVacancy({
            title: '',
            company: '',
            description: '',
            location: '',
            status: ''
        })

    }

 


    console.log(vacancies)
    return (
        <>
            {
                modal &&
                <div className="w-screen h-screen bg-[#0a0a0a] fixed flex justify-center items-center top-0 left-0">
                    <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <h2 className="text-2xl text-center font-medium text-sky-500">
                            Crie sua nova vaga
                        </h2>
                        <Input name="title" onChange={handleChange} placeholder="Digite o titulo da sua vaga..." type="text" value={vacancy.title} />
                        <Input name="company" onChange={handleChange} placeholder="Digite a empresa da sua vaga..." type="text" value={vacancy.company} />
                        <Input name="description" onChange={handleChange} placeholder="Descreva sua vaga..." type="text" value={vacancy.description} />
                        <Input name="location" onChange={handleChange} placeholder="Digite a localização da sua vaga..." type="text" value={vacancy.location} />
                        <Input name="status" onChange={handleChange} placeholder="Digite os status da sua vaga..." type="text" value={vacancy.status} />
                        <div className="flex items-center gap-2 justify-between *:w-full *:p-2 *:rounded-md *:cursor-pointer *:font-medium mt-5">
                            <button className="border border-rose-500 bg-rose-500 " onClick={(e) => {
                                e.preventDefault(); setModal(!modal)
                            }
                            }>
                                Cancelar
                            </button>
                            <button className="border border-emerald-500 bg-emerald-500">
                                Criar
                            </button>
                        </div>
                    </form>
                </div>
            }
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <h1 className=" text-3xl font-bold">
                        Minhas vagas
                    </h1>
                    <button className="p-4 px-5 bg-sky-500 font-medium rounded-xl" onClick={() => setModal(!modal)}>
                        Criar Vaga
                    </button>
                </div>
                <div className="rounded-2xl w-5xl border border-zinc-800  bg-zinc-900 p-2 flex flex-col overflow-scroll gap-2 min-h-[38rem] max-h-[56rem]">
                    {
                        vacancies.map((element, index) => (

                            <CardVacancy key={index} vacancy={element}/>

                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Vacancy
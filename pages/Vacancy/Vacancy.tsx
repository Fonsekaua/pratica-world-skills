'use client'
import CardVacancy from "@/src/components/CardVacancy/CardVacancy"
import Input from "@/src/components/Input/Input"
import TextArea from "@/src/components/TextArea/TextArea"
import { useAuth } from "@/src/contexts/AuthContext"
import { createVagacy, editVacancy } from "@/src/services/vacancyService"
import { VacancyType } from "@/src/types/Vagacy"
import axios from "axios"

import { ChangeEvent, FormEvent, useState } from "react"
import {  FaFrown, FaSmile } from "react-icons/fa"


const Vacancy = () => {
    const { vacancies, setVacancies, user } = useAuth()
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState('')
    const [err, setErr] = useState('')
    const [vacancy, setVacancy] = useState<VacancyType>({
        title: '',
        company: '',
        description: '',
        location: '',
        status: 'aberta'
    })
    const [hover, setHover] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setVacancy(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (edit) {
                const response = await editVacancy(edit, vacancy)

                const newList = vacancies.filter(e => e.id != edit);
                newList.push(response.vaga)
                setVacancies(newList)
                setEdit('')
            } else {
                const response = await createVagacy(vacancy)
                const newList = vacancies
                newList.push(response.vaga)
                setVacancies(newList)
            }
            setModal(!modal)

            setVacancy({
                title: '',
                company: '',
                description: '',
                location: '',
                status: 'aberta'
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErr(error.response?.data.mensagem)
                console.log(err)
            }
        }
    }

    const handleEditClick = async (id: string) => {
        setEdit(id)
        setModal(!modal)
        const editVacancy = vacancies.find(e => e.id == id);
        if (!editVacancy) return
        setVacancy(
            {
                title: editVacancy?.title,
                company: editVacancy.company,
                description: editVacancy.description,
                location: editVacancy.location,
                status: editVacancy.status
            }
        )
    }

    const cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setModal(!modal)
        setEdit('')
        setVacancy({
            title: '',
            company: '',
            description: '',
            location: '',
            status: 'aberta'
        })

        console.clear()
    }
    return (
        <>
            {
                modal &&
                <div className="w-screen h-screen bg-[#0a0a0a] fixed flex justify-center items-center top-0 left-0 z-10">
                    <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <h2 className="text-2xl text-center font-medium text-sky-500">
                            {edit ? "Edite a sua vaga" : "Crie sua nova vaga"}
                        </h2>
                        <Input name="title" onChange={handleChange} placeholder="Digite o titulo da sua vaga..." type="text" value={vacancy.title} />
                        <Input name="company" onChange={handleChange} placeholder="Digite a empresa da sua vaga..." type="text" value={vacancy.company} />
                        <TextArea name="description" onChange={handleChange} placeholder="Descreva sua vaga..." value={vacancy.description} />
                        <Input name="location" onChange={handleChange} placeholder="Digite a localização da sua vaga..." type="text" value={vacancy.location} />
                        <Input name="status" onChange={handleChange} placeholder="Digite os status da sua vaga..." type="text" value={vacancy.status} />
                        <div className="flex items-center gap-2 justify-between *:w-full *:p-2 *:rounded-md *:cursor-pointer *:font-medium mt-5">
                            <button className="border border-rose-500 bg-rose-500 " onClick={cancel}>
                                Cancelar
                            </button>
                            <button className="border border-emerald-500 bg-emerald-500">
                                 {edit ? "Editar" : "Criar"}
                            </button>
                        </div>
                    </form>
                </div>
            }
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <h1 className=" text-3xl font-bold">
                        Minhas vagas {edit}
                    </h1>
                    <button className="p-4 px-5 bg-sky-500 font-medium rounded-xl cursor-pointer" onClick={() => setModal(!modal)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        Criar Vaga
                    </button>
                </div>
                <div className="rounded-2xl w-[65.7rem] border border-zinc-800  bg-zinc-900 p-2 flex flex-wrap overflow-scroll gap-2 min-h-[38rem] max-h-[56rem]">
                    {
                        vacancies.length >= 1 ? (
                            vacancies.map((element, index) => (

                                <CardVacancy key={index} vacancy={element} handleEditClick={handleEditClick} />

                            ))
                        ) : (
                            <div className="w-full h-96 flex flex-col gap-10 items-center justify-center">
                                <h2 className="text-zinc-400 font-bold text-2xl relative flex items-center gap-2 transition-all">
                                    Nenhuma vaga criada por <span className="underline">{user?.nome}</span>
                                    <span className={`absolute right-0 translate-x-24 transition-all inline-block ${hover ? " opacity-100" : " opacity-0 z-10"}`}>ainda...</span>
                                </h2>
                                <div className="relative">
                                    <FaFrown size={50} className={`transition-all text-zinc-400 opacity-0 absolute ${!hover && "opacity-100"}`} />
                                    <FaSmile size={50} className={`transition-all text-zinc-400 opacity-0 absolute ${hover && "opacity-100"}`} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Vacancy
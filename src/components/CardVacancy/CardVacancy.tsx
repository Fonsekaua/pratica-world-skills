'use client'

import { useAuth } from "@/src/contexts/AuthContext"
import { deleteVacancy } from "@/src/services/authService"
import { VacancyType } from "@/src/types/Vagacy"
import { useState } from "react"

type Props = {
    vacancy: VacancyType
    handleEditClick: (id: string) => void
}

const CardVacancy = ({ vacancy, handleEditClick }: Props) => {

    const { vacancies, setVacancies } = useAuth()

    const [showModal, setShowModal] = useState(false)

    const del = async (id: string) => {
        try {
            const response = await deleteVacancy(id)

            console.log(response)

            const list = vacancies.filter(x => x.id !== id)

            setVacancies(list)

        } catch (error) {
            console.error("Erro ao deletar vaga:", error)
        }
    }

    const handleShow = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <>
            {/* CARD */}
            <div className="w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-6 h-72 text-white shadow-lg">

                <div className="flex items-start justify-between gap-4">

                    <div>
                        <h2 className="text-xl font-bold">
                            {vacancy.title}
                        </h2>

                        <p className="mt-1 text-sm text-zinc-400">
                            {vacancy.company}
                        </p>
                    </div>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            vacancy.status === "aberta"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-rose-500/10 text-rose-400"
                        }`}
                    >
                        {vacancy.status}
                    </span>

                </div>

                <p className="mt-6 line-clamp-3 text-sm leading-6 text-zinc-300">
                    {vacancy.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
                    <span>📍</span>
                    <span>{vacancy.location}</span>
                </div>

                <div className="mt-8 flex flex-col items-start gap-5">

                    <span className="text-xs text-zinc-500">
                        Oportunidade de emprego
                    </span>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => handleEditClick(vacancy.id as string)}
                            className="rounded-lg bg-yellow-200 px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                        >
                            Editar vaga
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                del(vacancy.id as string)
                            }}
                            className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                        >
                            Deletar
                        </button>

                        <button
                            onClick={handleShow}
                            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                        >
                            Ver vaga
                        </button>

                    </div>
                </div>
            </div>


            {/* MODAL */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={handleClose}
                >

                    <div
                        className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 p-7 text-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* CABEÇALHO */}
                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <h2 className="text-3xl font-bold">
                                    {vacancy.title}
                                </h2>

                                <p className="mt-2 text-zinc-400">
                                    {vacancy.company}
                                </p>
                            </div>

                            <button
                                onClick={handleClose}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition hover:bg-rose-500 hover:text-white"
                            >
                                ✕
                            </button>

                        </div>


                        {/* STATUS */}
                        <div className="mt-6">

                            <span
                                className={`inline-block rounded-full px-4 py-2 text-sm font-medium ${
                                    vacancy.status === "aberta"
                                        ? "bg-green-500/10 text-green-400"
                                        : "bg-rose-500/10 text-rose-400"
                                }`}
                            >
                                {vacancy.status}
                            </span>

                        </div>


                        {/* INFORMAÇÕES */}
                        <div className="mt-8 grid grid-cols-2 gap-4">

                            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                <p className="text-xs text-zinc-500">
                                    Empresa
                                </p>

                                <p className="mt-1 font-medium">
                                    {vacancy.company}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                <p className="text-xs text-zinc-500">
                                    Localização
                                </p>

                                <p className="mt-1 font-medium">
                                    📍 {vacancy.location}
                                </p>
                            </div>

                            {vacancy.id && (
                                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                    <p className="text-xs text-zinc-500">
                                        ID da vaga
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium">
                                        {vacancy.id}
                                    </p>
                                </div>
                            )}

                            {vacancy.userId && (
                                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                    <p className="text-xs text-zinc-500">
                                        ID do usuário
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium">
                                        {vacancy.userId}
                                    </p>
                                </div>
                            )}

                        </div>


                        {/* DESCRIÇÃO */}
                        <div className="mt-6">

                            <h3 className="text-lg font-semibold">
                                Descrição
                            </h3>

                            <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5">

                                <p className="whitespace-pre-wrap leading-7 text-zinc-300">
                                    {vacancy.description}
                                </p>

                            </div>

                        </div>


                        {/* DATAS */}
                        {(vacancy.createdAt || vacancy.updatedAt) && (
                            <div className="mt-6 grid grid-cols-2 gap-4">

                                {vacancy.createdAt && (
                                    <div>
                                        <p className="text-xs text-zinc-500">
                                            Criada em
                                        </p>

                                        <p className="mt-1 text-sm text-zinc-300">
                                            {new Date(
                                                vacancy.createdAt
                                            ).toLocaleString("pt-BR")}
                                        </p>
                                    </div>
                                )}

                                {vacancy.updatedAt && (
                                    <div>
                                        <p className="text-xs text-zinc-500">
                                            Atualizada em
                                        </p>

                                        <p className="mt-1 text-sm text-zinc-300">
                                            {new Date(
                                                vacancy.updatedAt
                                            ).toLocaleString("pt-BR")}
                                        </p>
                                    </div>
                                )}

                            </div>
                        )}


                        {/* RODAPÉ */}
                        <div className="mt-8 flex justify-end gap-3">

                            <button
                                onClick={handleClose}
                                className="rounded-lg bg-orange-400 px-5 py-2.5 font-medium text-black transition hover:bg-orange-300"
                            >
                                Fechar
                            </button>

                            

                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default CardVacancy
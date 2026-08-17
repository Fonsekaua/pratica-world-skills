'use client'

import { useAuth } from "@/src/contexts/AuthContext"
import { deleteVacancy } from "@/src/services/authService"
import { VacancyType } from "@/src/types/Vagacy"
import { useEffect, useState } from "react"

type Props = {
    vacancy: VacancyType
    handleEditClick: (id: string) => void
}

const CardVacancy = ({ vacancy, handleEditClick }: Props) => {

    const { vacancies, setVacancies } = useAuth()

    const [showModal, setShowModal] = useState(false)
    const [delModal, setDelModal] = useState(false)
    const [time,setTime] = useState(10)
    const del = async (id: string) => {
        try {
            const response = await deleteVacancy(id)


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
useEffect(() => {
    if (!delModal) return;

    const interval = setInterval(() => {
        setTime(prev => {
            if (prev <= 1) {
                clearInterval(interval);
                return 0;
            }

            return prev - 1;
        });
    }, 1000);
    
    return () => clearInterval(interval);
}, [delModal]);

    if(time == 0) {
        setDelModal(!del)
        setTime(10)
    }

    
    return (
        <>
            
            {
                delModal && (
                   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">

        {/* Conteúdo */}
        <div className="flex flex-col items-center px-8 pt-8 pb-6 text-center">

            {/* Ícone */}
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 ring-8 ring-rose-500/5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-8 w-8 text-rose-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v4m0 4h.01M10.3 3.8 2.7 17a2 2 0 0 0 1.74 3h15.12a2 2 0 0 0 1.74-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
                    />
                </svg>
            </div>

            {/* Título */}
            <h2 className="text-xl font-semibold text-white">
                Excluir vaga?
            </h2>

            {/* Descrição */}
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
                Tem certeza de que deseja apagar esta vaga?
                <br />
                Essa ação não poderá ser desfeita.
            </p>

            {/* Contador */}
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 px-4 py-2">
                <span className="text-2xl font-semibold text-rose-500">
                    {time}
                </span>

                <span className="text-sm text-rose-400">
                    segundos
                </span>
            </div>
        </div>

        {/* Rodapé */}
        <div className="flex gap-3 border-t border-white/10 bg-zinc-900/40 px-8 py-5">
            <button
                className="flex-1 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                onClick={() => setTime(0)}
                >
                Cancelar
            </button>

            <button
                className="flex-1 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500 active:scale-[0.98]"
            onClick={(e) => {
                e.preventDefault()
                del(vacancy.id as string)
                setTime(0)
            }}
            >
                Confirmar
            </button>
        </div>
    </div>
</div>
                )
            }
            
            {/* CARD */}
            <div className="w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-6 min-h-72 h-80 text-white shadow-lg">

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

                <p className="mt-6 line-clamp-2  h-12 text-sm leading-6 text-zinc-300 cursor-default " title={vacancy.description}>
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
                                setDelModal(!delModal)
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
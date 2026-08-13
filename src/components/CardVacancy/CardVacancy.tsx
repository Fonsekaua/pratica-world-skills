'use client'
import { useAuth } from "@/src/contexts/AuthContext";
import { deleteVacancy } from "@/src/services/authService";
import { VacancyType } from "@/src/types/Vagacy";
type Props = {
    vacancy: VacancyType

}
const CardVacancy = ({ vacancy }: Props) => {
    const { vacancies, setVacancies } = useAuth()
    const del = async (e: string) => {
        const response = await deleteVacancy(e)
        console.log(response)
        const list = vacancies.filter(x => x.id != e);
        setVacancies(list)
    }
     const edit = async (e: string) => {
        const response = await deleteVacancy(e)
        console.log(response)
        const list = vacancies.filter(x => x.id != e);
        setVacancies(list)
    }
     const show = async (e: string) => {
        const response = await deleteVacancy(e)
        console.log(response)
        const list = vacancies.filter(x => x.id != e);
        setVacancies(list)
    }
    return (
        <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-6 min-h-72 text-white shadow-lg">

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold">
                        {vacancy.title}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                        {vacancy.company}
                    </p>
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-medium ${vacancy.status == 'aberta' ? "bg-green-500/10 text-green-400" : "bg-rose-500/10 text-rose-400"}`}>
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

                <div className="flex items-center gap-2 *:font-medium">
                    <button data-id={vacancy.id} className="rounded-lg bg-yellow-200 px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
                        Editar vaga
                    </button>
                    <button data-id={vacancy.id} onClick={(e) => {
                        e.preventDefault()
                        del(vacancy.id as string)
                    }} className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
                        Deletar
                    </button>
                    <button className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
                        Ver vaga
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardVacancy;


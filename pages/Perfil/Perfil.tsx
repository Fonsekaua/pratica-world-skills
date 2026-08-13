'use client'
import { useAuth } from "@/src/contexts/AuthContext";
import { dashboard } from "@/src/services/authService"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
type User = {
    id: string;
    nome: string;
    email: string;
    criadoEm: string;
};

type DashboardResponse = {
    usuario: User;
};
const Perfil = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const { setLogged } = useAuth()
    useEffect(() => {
        const getUser = async () => {
            try {
                const data: DashboardResponse = await dashboard();
                if (data) {
                    setUser(data.usuario);
                } else {
                    localStorage.removeItem("token");
                    router.push("/auth/login");
                }
            } catch (error) {
                console.log(error)
            }
        };

        getUser();
    }, [router, user]);
    const handleClick = () => {
        localStorage.removeItem('token')
        setLogged(false)
        router.push('/auth/login')
    }
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                Meu Perfil
            </h1>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8  w-4xl">

                {/* Cabeçalho */}
                <div className="flex flex-col items-center gap-4 sm:flex-row">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-4xl font-bold">
                        {user?.nome.charAt(0)}
                    </div>

                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-semibold">
                            {user?.nome}
                        </h2>

                        <p className="text-zinc-400">
                            {user?.email}
                        </p>
                    </div>

                </div>


                {/* Informações */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                        <span className="text-sm text-zinc-500">
                            ID do usuário
                        </span>

                        <p className="mt-2 break-all text-sm">
                            {user?.id}
                        </p>
                    </div>


                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                        <span className="text-sm text-zinc-500">
                            Conta criada em
                        </span>

                        <p className="mt-2">
                            {new Date(user?.criadoEm ?? "")
                                .toLocaleDateString("pt-BR")}
                        </p>
                    </div>

                </div>


                {/* Ações */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                    {/* <button className="rounded-xl bg-emerald-500 px-6 py-3 font-medium transition hover:bg-emerald-600 active:scale-95">
          Editar perfil
        </button> */}

                    <button onClick={handleClick} className="rounded-xl border border-red-500 px-6 py-3 font-medium text-red-400 transition hover:bg-red-500/10 active:scale-95">
                        Sair da conta
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Perfil
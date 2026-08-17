'use client'
import { useAuth } from "@/src/contexts/AuthContext";
import { logout } from "@/src/services/authService";
import { uploadImage } from "@/src/services/perfilSerivce";
import axios from "axios";
import { ChangeEvent, useState } from "react"


const Perfil = () => {
    const [err, setErr] = useState('')
    const { setLogged, user } = useAuth()
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const handleClick = async () => {
        try {
            await logout()
            localStorage.removeItem('token')
            setLogged(false)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErr(error.response?.data.mensagem)
                console.log(err)
            }
        }
    }
    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return

        const file = event.target.files[0]

        const url = URL.createObjectURL(file)

        setPreviewImage(url)

        const formData = new FormData()

        formData.append('image', file)

        try {
            await uploadImage(formData)
        } catch (err) {
            console.log("Ocorreu um erro: ", err)
        }

    }
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                Meu Perfil
            </h1>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8  w-4xl">

                {/* Cabeçalho */}
                <div className="flex flex-col items-center gap-4 sm:flex-row">

                    <fieldset className="flex h-24 w-24 items-center justify-center border-2   rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-4xl font-bold relative">

                        <legend className="absolute z-50 right-0 bottom-0 bg-sky-500 cursor-pointer active:scale-90 transition-all border-2 border-white w-8 h-8 flex items-center justify-center rounded-full font-medium ">
                            <input type="file" className="w-full h-full absolute opacity-0 inset-0 cursor-pointer" onChange={handleChange} accept="image/*" />
                                +
                            </legend>
                        {
                            user?.profileImage || previewImage ? (
                                <img
                                    src={
                                        previewImage
                                            ? previewImage
                                            : `https://api-estudos-joao.shop/${user?.profileImage}`
                                    }
                                    className="w-full h-full rounded-full object-cover"
                                    alt="Foto de perfil"
                                />
                            ) : (
                                user?.nome?.charAt(0)
                            )
                        }
                    </fieldset>
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
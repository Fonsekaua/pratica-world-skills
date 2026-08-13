'use client'
import Input from '@/src/components/Input/Input'
import { useAuth } from '@/src/contexts/AuthContext'
import { login } from '@/src/services/authService'
import { LoginData } from '@/src/types/LoginData'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

const Login = () => {
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        senha: ''
    })
    const [err, setErr] = useState('')
    const router = useRouter()
    const { logged, setLogged } = useAuth()
    const { email, senha } = formData
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            const response = await login(formData)
            localStorage.setItem("token", response.token);
            setLogged(true)
            router.push('/dashboard/perfil')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErr(error.response?.data.mensagem)
            }
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setErr('')
        }, 2500);
    }, [err]);
    useEffect(() => {
        if (logged) {
            router.push('/dashboard/perfil')
        }
    }, [logged, router])
    return (
        <>
            <form className='flex relative flex-col items-center gap-10 w-fit' onSubmit={handleSubmit}>
                {

                    <div className={`text-rose-500 duration-500 transition-all absolute top-[-200px] font-bold opacity-0 ${err && "translate-y-20 opacity-100"} flex flex-col items-center justify-center gap-2`}>
                        <h1 className='w-10 h-10 rounded-full flex items-center justify-center border-3'>
                            X
                        </h1>
                        <p>{err}</p>
                    </div>

                }
                <h2 className='text-2xl font-medium'>
                    Formulario de Login {logged ? "Logado" : "não logado"}
                </h2>

                <div className={`flex flex-col gap-2`}>
                    <Input name='email' value={email} onChange={handleChange} type='email' placeholder='Digite seu email...' />
                    <Input name='senha' value={senha} onChange={handleChange} type='password' placeholder='Digite sua senha...' />
                </div>
                <button className='w-sm rounded-md p-3 bg-emerald-400 transition-all cursor-pointer hover:bg-emerald-500 active:scale-95'>
                    Fazer login
                </button>

                <div className='flex items-center justify-center w-full gap-2'>
                    <span className='inline-block h-0.5  w-full bg-mist-700 rounded-full'></span>
                    <p className='text-mist-600 text-lg font-bold'>x</p>
                    <span className='inline-block h-0.5 w-full bg-mist-700 rounded-full'></span>
                </div>
                <Link href={'/auth/register'}>
                    Não possui conta? <span className='font-medium text-sky-400 underline'>crie uma agora!</span>
                </Link>
            </form>
        </>
    )
}

export default Login;
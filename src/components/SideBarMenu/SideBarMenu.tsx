'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideBarMenu = () => {
    const pathname = usePathname()
    const endPathname = pathname?.split("/").filter(Boolean).pop();
    return (
        <menu className="flex flex-col items-center gap-10 pt-24">
            
            <Link href={'/dashboard/perfil'} className={`p-5 px-16 font-medium ${endPathname == "perfil" ? "bg-emerald-500": "border border-mist-300"} rounded-lg`}>
                Perfil
            </Link>
            <Link href={'/dashboard/vagas'} className={`p-5 px-16 font-medium  ${endPathname == "vagas" ? "bg-emerald-500" : "border border-mist-300"} rounded-lg`}>
                Vagas
            </Link>
        </menu>
    )
}

export default SideBarMenu
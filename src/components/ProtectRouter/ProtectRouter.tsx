"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { children } from "@/src/types/Children";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectRouter({ children }: children) {
    const { logged } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!logged) {
            router.push("/auth/login");
        }
    }, [router,logged]);

    if (!logged) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
}
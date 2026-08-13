export type VacancyType = {
    id?: string
    userId?: string
    createdAt?: string
    updatedAt?: string
    title: string;
    description: string;
    company: string;
    location: string;
    status: "aberta" | "fechada";
};
export type VacancyType = {
    id?: string
    userId?: string
    title: string;
    description: string;
    company: string;
    location: string;
    status: "aberta" | "fechada" | '';
};
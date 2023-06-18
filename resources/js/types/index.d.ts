export interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    cpf: string;
    phone: string;
    cep: string;
    birth: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

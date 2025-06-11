export type User = {
    handle: string;
    name: string;
    email: string;
    password: string;
}

export type RegisterFormData = Pick<User, "name" | "email" | "handle" > & {
    password : string;
    password_confirmation: string;
}

export type LoginFormData = Pick<User, "email" > & {
    password : string;
};
export interface IUser {
    _id: string,
    email: string,
    roles: string[]
}

export interface ICandidat {
    name: string,
    surname: string,
    email: string,
    password: string
}

export interface ICredentials {
    email: string,
    password: string
}


import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(
        private usersRpository: UsersRepository
    ) {}

    async execute({email, password} : AuthenticateUseCaseRequest) : Promise<AuthenticateUseCaseResponse> {
        //buscar user no banco pelo e-mail
        const user = await this.usersRpository.findByEmail(email);

        if(!user) {
            throw new InvalidCredentialsError()
        }
        
        //comparar senha
        const doesPasswordMatches = await compare(password, user.password_hash) 
        if(!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}
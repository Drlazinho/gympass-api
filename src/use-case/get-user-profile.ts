import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(
        private usersRpository: UsersRepository
    ) {}

    async execute({userId} : GetUserProfileUseCaseRequest) : Promise<GetUserProfileUseCaseResponse> {
        // Buscar user pelo ID
        const user = await this.usersRpository.findById(userId);

        if(!user) {
            throw new ResourceNotFoundError()
        }
    
        return {
            user
        }
    }
}
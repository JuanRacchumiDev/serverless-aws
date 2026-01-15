// src/core/use-cases/get-user.use-case.ts
import { UserRepository } from "../repository/user.repository";
import { User } from "../entities/user.entity";

export class GetUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(id: string): Promise<User | null> {
        if (!id) throw new Error("User ID is required");

        const user = await this.userRepository.getById(id);
        return user;
    }
}
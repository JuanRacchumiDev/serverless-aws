import { User } from "../entities/user.entity"
import { UserRepository } from "../repository/user.repository"

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(userData: User): Promise<User> {
        return await this.userRepository.create(userData)
    }
}
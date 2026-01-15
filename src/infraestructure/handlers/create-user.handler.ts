import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { DynamoUserRepository } from "../database/dynamo-user.repository"
import { CreateUserUseCase } from "../../core/use-cases/create-user.use-case"
import { v4 as uuid } from "uuid"

const userRepository = new DynamoUserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = JSON.parse(event.body || "{}")
        const newUser = { id: uuid(), ...body }

        const result = await createUserUseCase.execute(newUser)

        return {
            statusCode: 201,
            body: JSON.stringify(result)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        }
    }
}
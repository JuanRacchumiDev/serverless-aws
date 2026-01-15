// src/infrastructure/handlers/get-user.handler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoUserRepository } from "../database/dynamo-user.repository";
import { GetUserUseCase } from "../../core/use-cases/get-user.use-case";

// Inyección de dependencias manual
const userRepository = new DynamoUserRepository();
const getUserUseCase = new GetUserUseCase(userRepository);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters?.id;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing id parameter" }),
            };
        }

        const user = await getUserUseCase.execute(id);

        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: `User with id ${id} not found` }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(user),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
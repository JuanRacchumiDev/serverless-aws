import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"
import { UserRepository } from "../../core/repository/user.repository"
import { User } from "../../core/entities/user.entity"
// import dotenv from "dotenv"

export class DynamoUserRepository implements UserRepository {
    private client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
    private tableName = process.env.TABLE_NAME

    async create(user: User): Promise<User> {
        await this.client.send(new PutCommand({
            TableName: this.tableName,
            Item: user
        }))
        return user
    }

    async getById(id: string): Promise<User | null> {
        const response = await this.client.send(new GetCommand({
            TableName: this.tableName,
            Key: { id }
        }))
        return (response.Item as User) || null
    }

}
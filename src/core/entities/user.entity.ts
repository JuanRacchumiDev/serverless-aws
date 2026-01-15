export interface User {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'USER'
    createdAt: string
    isActive: boolean
}

export class UserEntity implements User {
    id: string
    name: string
    email: string
    role: "ADMIN" | "USER"
    createdAt: string
    isActive: boolean

    constructor(data: User) {
        this.id = data.id
        this.name = data.name
        this.email = data.email
        this.role = data.role
        this.createdAt = data.createdAt
        this.isActive = data.isActive
    }

    public static createNew(name: string, email: string, id: string): UserEntity {
        return new UserEntity({
            id,
            name,
            email,
            role: 'USER',
            createdAt: new Date().toISOString(),
            isActive: true
        })
    }

}
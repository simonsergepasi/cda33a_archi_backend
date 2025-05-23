import { User } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user-repository.interface";

export class InMemoryUserRepository implements IUserRepository {
    users: User[]

    constructor() {
        this.users = []
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.props.email === email) ?? null;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.props.id === id) ?? null;
    }
}
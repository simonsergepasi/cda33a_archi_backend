import * as jwt from 'jsonwebtoken';
import { User } from "../entities/user.entity";
import { IAuthenticator } from "../interfaces/authenticator.interface";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { JWTPayload } from '../types/jwt-payload.type';

export class JwtAuthenticator implements IAuthenticator {
    constructor(
        private readonly userRepository: IUserRepository,
        private SECRET: string
    ) {}

    async authenticate(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, this.SECRET) as JWTPayload
            const user = await this.userRepository.findByEmail(decoded.email);
            if(!user) throw new Error("User not found");
            return user
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError) throw new Error("Token is expired")
            if(error.message === "User not found") throw error;
            throw new Error("Invalid token")
        }
    }
}
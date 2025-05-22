import { config } from "../../app/config/get-env";
import { User } from "../../entities/user.entity";
import { Container } from "../../types/container.type";
import { JWTPayload } from "../../types/jwt-payload.type";
import { IFixture } from "./fixture.interface";
import * as jwt from 'jsonwebtoken';

export class UserFixture implements IFixture {
    constructor(public entity: User) {}

    async load(container: Container): Promise<void> {
        const repository = container.resolve('userRepository');
        await repository.save(this.entity);
    }

    createBasicAuthorization() {
        return 'Basic ' + Buffer
                        .from(`${this.entity.props.email}:${this.entity.props.password}`)
                        .toString('base64')
    }

    createJwtAuthorization() {
        const payload : JWTPayload = {email: this.entity.props.email}
        return "Bearer " + jwt.sign(payload, config.secretKey, {expiresIn: '1d'})
    }
}
import { User } from "../../entities/user.entity";
import { Container } from "../../types/container.type";
import { IFixture } from "./fixture.interface";

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
}
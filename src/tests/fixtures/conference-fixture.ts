import { Conference } from "../../entities/conference.entity";
import { Container } from "../../types/container.type";
import { IFixture } from "./fixture.interface";

export class ConferenceFixture implements IFixture {
    constructor(public entity: Conference) {}

    async load(container: Container): Promise<void> {
        const repository = container.resolve('conferenceRepository');
        await repository.save(this.entity);
    }
}
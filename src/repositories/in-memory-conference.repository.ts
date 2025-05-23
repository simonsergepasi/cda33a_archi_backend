import { Conference } from "../entities/conference.entity";
import { IConferenceRepository } from "../interfaces/conference-repository.interface";

export class InMemoryConferenceRepository implements IConferenceRepository {
    conferences: Conference[]

    constructor() {
        this.conferences = []
    }

    async findById(id: string) : Promise<Conference | null> {
        return this.conferences.find(conference => conference.props.id === id) ?? null
    }

    async save(conference: Conference) : Promise<void> {
        this.conferences.push(conference)
    }

    async update(conference: Conference): Promise<void> {
        const index = this.conferences.findIndex(c => c.props.id === conference.props.id);

        this.conferences[index] = conference;
    }
}
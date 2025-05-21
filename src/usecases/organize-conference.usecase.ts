import { Conference } from "../entities/conference.entity"
import { IConferenceRepository } from "../interfaces/conference-repository.interface"
import { IIDGenerator } from "../interfaces/id-generator.interface"

export interface RequestPayload {
    title: string
    seats: number
    startDate: Date
    endDate: Date
}

export class OrganizeConference {
    constructor(
        private readonly conferenceRepository: IConferenceRepository,
        private readonly idGenerator: IIDGenerator
    ) {}

    async execute(payload: RequestPayload) {
        const id = this.idGenerator.generate()

        const conference = new Conference({
            id: id,
            title: payload.title,
            seats: payload.seats,
            startDate: payload.startDate,
            endDate: payload.endDate
        })

        conference.validateOrThrow();
        await this.conferenceRepository.save(conference)

        return id;
    }
}
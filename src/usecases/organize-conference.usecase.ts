import { Conference } from "../entities/conference.entity"
import { User } from "../entities/user.entity"
import { IConferenceRepository } from "../interfaces/conference-repository.interface"
import { IIDGenerator } from "../interfaces/id-generator.interface"

export interface RequestPayload {
    title: string
    seats: number
    startDate: Date
    endDate: Date
    user: User
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
            endDate: payload.endDate,
            organizerId: payload.user.props.id
        })

        conference.validateOrThrow();
        await this.conferenceRepository.save(conference)

        return id;
    }
}
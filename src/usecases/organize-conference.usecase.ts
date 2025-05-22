import { Conference } from "../entities/conference.entity"
import { User } from "../entities/user.entity"
import { IConferenceRepository } from "../interfaces/conference-repository.interface"
import { IIDGenerator } from "../interfaces/id-generator.interface"
import { IUsecase } from "../interfaces/usecase.interface"

interface RequestPayload {
    title: string
    seats: number
    startDate: Date
    endDate: Date
    user: User
}

type ResponsePayload = string;

export class OrganizeConference implements IUsecase<RequestPayload, ResponsePayload> {
    constructor(
        private readonly conferenceRepository: IConferenceRepository,
        private readonly idGenerator: IIDGenerator
    ) {}

    async execute(payload: RequestPayload): Promise<ResponsePayload> {
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
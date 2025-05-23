import { User } from "../entities/user.entity";
import { IBookingRepository } from "../interfaces/booking-repository.interface";
import { IConferenceRepository } from "../interfaces/conference-repository.interface";
import { IUsecase } from "../interfaces/usecase.interface";

interface RequestPayload {
    conferenceId: string;
    seat: number;
    organizer: User;
}

type ResponsePayload = void;

export class BookSeatUsecase implements IUsecase<RequestPayload, ResponsePayload> {
    constructor(
        private readonly conferenceRepository: IConferenceRepository,
        private readonly bookingRepository: IBookingRepository
    ) {}

    async execute(data: RequestPayload): Promise<void> {
        const conference = await this.conferenceRepository.findById(data.conferenceId);

        if(!conference) {
            throw new Error('Conference does not exist');
        }

        if(!conference.isSeatAvailable(data.seat))
            throw new Error("This seat is not available");

        conference.update({
            bookedSeats: [...conference.props.bookedSeats, data.seat]
        });

        conference.validateOrThrow();

        this.conferenceRepository.update(conference)
    }
}
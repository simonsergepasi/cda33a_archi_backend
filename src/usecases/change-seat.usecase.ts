import { User } from "../entities/user.entity";
import { IBookingRepository } from "../interfaces/booking-repository.interface";
import { IConferenceRepository } from "../interfaces/conference-repository.interface";
import { IUsecase } from "../interfaces/usecase.interface";

interface RequestPayload {
    conferenceId: string;
    seats: number;
    organizer: User;
}

type ResponsePayload = void;

export class ChangeSeatUsecase implements IUsecase<RequestPayload, ResponsePayload> {
    constructor(
        private readonly conferenceRepository: IConferenceRepository,
        private readonly bookingRepository: IBookingRepository
    ) {}

    async execute(data: RequestPayload): Promise<void> {
        const conference = await this.conferenceRepository.findById(data.conferenceId);

        if(!conference) {
            throw new Error('Conference does not exist');
        }

        if(!conference.isOrganizer(data.organizer))
            throw new Error("You are not allowed to update this conference");
        
        const bookingCount = await this.bookingRepository.getCountByConferenceId(data.conferenceId);

        if(bookingCount > data.seats) {
            throw new Error("Never less than the number of bookings")
        }

        conference.update({ seats: data.seats });

        conference.validateOrThrow()
    }
}
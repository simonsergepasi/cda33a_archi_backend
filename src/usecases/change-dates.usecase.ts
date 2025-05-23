import { Conference } from "../entities/conference.entity";
import { User } from "../entities/user.entity";
import { ConferenceNotFoundError } from "../exceptions/conference-not-exists.exception";
import { IBookingRepository } from "../interfaces/booking-repository.interface";
import { IConferenceRepository } from "../interfaces/conference-repository.interface";
import { IMailer } from "../interfaces/mailer.interface";
import { IUsecase } from "../interfaces/usecase.interface";
import { IUserRepository } from "../interfaces/user-repository.interface";

interface ChangeDatesRequest {
    organizer: User
    conferenceId: string
    startDate: Date
    endDate: Date
}

type ChangeDatesResponde = void

export class ChangeDatesUsecase implements IUsecase<ChangeDatesRequest, ChangeDatesResponde> {

    constructor(
        private readonly conferenceRepository: IConferenceRepository,
        private readonly mailer: IMailer,
        private readonly bookingRepository: IBookingRepository,
        private readonly userRepository: IUserRepository
    ) {}

    async execute(data: ChangeDatesRequest): Promise<void> {
        const conference = await this.conferenceRepository.findById(data.conferenceId)

        if(!conference) throw new ConferenceNotFoundError()
        
        if(!conference.isOrganizer(data.organizer)) throw new Error("You are not allowed to change this conference")

        conference.update({startDate: data.startDate, endDate: data.endDate});

        conference.validateOrThrow();

        await this.conferenceRepository.update(conference);
        await this.sendEmailToParticipants(conference)
    }

    private async sendEmailToParticipants(conference: Conference) {
        const bookings = await this.bookingRepository.findByConferenceId(conference.props.id);

        const users = await Promise.all(
            bookings.map(booking => this.userRepository.findById(booking.props.userId))
        ) as User[]

        await Promise.all(
            users.map(user => {
                this.mailer.send({
                    to: user.props.email,
                    subject: `${conference.props.title} has changed`,
                    body: `The date of the conference ${conference.props.title} have changed`
        })
            })
        )
    }
}
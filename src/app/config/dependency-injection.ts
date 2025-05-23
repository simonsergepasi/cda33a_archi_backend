import { asClass, asValue, createContainer } from "awilix";
import { IAuthenticator } from "../../interfaces/authenticator.interface";
import { IBookingRepository } from "../../interfaces/booking-repository.interface";
import { IConferenceRepository } from "../../interfaces/conference-repository.interface";
import { IIDGenerator } from "../../interfaces/id-generator.interface";
import { IUserRepository } from "../../interfaces/user-repository.interface";
import { InMemoryBookingRepository } from "../../repositories/in-memory-booking.repository";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference.repository";
import { MongoUserRepository } from "../../repositories/mongodb/mongo-user-repository";
import { MongoUser } from "../../repositories/mongodb/mongo-user.model";
import { JwtAuthenticator } from "../../services/jwt-authenticator";
import { ChangeSeatUsecase } from "../../usecases/change-seat.usecase";
import { ChangeDatesUsecase } from "../../usecases/change-dates.usecase";
import { BookSeatUsecase } from "../../usecases/book-seat.usecase";
import { OrganizeConference } from "../../usecases/organize-conference.usecase";
import { UUIDGenerator } from "../../utils/uuid-generator";
import { config } from "./get-env";
import { InMemoryMailer } from "../../utils/in-memory-mailer";


export interface Dependencies {
    conferenceRepository: IConferenceRepository
    bookingRepository: IBookingRepository
    userRepository: IUserRepository
    idGenerator: IIDGenerator
    authenticator: IAuthenticator
    organizeConference: OrganizeConference
    changeSeats: ChangeSeatUsecase
    changeDates: ChangeDatesUsecase
    bookSeat: BookSeatUsecase
}

const container = createContainer<Dependencies>()

container.register({
    conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
    bookingRepository: asClass(InMemoryBookingRepository).singleton(),
    idGenerator: asClass(UUIDGenerator).singleton(),
    
    userRepository: asValue(new MongoUserRepository(MongoUser.UserModel)),
})

const conferenceRepository = container.resolve('conferenceRepository');
const userRepository = container.resolve('userRepository');
const bookingRepository = container.resolve('bookingRepository');
const idGenerator = container.resolve('idGenerator');

const mailer = new InMemoryMailer();

container.register({
    authenticator: asValue(new JwtAuthenticator(userRepository, config.secretKey)),
    organizeConference: asValue(new OrganizeConference(conferenceRepository, idGenerator)),
    changeSeats: asValue(new ChangeSeatUsecase(conferenceRepository, bookingRepository)),
    changeDates: asValue(new ChangeDatesUsecase(conferenceRepository, mailer, bookingRepository, userRepository)),
    bookSeat: asValue(new BookSeatUsecase(conferenceRepository, bookingRepository))
})

export default container;
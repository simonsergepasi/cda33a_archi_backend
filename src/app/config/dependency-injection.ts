import { asClass, asValue, createContainer } from "awilix";
import { IAuthenticator } from "../../interfaces/authenticator.interface";
import { IConferenceRepository } from "../../interfaces/conference-repository.interface";
import { IIDGenerator } from "../../interfaces/id-generator.interface";
import { IUserRepository } from "../../interfaces/user-repository.interface";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference.repository";
import { MongoUserRepository } from "../../repositories/mongodb/mongo-user-repository";
import { MongoUser } from "../../repositories/mongodb/mongo-user.model";
import { JwtAuthenticator } from "../../services/jwt-authenticator";
import { OrganizeConference } from "../../usecases/organize-conference.usecase";
import { UUIDGenerator } from "../../utils/uuid-generator";
import { config } from "./get-env";

export interface Dependencies {
    conferenceRepository: IConferenceRepository
    userRepository: IUserRepository
    idGenerator: IIDGenerator
    organizeConference: OrganizeConference
    authenticator: IAuthenticator
}

const container = createContainer<Dependencies>()

container.register({
    conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
    idGenerator: asClass(UUIDGenerator).singleton(),
    
    userRepository: asValue(new MongoUserRepository(MongoUser.UserModel)),
})

const conferenceRepository = container.resolve('conferenceRepository');
const userRepository = container.resolve('userRepository');
const idGenerator = container.resolve('idGenerator');


container.register({
    authenticator: asValue(new JwtAuthenticator(userRepository, config.secretKey)),
    organizeConference: asValue(new OrganizeConference(conferenceRepository, idGenerator))
})

export default container;
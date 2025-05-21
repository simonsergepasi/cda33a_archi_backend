import { asClass, asFunction, asValue, createContainer } from "awilix";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference.repository";
import { InMemoryUserRepository } from "../../repositories/in-memory-user-repository";
import { UUIDGenerator } from "../../utils/uuid-generator";
import { BasicAuthenticator } from "../../services/basic-authenticator";
import { OrganizeConference } from "../../usecases/organize-conference.usecase";
import { IConferenceRepository } from "../../interfaces/conference-repository.interface";
import { IUserRepository } from "../../interfaces/user-repository.interface";
import { IIDGenerator } from "../../interfaces/id-generator.interface";
import { IAuthenticator } from "../../interfaces/authenticator.interface";

interface Dependencies {
    conferenceRepository: IConferenceRepository
    userRepository: IUserRepository
    idGenerator: IIDGenerator
    organizeConference: OrganizeConference
    authenticator: IAuthenticator
}

const container = createContainer<Dependencies>()

container.register({
    conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
    userRepository: asClass(InMemoryUserRepository).singleton(),
    idGenerator: asClass(UUIDGenerator).singleton(),
})

const conferenceRepository = container.resolve('conferenceRepository');
const userRepository = container.resolve('userRepository');
const idGenerator = container.resolve('idGenerator');


container.register({
    authenticator: asValue(new BasicAuthenticator(userRepository)),
    organizeConference: asValue(new OrganizeConference(conferenceRepository, idGenerator))
})

export default container;
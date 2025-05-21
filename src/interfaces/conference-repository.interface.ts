import { Conference } from "../entities/conference.entity";

export interface IConferenceRepository {
    findById(id: string): Promise<Conference | null>
    save(conference: Conference): Promise<void>
}
export class ConferenceNotFoundError extends Error {
    constructor() {
        super("Conference does not exit")
    }
}
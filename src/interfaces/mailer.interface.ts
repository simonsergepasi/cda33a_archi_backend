import { Email } from "../value-objects/email.vo";

export interface IMailer {
    send(email: Email): Promise<void>
}
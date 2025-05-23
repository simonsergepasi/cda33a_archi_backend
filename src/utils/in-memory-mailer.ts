import { IMailer } from "../interfaces/mailer.interface";
import { Email } from "../value-objects/email.vo";

export class InMemoryMailer implements IMailer {
    public sentEmails: Email[] = [];

    async send(email: Email): Promise<void> {
        this.sentEmails.push(email);
    }
}
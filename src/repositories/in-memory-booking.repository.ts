import { Booking } from "../entities/booking.entity";
import { IBookingRepository } from "../interfaces/booking-repository.interface";

export class InMemoryBookingRepository implements IBookingRepository {
    bookings: Booking[];

    constructor() {
        this.bookings = [];
    }

    async save(booking: Booking): Promise<void> {
        this.bookings.push(booking);
    }

    async getCountByConferenceId(conferenceId: string): Promise<number> {
        return this.bookings.filter(booking => booking.props.conferenceId === conferenceId).length
    }
}
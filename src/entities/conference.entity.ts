import { differenceInDays, differenceInHours } from "date-fns"
import { User } from "./user.entity"

export interface ConferenceProps {
    id: string
    title: string
    seats: number
    startDate: Date
    endDate: Date
    organizerId: string
    bookedSeats: number[] 
}

export class Conference {
    constructor(public props: ConferenceProps) {}

    isTooSoon() {
        return differenceInDays(this.props.startDate, new Date()) < 3
    }

    hasNotEnoughSeats() {
        return this.props.seats < 20
    }

    hasTooMuchSeats() {
        return this.props.seats > 100
    }

    isTooLong() {
        return differenceInHours(this.props.endDate, this.props.startDate) > 3
    }

    isOrganizer(user: User) {
        return this.props.organizerId === user.props.id
    }

    isSeatAvailable(seat: number): boolean {
        return (
            !this.props.bookedSeats.includes(seat) &&
            this.props.bookedSeats.length < this.props.seats
        );
    }

    update(data: Partial<ConferenceProps>) {
        this.props = { ...this.props, ...data }
    }

    validateOrThrow() {
        if(this.isTooSoon()) {
            throw new Error("The conference must happen in at least 3 days")
        }

        if(this.hasNotEnoughSeats()) {
            throw new Error("Conference has not enough seats")
        }

        if(this.hasTooMuchSeats()) {
            throw new Error("Conference has too much seats")
        }

        if(this.isTooLong()) {
            throw new Error("Conference is too long")
        }
    }
}
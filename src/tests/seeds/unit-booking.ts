import { Booking } from "../../entities/booking.entity";
import { UnitConferences } from "./unit-conferences";
import { UnitUsers } from "./unit-users";

export const UnitBookings = {
    bookingBob: new Booking({
        id: 'booking-1',
        conferenceId: UnitConferences.conference2.props.id,
        userId: UnitUsers.bob.props.id
    })
}
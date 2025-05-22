export interface BookingProps {
    id: string;
    conferenceId: string;
    userId: string;
} 

export class Booking {
    constructor( public props: BookingProps ) {}
}
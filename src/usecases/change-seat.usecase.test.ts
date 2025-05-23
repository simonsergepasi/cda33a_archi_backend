import { Booking } from "../entities/booking.entity";
import { InMemoryBookingRepository } from "../repositories/in-memory-booking.repository";
import { InMemoryConferenceRepository } from "../repositories/in-memory-conference.repository";
import { UnitConferences } from "../tests/seeds/unit-conferences";
import { UnitUsers } from "../tests/seeds/unit-users";
import { ChangeSeatUsecase } from "./change-seat.usecase";



describe("Change seats", () => {
    let confRepository: InMemoryConferenceRepository;
    let bookingRepository: InMemoryBookingRepository;
    let usecase: ChangeSeatUsecase;

    beforeEach(async () => {
        confRepository = new InMemoryConferenceRepository();
        bookingRepository = new InMemoryBookingRepository();
        usecase = new ChangeSeatUsecase(confRepository, bookingRepository);
        await confRepository.save(UnitConferences.conference2);
    })

    describe("Scenario: Conference doesn't exist", () => {
        const payload = {
            conferenceId: "non-existing-id",
            seats: 100,
            organizer: UnitUsers.john,
        }

        it("should fail", async () => {
            await expect(() => usecase.execute(payload)).rejects.toThrow("Conference does not exist")
        })
    }) 

    describe("Scenario: Update conference of someone else", () => {
        const payload = {
            conferenceId: UnitConferences.conference2.props.id,
            seats: 100,
            organizer: UnitUsers.john,
        }

        it("should fail", async () => {
            await expect(() => usecase.execute(payload)).rejects.toThrow("You are not allowed to update this conference")
        })
    }) 

	describe("Scenario: Seats can't be under 20", () => {
        const payload = {
            conferenceId: UnitConferences.conference2.props.id,
            seats: 15,
            organizer: UnitUsers.alice,
        }

        it("should fail", async () => {
            await expect(() => usecase.execute(payload)).rejects.toThrow("Conference has not enough seats")
        })
    })

	describe("Scenario: Seats can't be more than 100", () => {
        const payload = {
            conferenceId: UnitConferences.conference2.props.id,
            seats: 105,
            organizer: UnitUsers.alice,
        }

        it("should fail", async () => {
            await expect(() => usecase.execute(payload)).rejects.toThrow("Conference has too much seats")
        })
    })

    describe("Scenario: Never less than the number of booking", () => {
        const payload = {
            conferenceId: UnitConferences.conference2.props.id,
            seats: 80,
            organizer: UnitUsers.alice,
        }

        it("should fail", async () => {
            for(let i =0; i < 90; i++) {
                await bookingRepository.save(
                    new Booking({
                        id: `bookin-${i}`,
                        userId: `user-${i}`,
                        conferenceId: UnitConferences.conference2.props.id
                    })
                )
            }

            await expect(() => usecase.execute(payload)).rejects.toThrow("Never less than the number of bookings")
        })
    })

    describe("Scenario: Happy path", () => {
        const payload = {
            conferenceId: UnitConferences.conference2.props.id,
            seats: 80,
            organizer: UnitUsers.alice,
        }

        it("should change the number of seats", async () => {
            await usecase.execute(payload);

            const updatedConference = await confRepository.findById(UnitConferences.conference2.props.id)

            expect(updatedConference?.props.seats).toEqual(80)
        })
    })
})


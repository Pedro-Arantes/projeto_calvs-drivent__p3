import { notFoundError } from "@/errors";
import { paymentRequired } from "@/errors/payment-required-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getHotelsService(userId: number) {
  const enroll = await enrollmentRepository.findByUserId(userId);
  if (!enroll) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enroll.id);
  if (!ticket) throw notFoundError();
  if (ticket.status === "RESERVED" ) throw paymentRequired();
  if(!ticket.TicketType.includesHotel || ticket.TicketType.isRemote) throw paymentRequired();
  const result = await hotelRepository.findHotels();
  return result;
}

async function getHotelsRoomsService(hotelId: number) {
  const result = await hotelRepository.findHotelsRoomsById(hotelId);

  if (!result) {
    throw notFoundError();
  }
  return result;
}
const hotelService = {
  getHotelsService,
  getHotelsRoomsService,
};

export default hotelService;

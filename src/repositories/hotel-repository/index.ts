import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}
async function findHotelsRoomsById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}
const hotelRepository = {
  findHotels,
  findHotelsRoomsById,
};

export default hotelRepository;

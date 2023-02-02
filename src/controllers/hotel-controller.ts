import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotel-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const result = await hotelService.getHotelsService(userId);

    if (!result) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }else if(error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function getHotelsRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const hotelId = Number(req.params.hotelId);

    if (!hotelId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const result = await hotelService.getHotelsRoomsService(hotelId);

    if (!result) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

import { AxiosError } from "axios";
import { STATUS_CODES } from "node:http";
import ApiCallError from "./apiCallError";
import { StatusCodes } from "http-status-codes";

export function handleError(error: AxiosError) {
  let message = "";
  if (error.response) {
    // Response was sent, handle different statuses
    switch (error.response.status) {
      case StatusCodes.BAD_REQUEST:
        message = error.response.data;
        break;
      case StatusCodes.UNAUTHORIZED:
        message = "You do not have access to this data.";
        break;
      default:
        message = "Unexpected server response.";
    }
  } else {
    // Server did not repond, probably connection issue
    message = "Server connection error occured.";
  }

  const apiCallError = new ApiCallError(message);
  throw apiCallError;
}

import axios, { AxiosError } from "axios";
import ApiCallError from "./apiCallError";
import { StatusCodes } from "http-status-codes";
import { UserTokenDto } from "./login/userTokenDto";

export function handleError(error: AxiosError) {
  let message = "";
  let status = -1;
  if (error.response) {
    status = error.response.status
    // Response was sent, handle different statuses
    switch (error.response.status) {
      case StatusCodes.BAD_REQUEST:
        message = error.response.data;
        break;
      case StatusCodes.UNAUTHORIZED:
        message = "You are unauthorized.";
        break;
      default:
        message = "Unexpected server response.";
    }
  } else {
    // Server did not respond, probably connection issue
    message = "Server connection error occured.";
  }

  throw new ApiCallError(status, message);
}

export function registerUserToken(userToken : UserTokenDto) {
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = `${userToken.type} ${userToken.token}`;
      config.headers["Access-Control-Allow-Origin"] = "*"
      config.headers["Content-Type"] = "application/json"
      config.headers.accept = "application/json"
      return config
    }
  )
}

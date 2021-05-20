import axios from "axios";
import { LOGIN_URL } from "../apiUrls";
import { handleError, registerUserToken } from "../apiUtils";
import { LoginDto } from "./loginDtos";
import { UserTokenDto } from "./userTokenDto";

export function login(loginDto: LoginDto) {
  return axios
    .post(LOGIN_URL, loginDto)
    .then((response) => {
      const userToken : UserTokenDto = response.data;
      registerUserToken(userToken)
      return userToken
    })
    .catch(handleError);
}

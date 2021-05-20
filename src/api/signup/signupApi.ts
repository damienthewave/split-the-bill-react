import { SignupDto } from "./signupDtos";
import { SIGNUP_URL } from "../apiUrls";
import axios from "axios";
import { handleError, registerUserToken } from "../apiUtils";
import { UserTokenDto } from "../login/userTokenDto";

export function signup(signupDto: SignupDto) {
  return axios
    .post(SIGNUP_URL, signupDto, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then((response) => {
      const userToken : UserTokenDto = response.data;
      registerUserToken(userToken)
      return userToken
    })
    .catch(handleError);
}

import { SignupDto } from "./signupDtos";
import { SIGNUP_URL } from "../apiUrls";
import axios from "axios";
import { handleError } from "../apiUtils";

export function signup(signupDto: SignupDto) {
  return axios
    .post(SIGNUP_URL, signupDto, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then((response) => response.data)
    .catch(handleError);
}

import { SignupDto } from "./signupDtos";
import { SIGNUP_URL } from "../apiUrls";
import axios from "axios";
import { handleError } from "../apiUtils";

export function signUp(signupDto: SignupDto) {
  return axios
    .post(SIGNUP_URL, signupDto)
    .then((response) => response.data)
    .catch(handleError);
}

import axios from "axios";
import { LOGIN_URL } from "../apiUrls";
import { handleError } from "../apiUtils";
import { LoginDto } from "./loginDtos";

export function login(loginDto: LoginDto) {
  return axios
    .post(LOGIN_URL, loginDto)
    .then((response) => response.data)
    .catch(handleError);
}

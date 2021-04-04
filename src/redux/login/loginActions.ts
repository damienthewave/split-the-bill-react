import { LoginDto } from "../../api/login/loginDtos";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import { LoginActionType, LOGIN_SUCCESS } from "./loginActionTypes";
import * as loginApi from "../../api/login/loginApi";

function loginSuccess(userToken: UserTokenDto): LoginActionType {
  return { type: LOGIN_SUCCESS, userToken };
}

export function login(loginDto: LoginDto) {
  return function (dispatch: Function) {
    dispatch(beginApiCall());
    return loginApi
      .login(loginDto)
      .then((token: UserTokenDto) => dispatch(loginSuccess(token)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

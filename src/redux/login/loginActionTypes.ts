import { UserTokenDto } from "../../api/login/userTokenDto";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOAD_COOKIE_TOKEN = "LOAD_COOKIE_TOKEN"
export const LOGOUT = "LOGOUT"

interface LoginAction {
  type: typeof LOGIN_SUCCESS;
  userToken: UserTokenDto;
}

interface LoadCookieTokenAction {
  type: typeof LOAD_COOKIE_TOKEN;
  userToken: UserTokenDto;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type LoginActionType = LoginAction | LoadCookieTokenAction | LogoutAction;

import { LoginDto } from "../../api/login/loginDtos";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import { LOAD_COOKIE_TOKEN, LOGIN_SUCCESS, LoginActionType, LOGOUT } from "./loginActionTypes";
import * as loginApi from "../../api/login/loginApi";
import Cookies from "universal-cookie";
import { registerUserToken } from "../../api/apiUtils";

function loginSuccess(userToken: UserTokenDto | void): LoginActionType {
  return { type: LOGIN_SUCCESS, userToken } as LoginActionType;
}

export function login(loginDto: LoginDto) {
  return function(dispatch: Function) {
    dispatch(beginApiCall());
    return loginApi
      .login(loginDto)
      .then((token: UserTokenDto | void) => {
        const userToken = token as UserTokenDto
        const cookies = new Cookies();
        cookies.set('token', `${userToken.type} ${userToken.token}`, { path: '/' })
        dispatch(loginSuccess(token))
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

function loadedCookieToken(userToken: UserTokenDto): LoginActionType {
  return { type: LOAD_COOKIE_TOKEN, userToken }
}

export function loadCookieToken() {
  return function(dispatch: Function) {
    const cookies = new Cookies();
    const userTokenString: string = cookies.get('token')
    if(userTokenString) {
      const [type, token] = userTokenString.split(' ')
      const tokenDto: UserTokenDto = {
        type,
        token
      }
      registerUserToken(tokenDto)
      dispatch(loadedCookieToken(tokenDto))
    }
  };
}

function loggedOut() : LoginActionType {
  return { type: LOGOUT }
}

export function logout() {
  return function(dispatch: Function) {
    const cookies = new Cookies();
    cookies.remove('token')
    dispatch(loggedOut())
    window.location.reload()
  };
}
import { UserTokenDto } from "../../api/login/userTokenDto";
import { SignupDto } from "../../api/signup/signupDtos";
import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import { SignupActionType, SIGNUP_SUCCESS } from "./signupActionTypes";
import * as signupApi from "../../api/signup/signupApi";

function signupSuccess(userToken: UserTokenDto): SignupActionType {
  return { type: SIGNUP_SUCCESS, userToken };
}

export function signup(signupDto: SignupDto) {
  return function (dispatch: Function) {
    dispatch(beginApiCall());
    return signupApi
      .signup(signupDto)
      .then((token: UserTokenDto) => dispatch(signupSuccess(token)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

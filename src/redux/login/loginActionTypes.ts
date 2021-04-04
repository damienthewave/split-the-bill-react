import { UserTokenDto } from "../../api/login/userTokenDto";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

interface LoginAction {
  type: typeof LOGIN_SUCCESS;
  userToken: UserTokenDto;
}

export type LoginActionType = LoginAction;

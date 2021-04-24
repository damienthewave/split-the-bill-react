import { UserTokenDto } from "../../api/login/userTokenDto";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

interface SignupAction {
  type: typeof SIGNUP_SUCCESS;
  userToken: UserTokenDto;
}

export type SignupActionType = SignupAction;

import { UserTokenDto } from "../api/login/userTokenDto";

export const appState: AppState = {
  apiCallsInProgress: 0,
  userToken: {
    token: "",
    type: "",
  },
};

export interface AppState {
  apiCallsInProgress: number;
  userToken: UserTokenDto;
}

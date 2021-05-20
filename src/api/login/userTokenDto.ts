export interface UserTokenDto {
  token: string;
  type: string;
}

export const emptyUserTokenDto: UserTokenDto = {
  token: "",
  type: ""
};

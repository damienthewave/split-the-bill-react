export const BASE_URL = "https://localhost:8443";

export const SIGNUP_URL = BASE_URL + "/auth/signup";
export const LOGIN_URL = BASE_URL + "/auth/signin";

export const PEOPLE_URL = BASE_URL + "/people";

export const CURRENCIES_URL = BASE_URL + "/currencies";

export const FRIENDSHIPS_URL = BASE_URL + "/friendships";

export const FRIENDSHIPS_ACCEPT_URL = (id: number) =>
  FRIENDSHIPS_URL + "/" + id + "/accept";

export const FRIENDSHIPS_BREAK_URL = (id: number) =>
  FRIENDSHIPS_URL + "/" + id + "/break";

export const GROUPS_URL = BASE_URL + "/groups";

export const GROUPS_ADD_MEMBER_URL = (groupId: number, personId: number) =>
  GROUPS_URL + "/" + groupId + "/add?personId=" + personId;

export const GROUPS_ADD_EXPENSE_URL = (groupId: number) =>
  `${GROUPS_URL}/${groupId}/expenses`;

export const STATISTICS_URL = BASE_URL + "/statistics";
export const STAT_ALL_PERSON_EXPENSES_URL = STATISTICS_URL + "/allExpenses";

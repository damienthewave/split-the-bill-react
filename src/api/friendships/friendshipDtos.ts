import { PersonReadDto } from "../person/personDtos";

export interface Friendships {
  pending: Friendship[];
  receivedRequests: Friendship[];
  confirmed: Friendship[];
}

export interface Friendship {
  id: number;
  personName: string;
}

export const emptyFriendships: Friendships = {
  confirmed: [],
  pending: [],
  receivedRequests: [],
};

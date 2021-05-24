import { Friendship, Friendships } from "../../api/friendships/friendshipDtos";

export const FRIENDSHIPS_FETCH_SUCCESS = "FRIENDSHIPS_FETCH_SUCCESS";
export interface FriendshipsFetchedActionType {
  type: typeof FRIENDSHIPS_FETCH_SUCCESS;
  friendships: Friendships;
}

export const FRIENDSHIPS_REQUEST_SUCCESS = "FRIENDSHIPS_REQUEST_SUCCESS";
export interface FriendshipRequestedActionType {
  type: typeof FRIENDSHIPS_REQUEST_SUCCESS;
  friendship: Friendship;
}

export const FRIENDSHIP_ACCEPT_SUCCESS = "FRIENDSHIP_ACCEPT_SUCCESS";
export interface FriendshipAcceptedActionType {
  type: typeof FRIENDSHIP_ACCEPT_SUCCESS;
  friendship: Friendship;
}

export const FRIENDSHIP_BREAK_SUCCESS = "FRIENDSHIP_BREAK_SUCCESS";
export interface FriendshipBrokeActionType {
  type: typeof FRIENDSHIP_BREAK_SUCCESS;
  friendship: Friendship;
}

export type FriendshipsActionType =
  | FriendshipsFetchedActionType
  | FriendshipRequestedActionType
  | FriendshipAcceptedActionType
  | FriendshipBrokeActionType;

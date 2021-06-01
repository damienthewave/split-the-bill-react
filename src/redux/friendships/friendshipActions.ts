import { apiCallError, beginApiCall } from "../api-status/apiStatusActions";
import * as friendshipsApi from "../../api/friendships/friendshipApi";
import {
  FRIENDSHIP_ACCEPT_SUCCESS,
  FriendshipAcceptedActionType,
  FRIENDSHIP_BREAK_SUCCESS,
  FriendshipBrokeActionType,
  FRIENDSHIPS_REQUEST_SUCCESS,
  FriendshipRequestedActionType,
  FRIENDSHIPS_FETCH_SUCCESS,
  FriendshipsFetchedActionType,
} from "./friendshipActionTypes";
import { Friendship, Friendships } from "../../api/friendships/friendshipDtos";

function friendshipsFetched(
  friendships: Friendships | void
): FriendshipsFetchedActionType {
  return {
    type: FRIENDSHIPS_FETCH_SUCCESS,
    friendships,
  } as FriendshipsFetchedActionType;
}
export function getFriendships() {
  return function (dispatch: Function) {
    dispatch(beginApiCall());
    return friendshipsApi
      .getFriendships()
      .then((friendships: Friendships | void) => {
        dispatch(friendshipsFetched(friendships));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

function friendshipRequested(
  friendship: Friendship | void
): FriendshipRequestedActionType {
  return {
    type: FRIENDSHIPS_REQUEST_SUCCESS,
    friendship,
  } as FriendshipRequestedActionType;
}
export function requestFriendship(attribute: string) {
  return function (dispatch: Function) {
    dispatch(beginApiCall());
    return friendshipsApi
      .requestFriendship(attribute)
      .then((friendship: Friendship | void) =>
        dispatch(friendshipRequested(friendship))
      )
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

function friendshipAccepted(
  friendship: Friendship | void
): FriendshipAcceptedActionType {
  return {
    type: FRIENDSHIP_ACCEPT_SUCCESS,
    friendship: friendship,
  } as FriendshipAcceptedActionType;
}
export function acceptFriendship(toAccept: Friendship) {
  return function (dispatch: Function) {
    dispatch(beginApiCall());
    return friendshipsApi
      .acceptFriendship(toAccept.id)
      .then((friendship: Friendship | void) => {
        dispatch(friendshipAccepted(friendship));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

function friendshipBroke(friendship: Friendship): FriendshipBrokeActionType {
  return {
    type: FRIENDSHIP_BREAK_SUCCESS,
    friendship,
  } as FriendshipBrokeActionType;
}
export function breakFriendship(toBreak: Friendship) {
  return function (dispatch: Function) {
    dispatch(beginApiCall());
    return friendshipsApi
      .breakFriendship(toBreak.id)
      .then(() => dispatch(friendshipBroke(toBreak)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

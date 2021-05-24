import { appState } from "../appState";
import {
  FRIENDSHIP_ACCEPT_SUCCESS,
  FRIENDSHIP_BREAK_SUCCESS,
  FriendshipAcceptedActionType,
  FriendshipBrokeActionType,
  FriendshipRequestedActionType,
  FRIENDSHIPS_FETCH_SUCCESS,
  FRIENDSHIPS_REQUEST_SUCCESS,
  FriendshipsActionType,
  FriendshipsFetchedActionType,
} from "./friendshipActionTypes";
import { Friendship } from "../../api/friendships/friendshipDtos";

export function friendshipReducer(
  state: typeof appState.friendships = appState.friendships,
  action: FriendshipsActionType
): typeof appState.friendships {
  let act: FriendshipsActionType;
  let friendship: Friendship;
  switch (action.type) {
    case FRIENDSHIPS_FETCH_SUCCESS:
      act = action as FriendshipsFetchedActionType;
      return act.friendships;
    case FRIENDSHIPS_REQUEST_SUCCESS:
      act = action as FriendshipRequestedActionType;
      return {
        ...state,
        pending: [...state.pending, act.friendship],
      };
    case FRIENDSHIP_ACCEPT_SUCCESS:
      act = action as FriendshipAcceptedActionType;
      friendship = act.friendship;
      return {
        ...state,
        confirmed: [...state.confirmed, friendship],
        receivedRequests: state.receivedRequests.filter(
          (f) => f.id !== friendship.id
        ),
      };
    case FRIENDSHIP_BREAK_SUCCESS:
      act = action as FriendshipBrokeActionType;
      friendship = act.friendship;
      return {
        ...state,
        confirmed: state.confirmed.filter((f) => f.id !== friendship.id),
      };
    default:
      return state;
  }
}

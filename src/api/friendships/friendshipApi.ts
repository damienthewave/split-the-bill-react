import axios from "axios";
import { handleError } from "../apiUtils";
import {
  FRIENDSHIPS_ACCEPT_URL,
  FRIENDSHIPS_BREAK_URL,
  FRIENDSHIPS_URL,
} from "../apiUrls";

export function getFriendships() {
  return axios
    .get(FRIENDSHIPS_URL)
    .then((response) => response.data.friendships)
    .catch(handleError);
}

export function requestFriendship(attribute: string) {
  return axios
    .post(FRIENDSHIPS_URL, { identifierAttribute: attribute })
    .then((response) => response.data)
    .catch(handleError);
}

export function acceptFriendship(id: number) {
  return axios
    .patch(FRIENDSHIPS_ACCEPT_URL(id))
    .then((response) => response.data)
    .catch(handleError);
}

export function breakFriendship(id: number) {
  return axios
    .delete(FRIENDSHIPS_BREAK_URL(id))
    .then((response) => response.data)
    .catch(handleError);
}

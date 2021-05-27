import React from "react";
import { Friendship } from "../../../api/friendships/friendshipDtos";

interface Props {
  friendship: Friendship;
  acceptFriendship?: (friendship: Friendship) => Promise<void>;
  breakFriendship?: (friendship: Friendship) => Promise<void>;
}

const FriendshipCard = ({
  friendship,
  acceptFriendship,
  breakFriendship,
}: Props) => {
  return (
    <div className="card my-1">
      <div className="row py-2">
        <div className="col my-auto">{friendship.personName}</div>
        <div className="col">
          {breakFriendship ? (
            <div
              className="btn btn-outline-danger py-0 btn-round"
              onClick={() => breakFriendship(friendship)}
            >
              -
            </div>
          ) : acceptFriendship ? (
            <div
              className="btn btn-success py-0 btn-round"
              onClick={() => acceptFriendship(friendship)}
            >
              +
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default FriendshipCard;

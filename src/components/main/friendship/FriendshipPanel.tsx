import React, { useEffect, useState } from "react";
import {
  Friendship,
  Friendships,
} from "../../../api/friendships/friendshipDtos";
import ApiCallError from "../../../api/apiCallError";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";
import {
  acceptFriendship,
  breakFriendship,
  getFriendships,
  requestFriendship,
} from "../../../redux/friendships/friendshipActions";
import { AppState } from "../../../redux/appState";
import { connect } from "react-redux";
import "../MainPage.css";
import FriendshipCard from "./FriendshipCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

interface Props {
  friendships: Friendships;
  getFriendships: () => Promise<void>;
  requestFriendship: (attribute: string) => Promise<void>;
  acceptFriendship: (toAccept: Friendship) => Promise<void>;
  breakFriendship: (toBreak: Friendship) => Promise<void>;
}

const FriendshipPanel = ({
  friendships,
  getFriendships,
  requestFriendship,
  acceptFriendship,
  breakFriendship,
}: Props) => {
  const [friendAttribute, setFriendAttribute] = useState<string>("");

  useEffect(() => {
    getFriendships();
  }, []);

  function sendFriendshipRequest(): void {
    requestFriendship(friendAttribute).catch((e: ApiCallError) => {
      if (e.responseCode === StatusCodes.NOT_FOUND) {
        toast.error("Could not find the person with the given identifier.");
      } else toast.error(e.message);
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-1 mt-1">
          <FontAwesomeIcon icon={faUserFriends} onClick={() => {}} />
        </div>
        <div className="col-8">
          <h4 className="text-left">Friendships</h4>
        </div>
      </div>
      <br />
      <div className="mx-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendFriendshipRequest();
          }}
        >
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Username or email address"
              type="text"
              onChange={(e) => setFriendAttribute(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-success" type={"submit"}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {friendships.confirmed && friendships.confirmed.length ? (
          <div className="mx-2 mt-3">
            <h5 className="text-left">Confirmed</h5>
            <div>
              {friendships.confirmed.map((f) => (
                <FriendshipCard
                  key={f.id}
                  friendship={f}
                  breakFriendship={breakFriendship}
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
        {friendships.receivedRequests && friendships.receivedRequests.length ? (
          <div className="mx-2 mt-3">
            <h5 className="text-left">Received</h5>
            <div>
              {friendships.receivedRequests.map((f) => (
                <FriendshipCard
                  key={f.id}
                  friendship={f}
                  acceptFriendship={acceptFriendship}
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
        {friendships.pending && friendships.pending.length ? (
          <div className="mx-2 mt-3">
            <h5 className="text-left">Pending</h5>
            {friendships.pending.map((f) => (
              <FriendshipCard key={f.id} friendship={f} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    friendships: state.friendships,
  };
};

const mapDispatchToProps = {
  getFriendships,
  requestFriendship,
  acceptFriendship,
  breakFriendship,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendshipPanel);

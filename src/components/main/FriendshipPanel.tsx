import React, { useEffect, useState } from "react";
import { Friendship, Friendships } from "../../api/friendships/friendshipDtos";
import ApiCallError from "../../api/apiCallError";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";
import {
  acceptFriendship,
  breakFriendship,
  getFriendships,
  requestFriendship,
} from "../../redux/friendships/friendshipActions";
import { AppState } from "../../redux/appState";
import { connect } from "react-redux";

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
    console.log("useEff");
    getFriendships().catch((e: ApiCallError) => console.log("err"));
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
      <h4 className="text-left">Friendships</h4>
      <div className="container pt-2">
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Username or email address"
            type="text"
            onChange={(e) => setFriendAttribute(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-success" onClick={sendFriendshipRequest}>
              Add
            </button>
          </div>
        </div>
      </div>
      {friendships.confirmed && friendships.confirmed.length ? (
        <div className="mx-2 mt-3">
          <h5 className="text-left">Confirmed</h5>
          <div className="">
            {friendships.confirmed.map((f) => {
              return (
                <div className="card" key={f.id}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">{f.personName}</div>
                      <div className="col">
                        <button
                          className="btn btn-danger"
                          onClick={() => breakFriendship(f)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {friendships.receivedRequests && friendships.receivedRequests.length ? (
        <div className="pt-3">
          <h5 className="text-left">Received requests</h5>
          {friendships.receivedRequests.map((f) => {
            return (
              <div key={f.id} className="row">
                <div>{f.personName}</div>
                <button
                  className="btn btn-success"
                  onClick={() => acceptFriendship(f)}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {friendships.pending && friendships.pending.length ? (
        <div className="px-4 pt-3">
          <h5 className="text-left">Pending</h5>
          {friendships.pending.map((f) => {
            return <div key={f.id}>{f.personName}</div>;
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
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

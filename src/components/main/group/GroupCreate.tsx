
import {  EmptyGroupDetailDto, GroupDetailDto, GroupFormDto } from "../../../api/group/groupDtos";
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { loadGroupDetails } from "../../../api/group/groupApi";
import ApiCallError, { NoPersonAssignedError } from "../../../api/apiCallError";
import { useHistory } from "react-router-dom"
import { GROUPS_PAGE_SUFFIX } from "../../../routes";
import { GroupContext } from "./GroupPanel";
import {
  getFriendships,
} from "../../../redux/friendships/friendshipActions";
import { Friendships } from "../../../api/friendships/friendshipDtos";
import { AppState } from "../../../redux/appState";
import { connect } from "react-redux";
import { createGroup } from "../../../redux/group/groupActions";
import { toast } from "react-toastify";

interface Props {
  friendships: Friendships;
  getFriendships: () => Promise<void>;
  createGroup: (groupCreateDto: GroupFormDto) => Promise<void>;
}

const GroupCreate = ({friendships, getFriendships, createGroup}: Props) => {

  useEffect(() => {
    getFriendships();
  }, []);

  const [groupName, setGrupName] = useState<string>("")
  const [groupMembers, setGroupMembers] = useState<number[]>([])

  function onSubmitClick (event: FormEvent): void {
    event.preventDefault()
    console.log("Submit!")
    createGroup({name: groupName, membersIds: groupMembers}).catch(e => {
      toast.error("Server error while creating new group");
    });
  }
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const personId: string = e.currentTarget.value
    console.log("VALUE: " + personId)
    setGroupMembers((groupMembers) => {
                return[...groupMembers, parseInt(personId)]})
  }
    return (
    <div>
      <form onSubmit = {onSubmitClick}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Group name" onChange={(e) => setGrupName(e.currentTarget.value)}></input>
        </div>
        <div className="form-group">
          <select className="custom-select my-1 mr-sm-2" onChange={(e) => onSelectChange(e)}>
            <option value={0}>Add members...</option>
            {friendships.confirmed.map( friend => {
              return <option value={friend.id}>{friend.personName}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary my-1">Add group</button>
        </div>
      </form>
    </div>
  )
};

const mapStateToProps = (state: AppState) => {
  return {
    friendships: state.friendships,
  };
};

const mapDispatchToProps = {
  getFriendships,
  createGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreate);

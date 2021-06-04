
import {GroupFormDto } from "../../../api/group/groupDtos";
import {FormEvent, useContext, useEffect, useState } from "react";
import { GroupContext } from "./GroupPanel";
//@ts-ignore
import {Multiselect} from 'multiselect-react-dropdown';
import {loadGroups} from "../../../redux/group/groupActions"
import {
  getFriendships,
} from "../../../redux/friendships/friendshipActions";
import { Friendships, Friendship } from "../../../api/friendships/friendshipDtos";
import { AppState } from "../../../redux/appState";
import { connect } from "react-redux";
import { createGroup } from "../../../redux/group/groupActions";
import { toast } from "react-toastify";

interface Props {
  friendships: Friendships;
  getFriendships: () => Promise<void>;
  createGroup: (groupCreateDto: GroupFormDto) => Promise<void>;
  loadGroups: () => Promise<void>;
}

const GroupCreate = ({friendships, getFriendships, createGroup, loadGroups }: Props) => {

  useEffect(() => {
    getFriendships();
  }, []);

  const myContext = useContext(GroupContext)
  const [groupName, setGrupName] = useState<string>("")
  const [groupMembers, setGroupMembers] = useState<number[]>([])
  const [photoPath, setPhotoPath] = useState<string>("")

  function onSubmitClick (event: FormEvent): void {
    event.preventDefault()
    createGroup({name: groupName, membersIds: groupMembers, photoPath})
      .then((data: any) =>{
        toast.success("Group added succesfully! ");
        loadGroups()
          .then(() => myContext.selectGroupNumber(data.group.id))})
      .catch(e => {
        toast.error("Server error while creating new group");
    });
  }
  const onSelectChange = (selectedList: any, selectedIte: any) => {
    let groupMembersIds = []
    groupMembersIds = selectedList.map((friend: Friendship) => friend.id)
    setGroupMembers(groupMembersIds)
  }
    return (
    <div className="float-xl-left w-100">
      <hr/>
      <form onSubmit = {onSubmitClick}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Group name" onChange={(e) => setGrupName(e.currentTarget.value)}></input>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Photo URL" onChange={(e) => setPhotoPath(e.currentTarget.value)}></input>
        </div>
        <div className="form-group">
          <Multiselect
          placeholder="Pick group members..."
          options={friendships.confirmed}
          onSelect={onSelectChange}
          onRemove={onSelectChange}
          displayValue="personName"
          />
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
  loadGroups,
  getFriendships,
  createGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreate);

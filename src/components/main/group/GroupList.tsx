import { GroupReadDto } from "../../../api/group/groupDtos";
import React from "react";
import GroupTile from "./GroupTile"


interface GroupListProps {
  groups: GroupReadDto[];
}

const GroupList: React.FC<GroupListProps> = ({ groups}) => {

  if (groups.length < 1) {
    return (
      <h2 className='section-title'>
        no groups matched your search criteria
      </h2>
    )
  }
  return (
    <div className="overflow-auto" style={{height:"800px", marginRight:"20px", paddingRight:"20px"}}>
      {groups.map( (group) => <GroupTile key={"gt"+ group.groupId} groupId={group.groupId} memberBalance={group.memberBalance}/>)}
    </div>
  )
};


export default (GroupList);

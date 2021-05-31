import { GroupReadDto } from "../../../api/group/groupDtos";
import React, { useEffect, useState } from "react";
import GroupTile from "./GroupTile"


interface GroupListProps {
  groups: GroupReadDto[];
}

const GroupList: React.FC<GroupListProps> = ({ groups}) => {

  const handleAddNewGroup = () => {
    console.log("Adding new group...")
  }
  if (groups.length < 1) {
    return (
      <h2 className='section-title'>
        no groups matched your search criteria
      </h2>
    )
  }
  return (
    <div>
      {groups.map( (group) => <GroupTile key={group.groupId} groupId={group.groupId}/>)}
    </div>
  )
};


export default (GroupList);

import { GroupReadDto } from "../../../api/group/groupDtos";
import React from "react";
import GroupTile from "./GroupTile";

interface GroupListProps {
  groups: GroupReadDto[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return groups.length ? (
    <div>
      {groups.map((group) => (
        <GroupTile
          key={group.groupId}
          groupId={group.groupId}
          memberBalance={group.memberBalance}
        />
      ))}
    </div>
  ) : (
    <></>
  );
};

export default GroupList;

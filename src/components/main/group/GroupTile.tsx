
import {  EmptyGroupDetailDto, GroupDetailDto } from "../../../api/group/groupDtos";
import React, { useContext, useEffect, useState } from "react";
import { loadGroupDetails } from "../../../api/group/groupApi";
import ApiCallError, { NoPersonAssignedError } from "../../../api/apiCallError";
import { useHistory } from "react-router-dom"
import { GROUPS_PAGE_SUFFIX } from "../../../routes";
import { GroupContext } from "./GroupPanel";

interface GroupTileProps {
  groupId: number;
}

const GroupTile: React.FC<GroupTileProps> = ({groupId}) => {

  const [groupDetails, setGroupDetails] = useState<GroupDetailDto>(EmptyGroupDetailDto)

  const myContext = useContext(GroupContext)

  const onTileClick = () => {
    myContext.selectGroupNumber(groupDetails.id)
  }
  useEffect(() => {
    loadGroupDetails(groupId)
      .then((data) => {
        console.log(data)
        setGroupDetails(data as GroupDetailDto)
      })
      .catch((e: ApiCallError) => {  });
  }, []);

    return (
    <div className='card' style={{width: "12rem", marginTop: "15px"}}>
      <img className="card-img-top" 
      src={groupDetails.photoPath ? groupDetails.photoPath : "https://comfort-flight.pl/wp-content/uploads/2020/02/2-people-sitting-with-view-of-yellow-flowers-during-daytime-196666.jpg"} alt={groupDetails.name} />
      <div className="card-body">
        <h5 className="card-title">{groupDetails.name}</h5>
        <button  onClick={() => onTileClick()} className="btn btn-ptimary">Details</button>
      </div>
    </div>
  )
  // return <div>
  //   Group Name: {groupDetails.name}
  // </div>;
};


export default (GroupTile);

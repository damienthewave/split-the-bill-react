import {  EmptyGroupDetailDto, GroupDetailDto } from "../../../api/group/groupDtos";
import React, { useContext, useEffect, useState } from "react";
import { loadGroupDetails } from "../../../api/group/groupApi";
import ApiCallError from "../../../api/apiCallError";
import { GroupContext } from "./GroupPanel";
import LoadingSpinnerContainer from "../../common/loading-spinner/LoadingSpinnerContainer";

interface GroupTileProps {
  groupId: number;
  memberBalance: Map<string, number>
}

const GroupTile: React.FC<GroupTileProps> = ({groupId, memberBalance}) => {

  const [groupDetails, setGroupDetails] = useState<GroupDetailDto>(EmptyGroupDetailDto)

  const myContext = useContext(GroupContext)

  const onTileClick = () => {
    myContext.selectGroupNumber(groupDetails.id)
  }
  useEffect(() => {
    loadGroupDetails(groupId)
      .then((data) => {
        setGroupDetails(data as GroupDetailDto)
      })
      .catch((e: ApiCallError) => {  });
  }, []);

    return (
    <div key={groupId} className='card' style={{width: "12rem", marginTop: "15px"}}>
      {groupDetails.photoPath && <img className="card-img-top" 
        src={groupDetails.photoPath} alt={groupDetails.name} />} 
      {!groupDetails.photoPath && <LoadingSpinnerContainer/>} 
      <div className="card-body">
        <h5 className="card-title">{groupDetails.name}</h5>
         {Object.entries(memberBalance).map((key) => {
              if(key[1] < 0){
                return <li key={Math.random()} className="list-group-item list-group-item-danger">Balance: {key[1]}  {key[0]}</li>}
              else{
                return <li key={Math.random()} className="list-group-item list-group-item-success">Balance: {key[1]}  {key[0]}</li>}})}
        <button  onClick={() => onTileClick()} className="btn btn-link">Details</button>
      </div>
    </div>
  )
};


export default (GroupTile);

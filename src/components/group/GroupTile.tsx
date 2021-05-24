import { connect } from "react-redux";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { AppState } from "../../redux/appState";
import { emptyGroupCollection, EmptyGroupDetailDto, GroupDetailDto } from "../../api/group/groupDtos";
import React, { useEffect, useState } from "react";
import { loadGroupDetails } from "../../api/group/groupApi";
import ApiCallError, { NoPersonAssignedError } from "../../api/apiCallError";
import "./Groups.css"
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom"
import { GROUPS_PAGE_SUFFIX } from "../../routes";

interface GroupTileProps {
  groupId: number;
}

const GroupTile: React.FC<GroupTileProps> = ({groupId}) => {

  const [groupDetails, setGroupDetails] = useState<GroupDetailDto>(EmptyGroupDetailDto)

  let history = useHistory()

  useEffect(() => {
    loadGroupDetails(groupId)
      .then((data) => {
        console.log(data)
        setGroupDetails(data as GroupDetailDto)
      })
      .catch((e: ApiCallError) => {  });
  }, []);

    return (
    <article className='cocktail' onClick={() => { history.push(GROUPS_PAGE_SUFFIX + '/' + groupId)}}>
      <div className='img-container'>
        <img src={groupDetails.photoPath} alt={groupDetails.name} />
      </div>
      <div className='cocktail-footer'>
        <h3>{groupDetails.name}</h3>
        <h4>{groupDetails.members.map( (member) => {
          <div>
            Name: {member.name}
            Balance: {member.memberBalance}
          </div>
        })}</h4>
      </div>
    </article>
  )
  // return <div>
  //   Group Name: {groupDetails.name}
  // </div>;
};


export default (GroupTile);

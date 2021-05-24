import { connect } from "react-redux";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { AppState } from "../../redux/appState";
import { GroupReadDto } from "../../api/group/groupDtos";
import React, { useEffect, useState } from "react";
import { loadGroups } from "../../redux/group/groupActions";
import ApiCallError, { NoPersonAssignedError } from "../../api/apiCallError";
import { Redirect } from "react-router";
import { CREATE_PERSON_PAGE_SUFFIX } from "../../routes";
import GroupTile from "./GroupTile"
import "./Groups.css"

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
    <section className='section'>
      <h1 className='section-title'>Groups</h1>
      <div className='cocktails-center'>
        {groups.map( (group) => <GroupTile key={group.groupId} groupId={group.groupId}/>)}
        <article className='cocktail' onClick={() => handleAddNewGroup()}>
        <div className='img-container'>
          <img src='https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/plus-512.png' alt='add' />
        </div>
        <div className='cocktail-footer'>
          <h3>Add new group</h3>
        </div>
      </article>
      </div>
    </section>
  )
};


export default (GroupList);

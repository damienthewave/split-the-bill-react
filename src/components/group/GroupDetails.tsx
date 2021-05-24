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




const GroupDetails = (props: any) => {
  const [groupDetails, setGroupDetails] = useState<GroupDetailDto>(EmptyGroupDetailDto)

  let history = useHistory()

  useEffect(() => {
    loadGroupDetails(props.match.params.id)
      .then((data) => {
        setGroupDetails(data as GroupDetailDto)
      })
      .catch((e: ApiCallError) => {  });
  }, []);

  console.log(groupDetails.members)
  return<div>
    <h1>{groupDetails.name}</h1>
    <div className='img-container'>
        <img className="back-group-img" src={groupDetails.photoPath} alt="back" />
      </div>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Group member name</th>
      <th scope="col">Manage expenses</th>
    </tr>
  </thead>
  <tbody>
    {groupDetails.members.map( (member) => 
    <tr>
      <td>{member.name}</td>
      <td>
        <button className="btn btn-light">
          Show expenses
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
        </svg>
        </button>
        </td>
      </tr>
    )}

    <tr>
      <td colSpan={2}>
        <h3>New group member <span className="badge badge-primary">Add</span></h3>
      </td>
    </tr>
    
    </tbody>
  </table>
  </div>
  

};


export default (GroupDetails);

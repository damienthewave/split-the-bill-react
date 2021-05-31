import { EmptyGroupDetailDto, GroupDetailDto } from "../../../api/group/groupDtos";
import React, { useEffect, useState } from "react";
import { loadGroupDetails } from "../../../api/group/groupApi";
import ApiCallError from "../../../api/apiCallError";
import { useHistory } from "react-router-dom"


interface GroupTileProps {
  groupId: number;
}

const GroupDetails: React.FC<GroupTileProps> = ({groupId}) =>{
  const [groupDetails, setGroupDetails] = useState<GroupDetailDto>(EmptyGroupDetailDto)

  let history = useHistory()

  useEffect(() => {
    loadGroupDetails(groupId)
      .then((data) => {
        setGroupDetails(data as GroupDetailDto)
      })
      .catch((e: ApiCallError) => {  });
  }, [groupId]);

  console.log(groupDetails.members)
  return<div>
    <h1>{groupDetails.name}</h1>
    <div className='card mb-3'>
        <img className="card-img-top" style={{width:"600px", height:"200px", objectFit:"cover", objectPosition:"100% 50%"}}src={groupDetails.photoPath ? groupDetails.photoPath : "https://comfort-flight.pl/wp-content/uploads/2020/02/2-people-sitting-with-view-of-yellow-flowers-during-daytime-196666.jpg"} alt="back" />
    </div>
    <h2>Group members</h2>
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
          </tr>)}
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

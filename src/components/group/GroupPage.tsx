import { connect } from "react-redux";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { AppState } from "../../redux/appState";
import { GroupReadDto } from "../../api/group/groupDtos";
import React, { useEffect, useState } from "react";
import { loadGroups } from "../../redux/group/groupActions";
import ApiCallError, { NoPersonAssignedError } from "../../api/apiCallError";
import { Redirect } from "react-router";
import { CREATE_PERSON_PAGE_SUFFIX } from "../../routes";
import GroupList from "./GroupList"
import { Spinner } from "react-bootstrap";
import "./Groups.css"
import { skipPartiallyEmittedExpressions } from "typescript";

interface GroupPageProps {
  userToken: UserTokenDto;
  apiCallsInProgress: boolean;
  groups: GroupReadDto[]

  loadGroups: () => Promise<void>;
}

const GroupPage: React.FC<GroupPageProps> = ({ groups, loadGroups }) => {

  const [noPersonAssigned, setNoPersonAssigned] = useState<boolean>(false);
  const [apiCallsInProgress, setApiCalls] = useState<boolean>(true);

  const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
  }

  useEffect(() => {
    loadGroups()
      .then((data) => {sleep(500).then(() => setApiCalls(false))})
      .catch((e: ApiCallError) => {
        console.log("error when loading groups in GroupPage.tsx")
      });
  }, []);

  if(noPersonAssigned)
    return <Redirect to={CREATE_PERSON_PAGE_SUFFIX} />

 
    if(apiCallsInProgress){
      return<section className='section'><Spinner animation={"border"} variant={"success"} /></section>
    } else {
      return <div>
        <GroupList groups={groups}/>
      </div>
    }
  
 
  
};

const mapStateToProps = (state: AppState) => {
  return {
    userToken: state.userToken,
    apiCallsInProgress: state.apiCallsInProgress > 0,
    groups: state.groups
  };
};

const mapDispatchToProps = {
  loadGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);

import { connect } from "react-redux";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { AppState } from "../../redux/appState";
import { PersonReadDto } from "../../api/person/personDtos";
import React, { useEffect, useState } from "react";
import { getPerson } from "../../redux/person/personActions";
import ApiCallError, { NoPersonAssignedError } from "../../api/apiCallError";
import { Redirect } from "react-router";
import { CREATE_PERSON_PAGE_SUFFIX } from "../../routes";

interface MainPageProps {
  userToken: UserTokenDto;
  apiCallsInProgress: boolean;
  person: PersonReadDto

  getPerson: () => Promise<void>;
}

const MainPage: React.FC<MainPageProps> = ({ apiCallsInProgress, person, getPerson }) => {

  const [noPersonAssigned, setNoPersonAssigned] = useState<boolean>(false);

  useEffect(() => {
    getPerson()
      .catch((e: ApiCallError) => {
        if(e.equals(NoPersonAssignedError))
          setNoPersonAssigned(true);
      });
  }, []);

  if(noPersonAssigned)
    return <Redirect to={CREATE_PERSON_PAGE_SUFFIX} />

  return apiCallsInProgress
    ? <div>Wait for it...</div>
    : <div>Hi, {person.name}</div>;
};

const mapStateToProps = (state: AppState) => {
  return {
    userToken: state.userToken,
    apiCallsInProgress: state.apiCallsInProgress > 0,
    person: state.person
  };
};

const mapDispatchToProps = {
  getPerson
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

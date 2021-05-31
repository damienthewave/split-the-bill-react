import { connect } from "react-redux";
import { AppState } from "../../redux/appState";
import { PersonReadDto } from "../../api/person/personDtos";
import React, { useEffect, useState } from "react";
import { getPerson } from "../../redux/person/personActions";
import ApiCallError, { NoPersonAssignedError } from "../../api/apiCallError";
import { Redirect } from "react-router";
import { CREATE_PERSON_PAGE_SUFFIX } from "../../routes";
import FriendshipPanel from "./friendship/FriendshipPanel";
import GroupPanel from "./group/GroupPanel";

interface MainPageProps {
  person: PersonReadDto;
  getPerson: () => Promise<void>;
}

const MainPage: React.FC<MainPageProps> = ({ person, getPerson }) => {
  const [noPersonAssigned, setNoPersonAssigned] = useState<boolean>(false);

  useEffect(() => {
    getPerson().catch((e: ApiCallError) => {
      if (e.equals(NoPersonAssignedError)) setNoPersonAssigned(true);
    });
  }, []);

  if (noPersonAssigned) {
    return <Redirect to={CREATE_PERSON_PAGE_SUFFIX} />;
  }

  return (
    <div>
      <div className="mx-5 px-5 mt-3">
        <div className="row">
          <div className="col-8">
            <div className="border rounded border-success bg-light">
              <div className="p-2">
                <GroupPanel />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="border rounded border-success bg-light">
              <div className="p-2">
                <FriendshipPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    person: state.person,
  };
};

const mapDispatchToProps = {
  getPerson,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

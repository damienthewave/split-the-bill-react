import { connect } from "react-redux";
import { AppState } from "../../redux/appState";
import { PersonReadDto } from "../../api/person/personDtos";
import React, { useEffect, useState } from "react";
import { getPerson } from "../../redux/person/personActions";
import ApiCallError, { NoPersonAssignedError } from "../../api/apiCallError";
import { Redirect } from "react-router";
import { CREATE_PERSON_PAGE_SUFFIX } from "../../routes";
import MainNavbar from "../common/MainNavbar";
import FriendshipPanel from "./FriendshipPanel";

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

  const personDetails = (
    <div className="row justify-content-center">
      <div className="col-1">
        <img
          width={60}
          height={60}
          className="rounded-circle"
          src="https://images-na.ssl-images-amazon.com/images/I/812SAGw9yvL._AC_SX679_.jpg"
        />
      </div>
      <div className="col-4">
        <span>{person.name}</span>
      </div>
    </div>
  );

  const groupsPane = <h4 className="text-left">Groups</h4>;

  return (
    <div>
      <MainNavbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <div className="border rounded">
              <div className="p-2">{personDetails}</div>
              <div className="p-2">{groupsPane}</div>
            </div>
          </div>
          <div className="col">
            <div className="border rounded">
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

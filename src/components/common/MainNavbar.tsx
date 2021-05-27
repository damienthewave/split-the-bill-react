import React from "react";
import { PersonReadDto } from "../../api/person/personDtos";

interface Props {
  person: PersonReadDto;
}

const MainNavbar = ({ person }: Props) => {
  const personDetails = (
    <div className="btn btn-dark">
      <div className="row py-2 rounded">
        <div className="col-4">
          <img
            width={50}
            height={50}
            className="bg-light rounded-circle img-fluid"
            src="https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png"
          />
        </div>
        <div className="col-8 pl-0 m-auto text-white">
          <span>{person.name}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-success">
      <span className="navbar-brand mb-0 h1">Split The Bill</span>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="">
            Add a new expense
          </a>
        </div>
      </div>
      <div className="px-2">{personDetails}</div>
    </div>
  );
};

export default MainNavbar;

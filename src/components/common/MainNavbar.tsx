import React from "react";
import { Link } from "react-router-dom";
import { PersonReadDto } from "../../api/person/personDtos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/login/loginActions";
import { connect } from "react-redux";
import { ADD_EXPENSE_PAGE_SUFFIX, STATISTICS_PAGE } from "../../routes";

interface Props {
  person: PersonReadDto;
  logout: () => void;
}

const MainNavbar = ({ person, logout }: Props) => {
  const personDetails = (
    <div className="block bg-dark text-white rounded px-2 py-2">
      <div className="row justify-content-between py-0 mr-1">
        <div className="col-10">
          <div className="row">
            <div className="col-auto">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <div className="col-auto">{person.name}</div>
          </div>
        </div>
        <div className="btn btn-dark col-2 py-0">
          <div className="pl-0 pr-4">
            <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-success">
      <Link to="/">
        <img src={"logo.png"} height={60} width={60} alt={"logo"} />
        <span className="navbar-brand h4 pt-3">Split The Bill</span>
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to={ADD_EXPENSE_PAGE_SUFFIX}>
            <div className="nav-item nav-link">Add a new expense</div>
          </Link>
        </div>
        <div className="navbar-nav">
          <Link to={STATISTICS_PAGE}>
            <div className="nav-item nav-link">Statistics</div>
          </Link>
        </div>
      </div>
      <div className="px-2">{personDetails}</div>
    </div>
  );
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(MainNavbar);

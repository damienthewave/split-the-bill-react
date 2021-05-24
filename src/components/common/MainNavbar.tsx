import React from "react";

const MainNavbar = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-success">
      <span className="navbar-brand mb-0 h1">Split The Bill</span>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="">
            Add a new expense
          </a>
          <a className="nav-item nav-link" href="">
            Groups
          </a>
          <a className="nav-item nav-link" href="">
            Friends
          </a>
        </div>
      </div>
      <div>
        <button className="btn btn-danger btn-sm">Logout?</button>
      </div>
    </div>
  );
};

export default MainNavbar;

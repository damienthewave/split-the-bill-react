import { connect } from "react-redux";
import { AppState } from "../../redux/appState";
import React from "react";

interface Props {}

const GroupPanel = (props: Props) => {
  return (
    <div className="container">
      <h4 className="text-left">Groups</h4>
      <br />
      <div>Here goes the rest...</div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPanel);

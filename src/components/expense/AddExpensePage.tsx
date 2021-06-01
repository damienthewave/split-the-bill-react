import { connect } from "react-redux";
import { AppState } from "../../redux/appState";
import { Modal } from "react-bootstrap";

interface Props {
  //groups: Group[]
}

const AddExpensePage = () => {
  return <div>The rest here...</div>;
};

const mapStateToProps = (state: AppState) => {
  return {
    //groups: state.groups
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);

import { AppState } from "../../../redux/appState";
import { connect } from "react-redux";
import "./LoadingSpinnerContainer.css";

interface Props {
  apiCallsInProgress: boolean;
}

const LoadingSpinnerContainer = ({ apiCallsInProgress }: Props) => {
  return apiCallsInProgress ? (
    <div className="loading-spinner-container">
      <div className="spinner-centered">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div>Loading...</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
  };
};

export default connect(mapStateToProps)(LoadingSpinnerContainer);

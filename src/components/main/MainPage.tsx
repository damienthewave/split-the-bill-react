import { connect } from "react-redux";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { AppState } from "../../redux/appState";

interface MainPageProps {
  userToken: UserTokenDto;
}

const MainPage = ({ userToken }: MainPageProps) => {
  return <div>Hi, this is your token: {userToken.token}</div>;
};

const mapStateToProps = (state: AppState) => {
  return {
    userToken: state.userToken,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

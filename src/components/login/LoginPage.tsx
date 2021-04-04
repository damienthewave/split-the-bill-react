import { connect } from "react-redux";
import { LoginDto } from "../../api/login/loginDtos";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { AppState } from "../../redux/appState";
import { login } from "../../redux/login/loginActions";

interface LoginPageProps {
  apiCallsInProgress: boolean;
  userToken: UserTokenDto;

  login: (loginDto: LoginDto) => Promise<void>;
}

const LoginPage = ({
  apiCallsInProgress,
  userToken,
  login,
}: LoginPageProps) => {
  return <div></div>;
};

const mapStateToProps = (state: AppState) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
    userToken: state.userToken,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (loginDto: LoginDto) => dispatch(login(loginDto)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

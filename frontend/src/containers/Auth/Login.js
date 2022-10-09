import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../../utils";

import "./Login.scss";

import { handleLoginApi } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";

// import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      ...this.state,
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.userData);
        console.log("Login Successful", data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      ...this.state,
      isShowPassword: this.state.isShowPassword ? false : true,
    });
    console.log(this.state.isShowPassword);
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <h2 className="col-12 text-center">Đăng nhập</h2>
            <div className="col-12 form-group login-input">
              <label> Tên tài khoản:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên tài khoản"
                onChange={(event) => {
                  this.handleOnChangeUserName(event);
                }}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label> Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Nhập vào mật khẩu "
                  onChange={(event) => {
                    this.handleOnChangePassword(event);
                  }}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  {this.state.isShowPassword ? (
                    <i className="fas fa-eye-slash eyes-icon"></i>
                  ) : (
                    <i className="fas fa-eye eyes-icon"></i>
                  )}
                </span>
              </div>
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 form-group">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Đăng nhập
              </button>
            </div>
            {/* 
            <div className="col-12">
              <span className="forgot-password">Forgot your password ?</span>
            </div>

            <div className="col-12 text-center">
              <span className="text-other-login">Or login with: </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) => {
      dispatch(actions.userLoginSuccess(userInfor));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

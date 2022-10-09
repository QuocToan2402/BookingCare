import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import "./UserRedux.scss";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: CRUD_ACTIONS.CREATE,
      id: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        avatar: "",
        previewImgUrl: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }
  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log(base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: base64,
      });
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };
  checkValidate = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i <= arrCheck.length; i++) {
      if (this.state[arrCheck[i]] === "") {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = (event) => {
    event.preventDefault();
    let isValid = this.checkValidate();
    if (isValid === false) {
      return;
    }
    let arrGenders = this.props.genderRedux;
    let arrRoles = this.props.roleRedux;
    let arrPositions = this.props.positionRedux;
    let { action } = this.state;
    console.log("Action", this.state);
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        phoneNumber: this.state.phoneNumber,
        avatar: this.state.avatar,
      });

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editAUserRedux({
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        roleId: this.state.role,
        positionId: this.state.position,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        avatar: this.state.avatar,
      });
    }
    //fire action
    this.props.fetchUserRedux();
  };
  handleEditUserFromParent = (user) => {
    let imageBase64;
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "hardcode",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      role: user.role,
      position: user.positionId,
      avatar: "",
      action: CRUD_ACTIONS.EDIT,
      id: user.id,
      previewImgUrl: imageBase64,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isGetGender = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    return (
      <>
        <div className="container">
          {isGetGender ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="title">Quản lý tài khoản người dùng</div>
          <div className="add-user">Thêm mới người dùng </div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <form>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label htmlFor="inputEmail4">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        value={email}
                        onChange={(event) => {
                          this.onChangeInput(event, "email");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputPassword4">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        value={password}
                        onChange={(event) => {
                          this.onChangeInput(event, "password");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputFirstName">Tên </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputFirstName"
                        value={firstName}
                        onChange={(event) => {
                          this.onChangeInput(event, "firstName");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputLastName">Họ </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputLastName"
                        value={lastName}
                        onChange={(event) => {
                          this.onChangeInput(event, "lastName");
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label htmlFor="phoneNumber">Số điện thoại </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(event) => {
                          this.onChangeInput(event, "phoneNumber");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-9">
                      <label htmlFor="inputAddress">Địa chỉ </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        value={address}
                        onChange={(event) => {
                          this.onChangeInput(event, "address");
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label htmlFor="inputGender">Giới tính</label>
                      <select
                        id="inputGender"
                        className="form-control"
                        value={gender}
                        onChange={(event) => {
                          this.onChangeInput(event, "gender");
                        }}
                      >
                        {genders &&
                          genders.length > 0 &&
                          genders.map((gender, index) => {
                            return (
                              <option key={index} value={gender.keyMap}>
                                {gender.valueVI}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputRole">Chức danh</label>
                      <select
                        id="inputRole"
                        className="form-control"
                        value={position}
                        onChange={(event) => {
                          this.onChangeInput(event, "position");
                        }}
                      >
                        {positions &&
                          positions.length > 0 &&
                          positions.map((position, index) => {
                            return (
                              <option key={index} value={position.keyMap}>
                                {position.valueVI}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputPosition">Vai trò</label>
                      <select
                        id="inputPosition"
                        className="form-control"
                        value={role}
                        onChange={(event) => {
                          this.onChangeInput(event, "role");
                        }}
                      >
                        {roles &&
                          roles.length > 0 &&
                          roles.map((role, index) => {
                            return (
                              <option key={index} value={role.keyMap}>
                                {role.valueVI}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor="inputAvatar">Ảnh đại diện </label>
                      <div
                        className="preview-img-container"
                        onChange={(event) => {
                          this.handleOnChangeImg(event);
                        }}
                      >
                        <input type="file" id="previewImg" hidden />
                        <label className="label-upload" htmlFor="previewImg">
                          Tải ảnh
                          <i className="fas fa-upload"></i>
                        </label>
                        <div
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${this.state.previewImgUrl})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning mt-2"
                        : "btn btn-primary mt-2"
                    }
                    onClick={(event) => {
                      this.handleSaveUser(event);
                    }}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT
                      ? "Lưu thay đổi"
                      : "Lưu người dùng"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <TableManageUser
            handleEditUserFromParent={this.handleEditUserFromParent}
            action={this.state.action}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processLogout: () => dispatch(actions.processLogout())
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

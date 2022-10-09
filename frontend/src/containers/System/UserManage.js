import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import ModelUser from "../System/ModelUser";
import ModalEditUser from "./ModalEditUser";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayUser: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrayUser: response.users,
      }); // Basically,  cvbnm,mnbv][plknb setState is async so we can user callback
    }
  };
  handleAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id " });
      }
    } catch (error) {}
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    console.log(user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      console.log(res);
      if (res && res.errCode === 0)
        this.setState({
          isOpenModalEditUser: false,
        });
      await this.getAllUsersFromReact();
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="user-container">
        <ModelUser
          isOpen={this.state.isOpenModalUser}
          hiddenModel={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser ? (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            hiddenModel={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        ) : (
          ""
        )}

        <div className="title text-center">Manage users </div>
        <div style={{ margin: "20px 5px" }}>
          <button
            className="btn btn-primary px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            <i className="fas fa-plus"></i>
            Add new user
          </button>
        </div>
        <div className="users-table ">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.arrayUser &&
                this.state.arrayUser.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(user)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(user)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

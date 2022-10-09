import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModelEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "ssadds",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }
  toggle = () => {
    this.props.hiddenModel();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrayInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrayInput.length; i++) {
      if (!this.state[arrayInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrayInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    //validate
    let isValid = this.checkValidateInput();
    if (isValid) {
      //call api from parents
      this.props.editUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                disabled
                type="text"
                value={this.state.email}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                value={this.state.password}
                type="password"
                disabled
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                value={this.state.firstName}
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                value={this.state.lastName}
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
              />
            </div>
            <div className="input-container max-w">
              <label>Address</label>
              <input
                value={this.state.address}
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
              />
            </div>
          </div>
          <MdEditor
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkdown}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save change
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);

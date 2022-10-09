import React, { Component } from "react";
import DatePicker from "react-flatpickr";
import { connect } from "react-redux";

import { CommonUtils, dateFormat } from "../../../utils";
import moment from "moment";
import { getAllPatientForDoctor } from "../../../services/userService";

import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      image64: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevstate, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedyModal = () => {
    this.props.sendRemedyModal(this.state);
  };
  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedyModal } =
      this.props;
    console.log(this.props);
    return (
      <>
        <Modal
          size="md"
          isOpen={isOpenModal}
          className={"booking-modal-container"}
        >
          <div className="modal-header">
            <h5 className="modal-title">Gửi hóa đơn khám bệnh </h5>
            <button
              className="close"
              type="button"
              aria-label="label"
              onClick={closeRemedyModal}
            >
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email bệnh nhân</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeEmail(event)}
                />
              </div>
              <div className="col-6 form-group">
                <label>Chọn file đơn thuốc </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => this.handleOnchangeImage(event)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.handleSendRemedyModal()}
            >
              Send
            </Button>
            <Button color="secondary" onClick={closeRemedyModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);

import { Modal } from "reactstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import _ from "lodash";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import ProfileDoctor from "./ProfileDoctor";
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";

import { postPatientBookAppointment } from "../../../services/userService";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
    };
  }
  async componentDidMount() {
    this.props.getGenders();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && _.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  handleChangeSelect = (selectOption) => {
    this.setState({
      selectedGender: selectOption,
    });
  };
  buildDataGender = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = item.valueVI;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeDatePicker = (date) => {
    console.log(date);
    this.setState({
      birthday: date[0],
    });
  };
  builtTimeBooking = (dataTime) => {
    let time = dataTime.timeTypeData.valueVI;
    let date = moment
      .unix(Date.parse(dataTime.date) / 1000)
      .format("dddd - DD/MM/YYYY");
    return `${time} - ${date}`;
  };
  builtDoctorName = (dataTime) => {
    let name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
    return name;
  };
  handleConfirmBooking = async (doctorId, timeType) => {
    console.log(timeType);
    // data.email || Idata.doctorId || !data.timeType || !data.date
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.builtTimeBooking(this.props.dataTime);
    let doctorName = this.builtDoctorName(this.props.dataTime);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.fullName,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.currentDate,
      selectedGender: this.state.selectedGender.value,
      doctorId: doctorId,
      timeType: timeType,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Đặt lịch thành công !!!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.setState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        reason: "",
        birthday: "",
        selectedGender: "",
        doctorId: "",
        genders: "",
        timeType: "",
      });
      this.props.closeBookingClose();
    } else {
      toast.error(" Đặt lịch thất bại !");
    }
  };

  render() {
    let { isOpenModal, closeBookingClose, dataTime } = this.props;
    let doctorId = dataTime.doctorId;
    let timeType = dataTime.timeType;

    // console.log("doctor id ", this.props.genders);
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Đặt lịch khám bệnh </span>
              <span className="right" onClick={closeBookingClose}>
                <i className="fas fa-fa-times"></i>{" "}
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-infor">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescriptionDoctor={false}
                  dateTime={dataTime}
                  isShowLinkDetail={false}
                  isShowPrice={false}
                />
              </div>

              <div className="row m-20">
                <div className="col-6 form-group">
                  <label>Họ tên </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "fullName")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Số điện thoại </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "email")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ liên hệ </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "address")
                    }
                  />
                </div>
                <div className="col-12 form-group">
                  <label>Lý do khám </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "reason")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label> Ngày sinh</label>
                  <DatePicker
                    className="form-control"
                    value={this.state.birthday}
                    onChange={this.handleOnchangeDatePicker}
                  />
                </div>
                <div className="col-6 form-group">
                  <label> Giới tính</label>
                  <Select
                    style={{ maxHeight: "8px" }}
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
              </div>
              <div className="booking-modal-footer">
                <button
                  className="btn-booking-confirm"
                  onClick={() => this.handleConfirmBooking(doctorId, timeType)}
                >
                  Xác nhận
                </button>
                <button
                  className="btn-booking-cancel"
                  onClick={closeBookingClose}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

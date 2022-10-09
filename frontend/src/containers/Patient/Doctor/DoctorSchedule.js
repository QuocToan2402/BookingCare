import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";
import {
  getDetailInforDoctor,
  getScheduleDoctorByDate,
} from "../../../services/userService";
import "./DoctorSchedule.scss";
import BookingModal from "./BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
      date: "",
    };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrayDays = async () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (i === 0) {
        let ddMM = moment(new Date()).format("DD/MM");
        let today = `Hôm nay - ${ddMM}`;
        object.label = today;
      } else {
        object.label = this.capitalizeFirstLetter(
          moment(new Date()).add(i, "days").format("dddd - DD/MM")
        );
      }
      object.value = moment(new Date()).add(i, "days").format("DD/MM/YYYY");
      allDays.push(object);
    }
    this.setState({
      allDays: allDays,
    });
  };
  async componentDidMount() {
    let allDays = await this.getArrayDays();

    let res = await getScheduleDoctorByDate(
      this.props.doctorIdFromParent,
      allDays && allDays[0] && allDays[0].value
    );

    this.setState({
      allAvailableTime: res.data ? res.data : [],
    });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrayDays();
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0]?.value
      );

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      this.setState({
        ...this.state,
        date: date,
      });
      console.log("date", date);

      let res = await getScheduleDoctorByDate(doctorId, date); // getScheduleDoctorByDate

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
    }
  };
  handleClickScheduleTime = (time) => {
    console.log(time);
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };
  closeBookingClose = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
      date,
    } = this.state;

    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>Lịch khám </span>{" "}
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  {" "}
                  <div className="time-content-btns">
                    {allAvailableTime.map((item, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {item.timeTypeData.valueVI}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      Chọn <i className="far fa-hand-point-up"></i> và đặt miễn
                      phí
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule">
                  "Không có lịch hẹn trong thời gian này, vui lòng chọn thời
                  gian khác "
                </div>
              )}
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModal}
          currentDate={date}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

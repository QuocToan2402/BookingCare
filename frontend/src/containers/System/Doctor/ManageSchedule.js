import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";
import "./ManageSchedule.scss";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import _, { times } from "lodash";
import moment from "moment";
import { toast } from "react-toastify";
import { dateFormat } from "../../../utils";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: {},
      listDoctors: [],
      currentDate: new Date(),
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchALLDoctors();
    this.props.fetchALLScheduleTime();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      let data = inputData.map((item, index) => {
        let object = {};
        let label = `${item.lastName} ${item.firstName}`;
        object.label = label;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
      let data = this.props.allScheduleTimes;
      console.log(data);
      if (data && data.length > 0) {
        data = data.map((item) => {
          return { ...item, isSelected: false };
        });
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  handleChange = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleOnChangeDatePicker = (date) => {
    console.log("gee", date);
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item, index) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
          return item;
        }
        this.setState({
          rangeTime: rangeTime,
        });
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date ! ");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid select !!!");
      return;
    }
    console.log("current", currentDate);
    let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formatedDate = new Date(currentDate).getTime();
    console.log("formatedDate", formatedDate);
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((selectedDoctor, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = selectedDoctor.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid select !!!");
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Thêm lịch khám thành công  ! ");
    } else {
      toast.error("Invalid select !!!");
    }
    // console.log("check result", result);
    // console.log("check res", res);
  };
  render() {
    let { rangeTime } = this.state;

    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">Quản lý kế hoạch khám bệnh của bác sĩ </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label> Chọn bác sĩ </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label> Chọn ngày</label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleClickTime(item)}
                    >
                      {item.valueVI}
                    </button>
                  );
                })}
            </div>
            <div className="col-12"></div>
            <button
              className="btn btn-primary btn-save-schedule"
              onClick={() => this.handleSaveSchedule()}
            >
              Lưu thông tin
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    allScheduleTimes: state.admin.allScheduleTimes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchALLDoctors: () => dispatch(actions.fetchALLDoctors()),
    fetchALLScheduleTime: () => dispatch(actions.fetchALLScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

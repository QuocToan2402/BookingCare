import React, { Component } from "react";
import DatePicker from "react-flatpickr";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { dateFormat } from "../../../utils";
import moment from "moment";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import { toast } from "react-toastify";
import RemedyModal from "../../Patient/Doctor/RemedyModal";
import LoadingOverlay from "@ronchalant/react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    let { currentDate } = this.state;
    let formatedDate = moment(currentDate).format("DD/MM/YYYY");
    this.getDataPatient(this.props.user, formatedDate);
  }
  getDataPatient = async (user, formatedDate) => {
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = moment(currentDate).format("DD/MM/YYYY");
        this.getDataPatient(user, formatedDate);
      }
    );
  };
  handleBtnConfirm = (item) => {
    console.log(item);
    let data = {
      doctorId: item.doctorID,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });

    if (res && res.errCode === 0) {
      this.closeRemedyModal();
      this.setState({
        isShowLoading: false,
      });
      toast.success("Gửi hóa đơn thành công ");
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Gửi hóa đơn không thành công ");
    }
  };

  handleBtnRemedy = () => {};
  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Đang gửi hóa đơn ..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label htmlFor="">Chọn ngày khám </label>
                <DatePicker
                  value={this.state.currentDate}
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th> Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Actions</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        console.log(item);
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.timeTypeDataPatient.valueVI}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.genderData.valueVI}</td>
                            <td>
                              <button
                                onClick={() => this.handleBtnConfirm(item)}
                                className="mp-btn-confirm"
                              >
                                Xác nhận
                              </button>
                              <button className="mp-btn-cancel">Hủy</button>
                              {/* <button
                                className="mp-btn-remedy"
                                onClick={() => this.handleBtnRemedy()}
                              >
                                Gửi hóa đơn
                              </button> */}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ color: "orange", textAlign: "center" }}
                        >
                          Không có bệnh nhân đặt lịch!!!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedyModal={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

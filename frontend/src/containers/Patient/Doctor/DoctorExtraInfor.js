import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import * as actions from "../../../store/actions";
import NumberFormat from "react-number-format";
import { getExtraInforDoctorById } from "../../../services/userService";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }
  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">ĐỊA CHỈ KHÁM</div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.nameClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <>
              <div className="short-infor">
                {extraInfor && extraInfor.priceTypeData && (
                  <>
                    <span className="detail-span">
                      Giá khám:
                      <NumberFormat
                        value={extraInfor.priceTypeData.valueVI}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    </span>

                    <span
                      className="currency"
                      onClick={() => this.showHideDetailInfor(true)}
                    >
                      &nbsp; Xem chi tiết
                    </span>
                  </>
                )}
              </div>
            </>
          )}
          {isShowDetailInfor === true && (
            <>
              {" "}
              <div className="title-price">GIÁ KHÁM: .</div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">Giá khám</span>
                  <span className="right"> 250.00đ</span>
                </div>
                <div className="note">
                  Được ưu tiên khám trước khi đặt khám qua Booking Care.
                </div>
              </div>
              <div className="payment">
                Người bệnh có thể thanh toán chi phí bằng hình thức
                {extraInfor && extraInfor.paymentTypeData
                  ? extraInfor.paymentTypeData.valueVI
                  : ""}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchALLDoctors: () => dispatch(actions.fetchALLDoctors()),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);

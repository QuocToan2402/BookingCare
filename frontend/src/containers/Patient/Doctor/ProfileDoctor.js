import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { getProfileDoctorById } from "../../../services/userService";
import "./ProfileDoctor.scss";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    // console.log("check", this.props.doctorId);
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getInforDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }
  renderTimeBooking = (dataTime) => {
    if (dataTime) {
      let time = dataTime.timeTypeData.valueVI;
      console.log("time d", time);
      let date = moment
        .unix(Date.parse(dataTime.date) / 1000)
        .format("dddd - DD/MM/YYYY");

      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>Miễn phí cài đặt </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    let { dataProfile } = this.state;
    let {
      isShowDescriptionDoctor,
      dateTime,
      isShowLinkDetail,
      doctorId,
      isShowPrice,
    } = this.props;

    let nameDoctor = "";
    if (dataProfile && dataProfile.positionData) {
      nameDoctor = `${dataProfile.positionData.valueVI}, ${dataProfile.lastName} ${dataProfile.firstName} `;
    }

    return (
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  dataProfile && dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">{nameDoctor}</div>
              <div className="down">
                {isShowDescriptionDoctor === true ? (
                  <>
                    {" "}
                    {dataProfile &&
                      dataProfile.Markdown &&
                      dataProfile.Markdown.description && (
                        <span> {dataProfile.Markdown.description}</span>
                      )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dateTime)}</>
                )}
              </div>
            </div>
          </div>
          {isShowLinkDetail === true && (
            <div className="view-detail-doctor">
              <Link to={`/detail-doctor/${doctorId}`}>Xem thêm ...</Link>
            </div>
          )}
          {isShowPrice && (
            <div className="price">
              Giá khám: &nbsp;
              {dataProfile && dataProfile.Doctor_Infor && (
                <NumberFormat
                  className="currency"
                  value={dataProfile.Doctor_Infor.priceTypeData.valueVI}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              )}
            </div>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

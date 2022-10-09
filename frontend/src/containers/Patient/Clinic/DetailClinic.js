import { getAction } from "connected-react-router";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../components/HomePage/Header/HomeHeader";
import { getAllDetailClinicById } from "../../../services/userService";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailClinic.scss";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];

        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }

          this.setState({
            dataDetailClinic: res.data,
            arrDoctorId: arrDoctorId,
          });
        }
      }
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getAllDetailClinicById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDocttorId = [];
        if (data && _.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length) {
            arr.map((item) => {
              arrDocttorId.push(item.doctorId);
            });
          }

          this.setState({
            dataDetailClinic: res.data,
            arrDoctorId: arrDocttorId,
          });
        }
      }
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    console.log(this.state);
    return (
      <>
        <HomeHeader />
        <div className="wapper-bg-detail-specialty">
          <div className="detail-specialty-container">
            <div className="detail-specialty-body">
              <div className="description-specialty">
                {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                  <div className="bg-dalieu">
                    {" "}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dataDetailClinic.descriptionHTML,
                      }}
                    />
                  </div>
                )}
              </div>

              {arrDoctorId &&
                arrDoctorId.length > 0 &&
                arrDoctorId.map((item, index) => {
                  return (
                    <div className="each-doctor" key={index}>
                      <div className="dt-content-left">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                        />
                      </div>
                      <div className="dt-content-right">
                        <div className="doctor-schedule">
                          <DoctorSchedule doctorIdFromParent={item} />
                        </div>
                        <div className="doctor-extra-infor">
                          <DoctorExtraInfor doctorIdFromParent={item} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);

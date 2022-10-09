import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListDoctors.scss";
import { withRouter } from "react-router";
import HomeHeader from "../../Header/HomeHeader";
import {
  getAllSpecialty,
  getDetailInforDoctor,
} from "../../../../services/userService";
import "antd/dist/antd.css";
import * as actions from "../../../../store/actions";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;
class ListDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      arrDoctorInfor: [],
      allSpecialty: [],
      searchValue: "",
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topsDoctorsRedux !== this.props.topsDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topsDoctorsRedux,
      });
    }
  }
  getInforDoctorById = async (doctorId) => {
    let resDoctorInfor = await getDetailInforDoctor(doctorId);
    return resDoctorInfor;
  };
  async componentDidMount() {
    let topDoctors = this.props.topsDoctorsRedux;

    let resSpecialty = await getAllSpecialty();
    this.setState({
      ...this.setState,
      allSpecialty: resSpecialty.data,
      arrDoctors: topDoctors,
    });

    this.state.arrDoctors.forEach(async (doctor) => {
      this.getInforDoctorById(doctor.id).then((item) => {
        this.setState({
          ...this.state,
          arrDoctorInfor: [...this.state.arrDoctorInfor, item.infor.data],
        });
      });
    });
  }
  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  nonAccentVietnamese = (str) => {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };
  onSearch = (e) => {
    console.log("dsadsa", typeof e.target.value);
    if (e.target.value !== "") {
      let newList = this.state.arrDoctors.filter((item) => {
        return (
          this.nonAccentVietnamese(item.firstName).includes(
            this.nonAccentVietnamese(e.target.value)
          ) ||
          this.nonAccentVietnamese(item.lastName).includes(
            this.nonAccentVietnamese(e.target.value)
          ) ||
          this.nonAccentVietnamese(item.positionData.valueVI).includes(
            this.nonAccentVietnamese(e.target.value)
          )
        );
      });
      console.log("newl", newList);
      this.setState({
        ...this.state,
        arrDoctors: newList,
      });
    } else {
      this.setState({
        ...this.state,
        arrDoctors: this.props.topsDoctorsRedux,
      });
    }
  };

  render() {
    let { arrDoctors } = this.state;
    console.log("s", arrDoctors);
    return (
      <>
        {console.log("render", this.state.arrDoctorInfor)}
        <div>
          <HomeHeader />
          <div className="container-list">
            <h2> Danh Sách Các Bác Sĩ </h2>
            <Search
              placeholder="Tìm kiếm bác sĩ "
              onChange={(e) => this.onSearch(e)}
              enterButton
              size="large"
              style={{ width: 800 }}
            />
            {arrDoctors &&
              arrDoctors.map((item) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVI}, ${item.lastName} ${item.firstName}`;
                return (
                  <div
                    key={item.id}
                    className="item"
                    onClick={() => {
                      this.handleViewDetailDoctor(item);
                    }}
                  >
                    <div className="item-img">
                      <img src={imageBase64} alt="da-lieu.jpg" />
                    </div>
                    <div className="item-name">{nameVi}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topsDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { loadTopDoctor: () => dispatch(actions.fetchTopDoctor()) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListDoctor)
);

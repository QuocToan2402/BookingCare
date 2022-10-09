import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./OutstandingDoctor.scss";
import "../HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtImg from "../../../assets/images/specialty/co-xuong-khop.jpg";
import Slider from "react-slick";
import "./OutstandingDoctor.scss";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import { getAction } from "connected-react-router";
import { getAllSpecialty } from "../../../services/userService";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      allSpecialty: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topsDoctorsRedux !== this.props.topsDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topsDoctorsRedux,
      });
    }
  }
  async componentDidMount() {
    this.props.loadTopDoctor();
  }
  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  handleViewAllDoctors = () => {
    if (this.props.history) {
      this.props.history.push(`/all-doctor`);
    }
  };
  render() {
    let topDoctors = this.props.topsDoctorsRedux;

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="wrapper_bg">
        <div className="section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Bác sĩ nổi bật tuần qua</span>
              <button
                className="btn-section"
                onClick={() => {
                  this.handleViewAllDoctors();
                }}
              >
                {" "}
                Tìm kiếm{" "}
              </button>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                {topDoctors &&
                  topDoctors.length > 0 &&
                  topDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVI}, ${item.lastName} ${item.firstName}`;
                    return (
                      <div
                        className="outstanding-doctor-customize"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <img src={imageBase64} alt="" />
                        <div className="outstanding-doctor-title">{nameVi}</div>
                        <div className="outstanding-doctor-subtitle">
                          Sức khỏe tâm thần
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topsDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);

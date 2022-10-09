import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./MedicalFacility.scss";
import "../HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtImg from "../../../assets/images/specialty/co-xuong-khop.jpg";
import Slider from "react-slick";
import "./MedicalFacility.scss";
import { getAction } from "connected-react-router";
import { getAllClinic } from "../../../services/userService";
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
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  handleViewAllClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/all-clinic`);
    }
  };
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    let { dataClinics } = this.state;
    return (
      <div className="section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật </span>
            <button
              className="btn-section"
              onClick={() => {
                this.handleViewAllClinic();
              }}
            >
              Xem thêm
            </button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="medical-customize"
                      onClick={() => {
                        this.handleViewDetailClinic(item);
                      }}
                    >
                      <img src={item.image} alt="" />
                      <div>{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);

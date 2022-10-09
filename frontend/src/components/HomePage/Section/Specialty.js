import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "./Specialty.scss";
import "../HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import "./Specialty.scss";

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

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  handleViewAllSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/all-specialty`);
    }
  };
  render() {
    let { dataSpecialty } = this.state;

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button
              className="btn-section"
              onClick={() => {
                this.handleViewAllSpecialty();
              }}
            >
              {" "}
              Xem thêm{" "}
            </button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="specialty-customize"
                      onClick={() => {
                        this.handleViewDetailSpecialty(item);
                      }}
                    >
                      {/* <div
                        className="bg-image section-specialty"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div> */}
                      <img src={item.image} alt="" />
                      <div className="title-specialty">{item.name} </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);

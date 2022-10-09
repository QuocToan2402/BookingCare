import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./About.scss";
import "../HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtImg from "../../../assets/images/specialty/co-xuong-khop.jpg";

import aboutNetwork from "../../../assets/images/about_network.png";
import Slider from "react-slick";
import "./About.scss";
class About extends Component {
  render() {
    return (
      <div className="section-specialty">
        <div className="section-about-header">
          Truyền thông nói gì về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="560"
              height="315"
              title="BookingCare trên VTV1"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
              src="https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1"
            ></iframe>
          </div>
          <div className="content-right">
            <img src={aboutNetwork} alt="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(About);

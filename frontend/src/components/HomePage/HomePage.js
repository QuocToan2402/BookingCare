import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./Header/HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import "./HomePage.scss";
import OuttandingDoctor from "./Section/OuttandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import Footer from "./Section/Footer";
class HomePage extends Component {
  render() {
    return (
      <>
        <HomeHeader isShowBanner={true} />
        <Specialty />
        <MedicalFacility />
        <OuttandingDoctor />
        <Handbook />
        <About />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

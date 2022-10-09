import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtImg from "../../../assets/images/specialty/co-xuong-khop.jpg";
import Slider from "react-slick";
import "./HandBook.scss";
import { getAllHandBook } from "../../../services/userService";
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
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
    };
  }
  async componentDidMount() {
    let res = await getAllHandBook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailHandBook = (item) => {
    console.log("ok");
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  };
  handleViewAllHandbook = () => {
    if (this.props.history) {
      this.props.history.push(`/all-handbook`);
    }
  };
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    let { dataHandbook } = this.state;
    return (
      <div className="section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang </span>
            <button
              className="btn-section"
              onClick={() => {
                this.handleViewAllHandbook();
              }}
            >
              {" "}
              Xem thêm{" "}
            </button>
          </div>
          <div className="section-handbook-body">
            <Slider {...settings}>
              {dataHandbook &&
                dataHandbook.length > 0 &&
                dataHandbook.map((item, index) => {
                  return (
                    <div
                      className="handbook-customize"
                      onClick={() => {
                        this.handleViewDetailHandBook(item);
                      }}
                    >
                      <img src={item.image} alt="" />
                      <div className="title-handbook">{item.title}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);

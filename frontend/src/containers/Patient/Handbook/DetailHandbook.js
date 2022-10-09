import { getAction } from "connected-react-router";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../components/HomePage/Header/HomeHeader";
import { getAllDetailHandBookById } from "../../../services/userService";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./Detaihandbook.scss";

class DetailHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailHandBook: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailHandBookById({
        id: id,
      });

      if (res && res.errCode === 0) {
        this.setState({
          dataDetailHandBook: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { arrDoctorId, dataDetailHandBook } = this.state;
    console.log("dasd", dataDetailHandBook);
    let imageBase64 = "";
    if (dataDetailHandBook.image) {
      imageBase64 = new Buffer(dataDetailHandBook.image, "base64").toString(
        "binary"
      );
    }
    return (
      <>
        <HomeHeader />
        <div className="container-md">
          <h2 className="title-handbook">{dataDetailHandBook.title}</h2>

          <div className="content-handbook">
            <div className="main-img">
              <img src={imageBase64} alt="da-lieu.jpg" />
            </div>
            <div
              className="content-main "
              dangerouslySetInnerHTML={{
                __html: dataDetailHandBook.contentHTML,
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);

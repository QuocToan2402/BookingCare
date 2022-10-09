import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListClinic.scss";
import { withRouter } from "react-router";
import HomeHeader from "../../Header/HomeHeader";
import {
  getAllClinic,
  getAllSpecialty,
} from "../../../../services/userService";

class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialties: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    console.log(res);
    if (res && res.errCode === 0) {
      console.log(res.data);
      this.setState({
        dataSpecialties: res.data ? res.data : [],
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  render() {
    let { dataSpecialties } = this.state;
    console.log(dataSpecialties);
    return (
      <>
        {" "}
        <div>
          <HomeHeader />
          <div className="container-list">
            <h2> Danh Sách Phòng khám </h2>
            {dataSpecialties &&
              dataSpecialties.map((item) => {
                return (
                  <div
                    className="item"
                    onClick={() => {
                      this.handleViewDetailSpecialty(item);
                    }}
                  >
                    <div className="item-img">
                      <img src={item.image} alt="da-lieu.jpg" />
                    </div>
                    <div className="item-name">{item.name}</div>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListClinic)
);

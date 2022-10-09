import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListHandbook.scss";
import { withRouter } from "react-router";
import HomeHeader from "../../Header/HomeHeader";
import { getAllHandBook } from "../../../../services/userService";
import { Card } from "antd";

const { Meta } = Card;
class ListHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbooks: [],
    };
  }
  async componentDidMount() {
    let res = await getAllHandBook();
    console.log(res);
    if (res && res.errCode === 0) {
      console.log(res.data);
      this.setState({
        dataHandbooks: res.data ? res.data : [],
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  };

  render() {
    let { dataHandbooks } = this.state;
    console.log(dataHandbooks);
    return (
      <>
        {" "}
        <HomeHeader />
        <div className="wapper-handbook">
          <div>
            <h2> Danh Sách Cẩm Nang </h2>
          </div>

          <div className="container-list-handbook">
            {dataHandbooks &&
              dataHandbooks.map((item) => {
                return (
                  <>
                    <Card
                      hoverable
                      style={{ width: 300, marginLeft: 30 }}
                      cover={<img alt="example" src={item.image} />}
                    >
                      <Meta
                        title={item.title}
                        description={`${item.contentMarkdown.substr(
                          0,
                          100
                        )} ....`}
                      />
                    </Card>
                  </>
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
  connect(mapStateToProps, mapDispatchToProps)(ListHandbook)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
// import "./ManagerSpecialtyList.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
  createNewClinic,
  deleteClinic,
  deleteHandbook,
  getAllHandBook,
} from "../../../services/userService";

import { Avatar, Table } from "antd";
import ModalEdit from "./ModalEdit";
import swal from "sweetalert";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
      isOpen: false,
      editItem: {},
    };
  }
  getAllHandBook = async () => {
    let res = await getAllHandBook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  };
  async componentDidMount() {
    let res = await getAllHandBook();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevState);
    // if (prevState.dataHandbook !== this.state.dataHandbook) {
    //   let res = await getAllHandBook();
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       dataHandbook: res.data ? res.data : [],
    //     });
    //   }
    // }
  }
  getAllHandBook = async () => {
    let res = await getAllHandBook();

    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  };
  handleDeleteUser = async (item) => {
    swal({
      title: "Xóa chuyên khoa?",
      text: "Bạn có chắc chắn xóa chuyên khoa này?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: "Xóa",
      },
    }).then(async (willDelete) => {
      console.log(willDelete);
      if (willDelete) {
        let res = await deleteHandbook(item.id);
        if (res && res.errCode === 0) {
          toast.success("Xóa thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.getAllHandBook();
        } else {
          toast.error("Xoá thất bại ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    });
  };
  handleEdit = (item) => {
    console.log("item", item);
    this.setState({
      ...this.state,
      isOpen: true,
      editItem: item,
    });
  };
  hiddenModel = () => {
    this.setState({
      ...this.state,
      isOpen: false,
    });
  };

  render() {
    let { dataHandbook } = this.state;
    console.log("dảa:", dataHandbook);
    return (
      <>
        <ModalEdit
          isOpen={this.state.isOpen}
          hiddenModel={this.hiddenModel}
          editItem={this.state.editItem}
          getAllHandBook={this.getAllHandBook}
        />
        <div className="table-clinic">
          <div className="header">Danh Sách Cẩm Nang </div>

          <table cellSpacing="0">
            <tr>
              <th>Ảnh </th>
              <th>Tiêu đề </th>
              <th></th>
            </tr>
            <tbody>
              {dataHandbook &&
                dataHandbook.length > 0 &&
                dataHandbook.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={item.image} alt="" />
                      </td>
                      <td>{item.title}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEdit(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandList);

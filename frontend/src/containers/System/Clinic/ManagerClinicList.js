import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import "./ManagerClinicList.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { createNewClinic, deleteClinic } from "../../../services/userService";
import { getAllClinic } from "../../../services/userService";
import { Avatar, Table } from "antd";
import ModalEdit from "./ModalEdit";
import swal from "sweetalert";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
      isOpen: false,
      editItem: {},
    };
  }
  // getAllClinic = async () => {
  //   let res = await getAllClinic();
  //   if (res && res.errCode === 0) {
  //     this.setState({
  //       dataClinics: res.data ? res.data : [],
  //     });
  //   }
  // };
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevState);
    if (prevState.dataClinics !== this.state.dataClinics) {
      //   let res = await getAllClinic();
      //   if (res && res.errCode === 0) {
      //     this.setState({
      //       dataClinics: res.data ? res.data : [],
      //     });
      //   }
    }
  }
  getAllClinic = async () => {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
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
        let res = await deleteClinic(item.id);
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
          this.getAllClinic();
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
    let { dataClinics } = this.state;
    console.log(dataClinics);
    return (
      <>
        <ModalEdit
          isOpen={this.state.isOpen}
          hiddenModel={this.hiddenModel}
          editItem={this.state.editItem}
          getAllClinic={this.getAllClinic}
        />
        <div className="table-clinic">
          <div className="header">Danh Sách Phòng Khám</div>

          <table cellSpacing="0">
            <tr>
              <th>Ảnh </th>
              <th>Tên phòng khám </th>
              <th>Địa chỉ phòng khám</th>

              <th width="230"></th>
            </tr>
            <tbody>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={item.image} alt="" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinicList);

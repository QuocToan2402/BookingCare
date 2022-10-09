import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import "./ManagerSpecialtyList.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
  createNewClinic,
  deleteClinic,
  deleteSpecial,
  getAllSpecialty,
} from "../../../services/userService";
import { getAllClinic } from "../../../services/userService";
import { Avatar, Table } from "antd";
import ModalEdit from "./ModalEdit";
import swal from "sweetalert";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialtyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialties: [],
      isOpen: false,
      editItem: {},
    };
  }
  getAllClinic = async () => {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialties: res.data ? res.data : [],
      });
    }
  };
  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialties: res.data ? res.data : [],
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  getAllSpecialty = async () => {
    let res = await getAllSpecialty();

    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialties: res.data ? res.data : [],
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
        let res = await deleteSpecial(item.id);
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
    let { dataSpecialties } = this.state;
    console.log("dảa:", dataSpecialties);
    return (
      <>
        <ModalEdit
          isOpen={this.state.isOpen}
          hiddenModel={this.hiddenModel}
          editItem={this.state.editItem}
          getAllSpecialty={this.getAllSpecialty}
        />
        <div className="table-clinic">
          <div className="header">Danh Sách Chuyên Khoa</div>

          <table cellSpacing="0">
            <tr>
              <th>Ảnh </th>
              <th>Tên phòng khám </th>
              <th></th>
            </tr>
            <tbody>
              {dataSpecialties &&
                dataSpecialties.length > 0 &&
                dataSpecialties.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={item.image} alt="" />
                      </td>
                      <td>{item.name}</td>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSpecialtyList);

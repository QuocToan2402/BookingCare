import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalEdit.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import {
  editClinicService,
  editSpecialtyService,
} from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",

      descriptionMarkdown: "",
      descriptionHTML: "",
      name: "",
      image: "",
      avatar: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.editItem !== this.props.editItem) {
      this.setState({
        id: this.props.editItem.id,

        descriptionMarkdown: this.props.editItem.descriptionMarkdown,
        descriptionHTML: this.props.editItem.descriptionHTML,
        name: this.props.editItem.name,
        image: this.props.editItem.image,
      });
    }
  }
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  toggle = () => {
    this.props.hiddenModel();
  };
  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log(base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        image: objectUrl,
        avatar: base64,
      });
    }
  };
  handleSaveClinic = async () => {
    let res = await editSpecialtyService(this.state);
    if (res && res.errCode === 0) {
      toast.success("Thay đổi thông tin thành công ");
      this.toggle();
      this.props.getAllSpecialty();
    } else {
      toast.error("Thay đổi thất bại ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  render() {
    console.log(this.props.editItem);

    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"modal-user-container"}
          size="xl"
        >
          <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Tên phòng khám </label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="inputAvatar">Ảnh đại diện </label>
                <div
                  className="preview-img-container"
                  onChange={(event) => {
                    this.handleOnChangeImg(event);
                  }}
                >
                  <input type="file" id="previewImg" hidden />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh
                    <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.image})`,
                    }}
                  ></div>
                </div>
              </div>
              {/* <div className="input-container max-w">
                <label>Địa chỉ phòng khám</label>
                <input
                  value={this.state.address}
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
              </div> */}
            </div>
            <MdEditor
              style={{ height: "600px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveClinic()}
            >
              Lưu Thay Đổi
            </Button>
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);

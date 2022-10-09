import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { createNewClinic } from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Thêm phòng khám thành công");
      this.setState({
        name: "",
        imageBase64: "",
        address: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Lỗi thêm phòng khám");
    }
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  render() {
    console.log("staete", this.state);
    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title">Quản lý chuyên khoa</div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group input-form">
              <label htmlFor="">Tên phòng khám</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(event) => this.handleOnchangeInput(event, "name")}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">Ảnh phòng khám </label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
            <div className="col-12 form-group" style={{ marginBottom: "20px" }}>
              <label htmlFor="">Địa chỉ phòng khám</label>
              <input
                type="text"
                className="form-control"
                value={this.state.address}
                onChange={(event) => this.handleOnchangeInput(event, "address")}
              />
            </div>
            <div className="col-12 form-group">
              <MdEditor
                style={{ height: "600px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12 form-group">
              <button
                onClick={() => this.handleSaveNewClinic()}
                className="btn-save-specialty"
              >
                Save
              </button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

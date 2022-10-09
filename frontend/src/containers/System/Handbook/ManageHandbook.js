import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import "./ManageHandbook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { createNewHandbook } from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      imageBase64: "",
      contentHTML: "",
      contentMarkdown: "",
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
      contentHTML: html,
      contentMarkdown: text,
    });
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
  handleSaveNewHandbook = async () => {
    let res = await createNewHandbook(this.state);
    if (res && res.errCode === 0) {
      toast.success("Thêm bài viết thành công ");
      this.setState({
        title: "",
        imageBase64: "",
        contentHTML: "",
        contentMarkdown: "",
      });
    } else {
      toast.error("Lỗi thêm chuyên khoa");
    }
  };
  render() {
    console.log("staete", this.state);
    return (
      <>
        <div className="manage-Handbook-container">
          <div className="ms-title">Quản lý chuyên khoa</div>
          <div className="add-new-Handbook row">
            <div className="col-6 form-group input-form">
              <label htmlFor="">Tên Bài Viết </label>
              <input
                type="text"
                className="form-control"
                value={this.state.title}
                onChange={(event) => this.handleOnchangeInput(event, "title")}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">Ảnh Chính Bài Viết </label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
            <div className="col-12 form-group">
              <MdEditor
                style={{ height: "600px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
            </div>
            <div className="col-12 form-group">
              <button
                onClick={() => this.handleSaveNewHandbook()}
                className="btn-save-Handbook"
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);

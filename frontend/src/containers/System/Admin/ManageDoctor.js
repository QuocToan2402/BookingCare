import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";
import { CRUD_ACTIONS } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: null,
      description: "",
      listDoctors: [],
      hasOldData: false,
      actions: CRUD_ACTIONS.CREATE,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],

      selectPrice: "",
      selectPayment: "",
      selectProvince: "",
      selectSpecialty: "",
      selectClinic: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }
  componentDidMount() {
    this.props.fetchALLDoctors();
    this.props.getRequiredDoctorInfor();
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (type === "USERS") {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          let label = `${item.lastName} ${item.firstName}`;
          object.label = label;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    if (type === "PRICE") {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          let label = `${item.valueVI}`;
          object.label = label;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    if (type === "PAYMENT" || type === "PROVINCE") {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          let label = `${item.valueVI}`;
          object.label = label;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    if (type === "SPECIALTY") {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.name;
        object.value = item.id;
        result.push(object);
      });
    }
    if (type === "CLINIC") {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.name;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      actions: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectPrice: this.state.selectPrice.value,
      selectPayment: this.state.selectPayment.value,
      selectProvince: this.state.selectProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectClinic && this.state.selectClinic.value
          ? this.state.selectClinic.value
          : "",
      specialtyId: this.state.selectSpecialty.value,
    });
  };
  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;
    let res = await getDetailInforDoctor(selectedOption.value);
    let resData = res.infor.data;
    // console.log(res.infor);
    if (
      res &&
      res.infor.errCode === 0 &&
      resData &&
      resData.Markdown &&
      resData.Markdown.contentHTML &&
      resData.Markdown.contentMarkdown &&
      resData.Markdown.description
    ) {
      let markdown = resData.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        clinicId = "",
        priceId = "",
        provinceId = "",
        selectPayment = "",
        selectPrice = "",
        selectProvince = "",
        specialtyId = "",
        selectSpecialty = "",
        selectClinic = "";

      if (resData.Doctor_Infor) {
        addressClinic = resData.Doctor_Infor.addressClinic;
        nameClinic = resData.Doctor_Infor.nameClinic;
        note = resData.Doctor_Infor.note;
        paymentId = resData.Doctor_Infor.paymentId;
        priceId = resData.Doctor_Infor.priceId;
        provinceId = resData.Doctor_Infor.provinceId;
        specialtyId = resData.Doctor_Infor.specialtyId;
        clinicId = resData.Doctor_Infor.clinicId;
        selectPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }
      this.setState({
        ...this.state,
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectPayment: selectPayment,
        selectPrice: selectPrice,
        selectProvince: selectProvince,
        selectSpecialty: selectSpecialty,
        selectClinic: selectClinic,
      });
    } else {
      this.setState({
        ...this.state,
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectPayment: "",
        selectClinic: "",
        selectProvince: "",
        selectPrice: "",
      });
    }
  };
  handleOnChangeDes = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    let handleEditorChange = ({ html, text }) => {
      this.setState({
        contentHTML: html,
        contentMarkdown: text,
      });
    };
    console.log("state", this.state);
    return (
      <div className="doctor-container">
        <div className="title">Tạo Thêm thông tin bác sĩ:</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label htmlFor="">Chọn bác sĩ: </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              placeholder={"Chọn bác sĩ "}
            />
          </div>
          <div className="content-right ">
            <label>Thông tin giới thiệu:</label>
            <textarea
              defaultValue={
                this.state.description ? this.state.description : ""
              }
              className="form-control"
              rows="4"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá:</label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={"Chọn giá "}
              name="selectPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn phương thức toán:</label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={"Chọn phương thức thanh toán"}
              name="selectPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn tỉnh thành:</label>
            <Select
              value={this.state.selectProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={"Chọn tỉnh thành"}
              name="selectProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>Tên phòng khám: </label>
            <input
              className="form-control"
              value={this.state.nameClinic}
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
            />
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám: </label>
            <input
              className="form-control"
              value={this.state.addressClinic}
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>Note:</label>
            <textarea
              className="form-control"
              value={this.state.note}
              onChange={(event) => this.handleOnChangeText(event, "note")}
            />
          </div>

          <div className="col-4 form-group">
            <label>Phòng Khám:</label>
            <Select
              value={this.state.selectClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listClinic}
              placeholder={"Chọn phòng khám bệnh "}
              name="selectClinic"
            />
          </div>
          <div className="col-4 form-group">
            <label>Chuyên khoa:</label>
            <Select
              value={this.state.selectSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listSpecialty}
              placeholder={"Chọn chuyên khoa"}
              name="selectSpecialty"
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          {" "}
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={this.state.contentMarkdown ? this.state.contentMarkdown : ""}
          />
        </div>
        <button
          className={
            this.state.hasOldData === true
              ? "edit-content-doctor"
              : "save-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {this.state.hasOldData === true ? "Lưu thông tin" : "Tạo thông tin "}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchALLDoctors: () => dispatch(actions.fetchALLDoctors()),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

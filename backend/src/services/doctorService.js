import res from "express/lib/response";
import db from "../models/index";
require("dotenv").config();
import moment from "moment";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
import _, { reject } from "lodash";
import emailService from "./emailService";
let getTopDoctorHomeService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEN", "valueVI"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEN", "valueVI"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (err) {
      reject(err);
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (err) {
      reject(err);
    }
  });
};

let getDetailDoctorByIDService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            { model: db.Allcode, as: "positionData", attributes: ["valueVI"] },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEN", "valueVI"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEN", "valueVI"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEN", "valueVI"],
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param !",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = parseInt(MAX_NUMBER_SCHEDULE);
            item.doctorId = data.doctorId;
            return item;
          });
        }

        let existing = await db.Schedule.findAll({
          where: {
            doctorId: data.doctorId,
            date: data.formatedDate,
          },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });
        console.log(existing);
        //conveer date
        // if (existing && existing.length > 0) {
        //   existing = existing.map((item) => {
        //     item.date = moment(new Date(item.date) + 1).format("MM/DD/YYYY");
        //     return item;
        //   });
        // }
        console.log(existing);
        //conveer date
        //compare differendt
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });
        console.log("toCreate", toCreate);
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getScheduleByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: " Missing required parameters ",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
let getExtraInforByIdService = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errCode: " Misssing required parameters",
        });
      } else {
        let data = await db.Doctor_Infor.findOne({
          where: {
            doctorId: idInput,
          },
          attributes: {
            exclude: ["id", "doctorId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEN", "valueVI"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) {
          data = [];
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
};
let getProfileDoctorByID = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

let checkRequiredFields = (inputData) => {
  let arrFields = [
    "doctorId",
    "contentHTML",
    "contentMarkdown",
    "actions",
    "selectPrice",
    "selectPayment",
    "selectProvince",
    "addressClinic",
    "note",
    "specialtyId",
    "nameClinic",
  ];
  let isValid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element,
  };
};
let saveDetailInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    console.log(inputData);
    try {
      let checkObj = checkRequiredFields(inputData);
      console.log("check", checkObj);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter ${checkObj.element}`,
        });
      } else {
        //upsert to markdown
        if (inputData.actions === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        } else if (inputData.actions === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            (doctorMarkdown.contentMarkdown = inputData.contentMarkdown),
              (doctorMarkdown.contentHTML = inputData.contentHTML),
              (doctorMarkdown.description = inputData.description),
              (doctorMarkdown.updatedAt = new Date());
            await doctorMarkdown.save();
          }
        }
        let doctorInfor = await db.Doctor_Infor.findOne({
          where: {
            doctorId: inputData.doctorId,
          },
          raw: false,
        });
        console.log("doctor", doctorInfor);
        if (doctorInfor) {
          doctorInfor.doctorId = inputData.doctorId;
          doctorInfor.priceId = inputData.selectPrice;
          doctorInfor.provinceId = inputData.selectProvince;
          doctorInfor.paymentId = inputData.selectPayment;
          doctorInfor.nameClinic = inputData.nameClinic;
          doctorInfor.addressClinic = inputData.addressClinic;
          doctorInfor.note = inputData.note;
          doctorInfor.specialtyId = inputData.specialtyId;
          doctorInfor.clinicId = inputData.clinicId;
          await doctorInfor.save();
        } else {
          //create
          await db.Doctor_Infor.create({
            doctorId: inputData.doctorId,
            priceId: inputData.selectPrice,
            provinceId: inputData.selectProvince,
            paymentId: inputData.selectPayment,
            nameClinic: inputData.nameClinic,
            addressClinic: inputData.addressClinic,
            note: inputData.note,
            specialtyId: inputData.specialtyId,
            clinicId: inputData.clinicId,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save infor doctor success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getListPatientForDoctorService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters ",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S2",
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: ["email", "firstName", "address", "gender"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEN", "valueVI"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueEN", "valueVI"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let sendRemedyService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      if (
        !data.email ||
        !data.doctorId ||
        !data.patientId ||
        !data.timeType ||
        !data.imgBase64
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        console.log("check in", data);
        let selectedBooking = await db.Booking.findOne({
          where: {
            doctorID: data.doctorId,
            patientID: data.patientId,
            timeType: data.timeType,
            statusID: "S2",
          },
          raw: false,
        });

        if (selectedBooking) {
          selectedBooking.statusID = "S3";
          await selectedBooking.save();
        }
        await emailService.sendAttachment(data);
        await resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
module.exports = {
  getTopDoctorHomeService: getTopDoctorHomeService,
  getAllDoctors: getAllDoctors,
  saveDetailInforDoctor: saveDetailInforDoctor,
  getDetailDoctorByIDService: getDetailDoctorByIDService,
  bulkCreateScheduleService: bulkCreateScheduleService,
  getScheduleByDateService: getScheduleByDateService,
  getExtraInforByIdService: getExtraInforByIdService,
  getProfileDoctorByID: getProfileDoctorByID,
  getListPatientForDoctorService: getListPatientForDoctorService,
  sendRemedyService: sendRemedyService,
};

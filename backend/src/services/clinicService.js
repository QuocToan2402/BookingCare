import { reject } from "lodash";
import db from "../models/index";
let createClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionMarkdown ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        console.log("daat:", data);
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          createdAt: new Date(),
          updateAt: new Date(),
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let getAllClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errMessage: "ok",
        errCode: 0,
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        console.log(data);
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        }
        resolve({
          errMessage: "ok",
          errCode: 0,
          data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let deleteClinicService = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findOne({
        where: { id: clinicId.id },
      });
      console.log(clinic);
      if (!clinic) {
        resolve({
          errCode: 2,
          errMessage: "The clinic isn't exist",
        });
      } else {
        await db.Clinic.destroy({
          where: { id: clinicId.id },
        });
        resolve({ errCode: 0, message: "The clinic is deleted" });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let updateClinicData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: false,
      });
      console.log(clinic);
      if (clinic) {
        await clinic.update({
          name: data.name,
          address: data.address,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          image: data.avatar === "" ? data.image : data.avatar,
        });
        resolve({
          errCode: 0,
          errMessage: "Update the user success!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found ",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createClinicService: createClinicService,
  getAllClinicService: getAllClinicService,
  getDetailClinicById: getDetailClinicById,
  deleteClinicService: deleteClinicService,
  updateClinicData: updateClinicData,
};

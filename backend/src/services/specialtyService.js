import { reject } from "lodash";
import db from "../models/index";
let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.imageBase64 || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        console.log("daat:", data);
        await db.Specialty.create({
          name: data.name,
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
let getAllSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errMessage: "Ok",
        errCode: 0,
        data,
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
let getDetailSpecialtyByIdService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({ errCode: 1, errMessage: "Missing parameter" });
      } else {
        var data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        console.log("data  specity", data);
        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputId,
              },
              attributes: ["doctorId", "provinceId"],
            });
            data.doctorSpecialty = doctorSpecialty;
            console.log("hello", doctorSpecialty);
          } else {
            let doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            });
            data.doctorSpecialty = doctorSpecialty;
            console.log("data", doctorSpecialty);
          }

          console.log("data", data);
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteSpecialtyService = (specialtyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let specialty = await db.Specialty.findOne({
        where: { id: specialtyId.id },
      });
      console.log(specialty);
      if (!specialty) {
        resolve({
          errCode: 2,
          errMessage: "The Specialty isn't exist",
        });
      } else {
        await db.Specialty.destroy({
          where: { id: specialtyId.id },
        });
        resolve({ errCode: 0, message: "The clinic is deleted" });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let updateSpecialtyData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let specialty = await db.Specialty.findOne({
        where: { id: data.id },
        raw: false,
      });
      console.log(specialty);
      if (specialty) {
        await specialty.update({
          name: data.name,
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
  createSpecialtyService: createSpecialtyService,
  getAllSpecialtyService: getAllSpecialtyService,
  getDetailSpecialtyByIdService: getDetailSpecialtyByIdService,
  updateSpecialtyData: updateSpecialtyData,
  deleteSpecialtyService: deleteSpecialtyService,
};

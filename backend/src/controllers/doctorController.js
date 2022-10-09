import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let doctors = await doctorService.getTopDoctorHomeService(+limit);

    return res.status(200).json(doctors);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ..." + err,
    });
  }
};
let getAllDoctor = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server ",
    });
  }
};
let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "Error from the server",
    });
  }
};
let getDetailDoctorByID = async (req, res) => {
  try {
    let infor = await doctorService.getDetailDoctorByIDService(req.query.id);
    return res.status(200).json({
      infor,
    });
  } catch (e) {
    console.log(e);
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorService.bulkCreateScheduleService(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      error: -1,
      errMessage: "Error from the server",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorService.getScheduleByDateService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server ",
    });
  }
};
let getExtraInforById = async (req, res) => {
  try {
    let infor = await doctorService.getExtraInforByIdService(
      req.query.doctorId
    );
    return res.status(200).json(infor);
  } catch (error) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server ",
    });
  }
};
let getProfileDoctorByID = async (req, res) => {
  try {
    let infor = await doctorService.getProfileDoctorByID(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getListPatientForDoctor = async (req, res) => {
  try {
    let infor = await doctorService.getListPatientForDoctorService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let sendRemedy = async (req, res) => {
  try {
    let infor = await doctorService.sendRemedyService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  postInforDoctor: postInforDoctor,
  getDetailDoctorByID: getDetailDoctorByID,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforById: getExtraInforById,
  getProfileDoctorByID: getProfileDoctorByID,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
};

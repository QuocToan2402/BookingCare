import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let data = await specialtyService.createSpecialtyService(req.body);
    console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let data = await specialtyService.getAllSpecialtyService();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ",
    });
  }
};
let getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await specialtyService.getDetailSpecialtyByIdService(
      req.query.id,
      req.query.location
    );

    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ",
    });
  }
};
let deleteSpecialty = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters ",
    });
  }

  let message = await specialtyService.deleteSpecialtyService(req.body);
  return res.status(200).json(message);
};
let handleEditSpecialty = async (req, res) => {
  let data = req.body;
  let message = await specialtyService.updateSpecialtyData(data);
  return res.status(200).json(message);
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  deleteSpecialty: deleteSpecialty,
  handleEditSpecialty: handleEditSpecialty,
};

import handbookService from "../services/handbookService";

let createHandbook = async (req, res) => {
  try {
    let data = await handbookService.createHandbookService(req.body);
    console.log("dsad", data);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};
let getAllHandbook = async (req, res) => {
  try {
    let data = await handbookService.getAllHandbookService();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ",
    });
  }
};
let getDetailHandbookById = async (req, res) => {
  try {
    let infor = await handbookService.getDetailHandbookByIdService(
      req.query.id
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
let deleteHandbook = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters ",
    });
  }

  let message = await handbookService.deleteHandbookService(req.body);
  return res.status(200).json(message);
};
let handleEditHandbook = async (req, res) => {
  let data = req.body;
  console.log(data);
  let message = await handbookService.updateHandbookData(data);
  return res.status(200).json(message);
};
module.exports = {
  createHandbook: createHandbook,
  getAllHandbook: getAllHandbook,
  handleEditHandbook: handleEditHandbook,
  deleteHandbook: deleteHandbook,
  getDetailHandbookById: getDetailHandbookById,
};

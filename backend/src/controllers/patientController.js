import patientService from "../services/patientServices";
let postBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postBookAppointmentService(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: " Error from the server 3",
    });
  }
};
let postVerifyBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postVerifyBookAppointmentService(req.body);

    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};

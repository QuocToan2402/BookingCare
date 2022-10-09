import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  console.log("check data from service", data);
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  // error api without found user
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const editUserService = (inputData) => {
  // error api without found user
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctor`);
};
const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctor`, data);
};
const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
const getAllSpecialty = () => {
  return axios.get("/api/get-specialty");
};
const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
const getAllClinic = () => {
  return axios.get("/api/get-clinic");
};
const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};
const deleteClinic = (clinicId) => {
  return axios.delete("/api/delete-clinic", { data: { id: clinicId } });
};

const editClinicService = (inputData) => {
  // error api without found user
  return axios.put("/api/edit-clinic", inputData);
};
const deleteSpecial = (specialtyId) => {
  return axios.delete("/api/delete-specialty", { data: { id: specialtyId } });
};

const editSpecialtyService = (inputData) => {
  // error api without found user
  return axios.put("/api/edit-specialty", inputData);
};
//handbook
const createNewHandbook = (data) => {
  return axios.post("/api/create-new-handbook", data);
};
const getAllHandBook = () => {
  return axios.get("/api/get-handbook");
};
const deleteHandbook = (handbookId) => {
  return axios.delete("/api/delete-handbook", { data: { id: handbookId } });
};
const editHandbookService = (inputData) => {
  // error api without found user
  return axios.put("/api/edit-handbook", inputData);
};
const getAllDetailHandBookById = (data) => {
  return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctor,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  deleteClinic,
  editClinicService,
  deleteSpecial,
  editSpecialtyService,
  createNewHandbook,
  getAllHandBook,
  deleteHandbook,
  editHandbookService,
  getAllDetailHandBookById,
};

import { toast } from "react-toastify";
import {
  createNewUserService,
  getAllCodeService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctor,
  saveDetailDoctorService,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";
import actionTypes from "./actionTypes";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "FETCH_GENDER_START" });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (err) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (err) {
      dispatch(fetchPositionFailed());
    }
  };
};
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);

      if (res && res.errCode === 0) {
        toast.success("Tạo người dùng thành công !!!");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
    }
  };
};
export const saveUserSuccess = () => ({
  type: "CREATE_USER_SUCCESS",
});
export const saveUserFailed = () => ({
  type: "CREATE_USER_FAILED",
});

export const editAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(userId);

      if (res && res.errCode === 0) {
        toast.success("Thay đổi thông tin người dùng thành công !!!");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Thay đổi dùng không thành công !!!");
        dispatch(editAUserSuccess());
      }
    } catch (err) {
      dispatch(editAUserUserFailed());
    }
  };
};
export const editAUserSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  users: data,
});
export const editAUserUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchALLDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctor();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};
export const saveDetailDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo thông tin bác sĩ thành công !!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        toast.error("Tạo thông tin bác sĩ không  thành công !!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
        });
      }
    } catch (err) {
      toast.error("Tạo thông tin bác sĩ không thành công !!!");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchALLScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (err) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      let res1 = await getTopDoctorHomeService("");
      // console.log("doctor", res1);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (err) {
      dispatch(fetchAllUserFailed());
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: "FETCH_ALL_USERS_SUCCESS",
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: "FETCH_ALL_USERS_FAILED",
});

export const deleteNewUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);

      if (res && res.errCode === 0) {
        toast.success("Xóa người dùng thành công !!!");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Xóa người dùng không thành công !!!");
        dispatch(saveUserFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
    }
  };
};
export const deleteUserSuccess = (data) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  users: data,
});
export const deleteAllUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const fetchAllClinicStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic();

      if (res && res.errCode === 0) {
        dispatch(fetchClinicSuccess(res.data));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (err) {
      dispatch(fetchClinicFailed());
    }
  };
};
export const fetchClinicSuccess = (data) => ({
  type: "FETCH_CLINIC_SUCCESS",
  users: data,
});
export const fetchClinicFailed = () => ({
  type: "FETCH_CLINIC_FAILED",
});
export const deleteClinic = (clinicId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinic(clinicId);

      if (res && res.errCode === 0) {
        toast.success("Xóa thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Xoá thất bại ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(saveUserFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
    }
  };
};

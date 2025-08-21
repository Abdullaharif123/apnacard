import axiosReq from "../../utils/axios/index.js";
import {
  GET_ADMINS,
  GET_USERS_BY_ADMIN,
  UPDATE_USER_DETAILS_ADMIN,
  BASE_URL,
  DELETE_USER_ADMIN,
  ADD_NEW_USER_ADMIN,
  GET_ORGANISATION_NAME_ADMIN,
  GET_USER_BY_USER_ID_ADMIN,
  CHANGE_PASSWORD_ADMIN,
  GET_ADMIN_DASHBOARD,
  GET_CATEGORIES_ADMIN,
  ADD_NEW_CATEGORY_ADMIN,
  UPDATE_CATEGORY_ADMIN,
  DELETE_CATEGORY_ADMIN,
  GET_SERVICES_ADMIN,
  ADD_NEW_SERVICE_ADMIN,
  UPDATE_SERVICE_ADMIN,
  DELETE_SERVICE_ADMIN,
  USER_PRESCRIPTION_ADMIN,
  GET_PRESCRIPTIONS,
  UPDATE_PRESCRIPTION_ADMIN,
  CREATE_PRESCRIPTIONS,
  GET_MEDICINES_ADMIN,
  MEDICINE_ADMIN,
  UPDATE_ORG_INVOICE_TEMPLATE,
  GET_ORGANISATION_BY_ID_ADMIN,
} from "../../utils/axios/endpoint.js";

export const getAllAdmins = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(`${GET_ADMINS}${searchTerm}&page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersByAdmin = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(
      `${GET_USERS_BY_ADMIN}${searchTerm}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleUserDelete = async (id) => {
  try {
    const response = await axiosReq.delete(
      BASE_URL + `${DELETE_USER_ADMIN}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserCardType = async (id, data) => {
  try {
    const res = await axiosReq.put(
      BASE_URL + `${UPDATE_USER_DETAILS_ADMIN}/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllMedicinesByAdmin = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(
      `${GET_MEDICINES_ADMIN}${searchTerm}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetailsByAdmin = async (userId, updatedDetails) => {
  try {
    const res = await axiosReq.put(
      `${UPDATE_USER_DETAILS_ADMIN}/${userId}`,
      updatedDetails
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewUser = async (userData) => {
  try {
    const res = await axiosReq.post(`${ADD_NEW_USER_ADMIN}`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrganisationName = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(`${GET_ORGANISATION_NAME_ADMIN}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetailsById = async (id) => {
  try {
    const res = await axiosReq.get(`${GET_USER_BY_USER_ID_ADMIN}/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMedicines = async () => {
  try {
    const res = await axiosReq.get(`${MEDICINE_ADMIN}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handlePasswordChange = async (userId, password) => {
  try {
    const response = await axiosReq.post(
      BASE_URL + `${CHANGE_PASSWORD_ADMIN}/${userId}`,
      {
        password: password,
        updatedOn: new Date(),
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handlePrescriptionChange = async (editor) => {
  try {
    const response = await axiosReq.post(
      BASE_URL + `${UPDATE_PRESCRIPTION_ADMIN}/${editor.id}`,
      {
        Desc: editor.content,
        updatedOn: new Date(),
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardDetails = async () => {
  try {
    const res = await axiosReq.get(`${GET_ADMIN_DASHBOARD}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(
      `${GET_CATEGORIES_ADMIN}${searchTerm}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPrescription = async (userId, desc) => {
  try {
    const res = await axiosReq.post(`${USER_PRESCRIPTION_ADMIN}/${userId}`, {
      desc,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllServices = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(
      `${GET_SERVICES_ADMIN}${searchTerm}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleCategoryDelete = async (id) => {
  try {
    const response = await axiosReq.delete(
      BASE_URL + `${DELETE_CATEGORY_ADMIN}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleCategoryUpdate = async (cat) => {
  try {
    const response = await axiosReq.put(
      BASE_URL + `${UPDATE_CATEGORY_ADMIN}/${cat.id}`,
      {
        categoryName: cat.name,
        isActive: cat.isActive,
        imageUrl: cat.imageUrl,
        updatedOn: new Date(),
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleCategoryCreate = async (categoryName, imageUrl) => {
  try {
    const response = await axiosReq.post(BASE_URL + ADD_NEW_CATEGORY_ADMIN, {
      categoryName,
      imageUrl,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleServiceCreate = async (name, price) => {
  try {
    const response = await axiosReq.post(BASE_URL + ADD_NEW_SERVICE_ADMIN, {
      name,
      price,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleServiceUpdate = async (ser) => {
  try {
    const response = await axiosReq.put(
      BASE_URL + `${UPDATE_SERVICE_ADMIN}/${ser.id}`,
      {
        name: ser.name,
        price: ser.price,
        isActive: ser.isActive,
        updatedOn: new Date(),
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleServiceDelete = async (id) => {
  try {
    const response = await axiosReq.delete(
      BASE_URL + `${DELETE_SERVICE_ADMIN}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPrescriptions = async (userId, month, pageno) => {
  try {
    const res = await axiosReq.post(`${GET_PRESCRIPTIONS}`, {
      userId,
      pageno,
      month,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPrescription = async (prescriptionData, userId) => {
  try {
    const res = await axiosReq.post(
      `${CREATE_PRESCRIPTIONS}/${userId}`,
      prescriptionData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrganizationInvoiceTemplate = async (data) => {
  try {
    const response = await axiosReq.put(
      BASE_URL + `${UPDATE_ORG_INVOICE_TEMPLATE}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating invoice template:", error);
    throw error;
  }
};

export const getOrganisationById = async (id) => {
  try {
    const res = await axiosReq.get(`${GET_ORGANISATION_BY_ID_ADMIN}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

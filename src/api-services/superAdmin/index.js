import axiosReq from "../../utils/axios/index.js";
import {
  BASE_URL,
  ADD_NEW_ORGANISATION,
  UPDATE_ORGANISATION,
  DELETE_ORGANISATION,
  UPDATE_ORGANISATION_CATEGORY,
  GET_ORGANISATION_BY_ID,
  UPDATE_ORGANISATION_CARD,
  GET_ORGANISATION_USERS_BY_ID,
  UPDATE_CATEGORY,
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY,
  CHANGE_PASSWORD,
  DELETE_USER,
  GET_ORGANISATION_NAMES,
  GET_ORGANISATIONS,
  GET_ORGANISATIONS_W_DETAILS,
  GET_CATEGORIES,
  GET_ACTIVE_CATEGORIES,
  GET_USERS_SUPER_ADMIN,
  GET_DASHBOARD,
  GET_MEDICINES,
  ADD_NEW_MEDICINE,
  UPDATE_MEDICINE,
  DELETE_MEDICINE,
  GET_ORGANISATION_CATEGORIES,
  GET_ORGANISATION_PERCENTAGES,
  SAVE_ORGANISATION_PERCENTAGES,
} from "../../utils/axios/endpoint.js";

export const handleOrganisationCreate = async (organisationName) => {
  try {
    const response = await axiosReq.post(BASE_URL + ADD_NEW_ORGANISATION, {
      organisationName,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleCategoryCreate = async (
  categoryName,
  imageUrl,
  isGeneric
) => {
  try {
    const response = await axiosReq.post(BASE_URL + ADD_NEW_CATEGORY, {
      categoryName,
      imageUrl,
      isGeneric,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleMedicineCreate = async (medicineName) => {
  try {
    const response = await axiosReq.post(BASE_URL + ADD_NEW_MEDICINE, {
      medicineName,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleOrganisationUpdate = async (org) => {
  try {
    const response = await axiosReq.put(
      BASE_URL + `${UPDATE_ORGANISATION}/${org.id}`,
      {
        organisationName: org.name,
        isActive: org.isActive,
        updatedOn: new Date(),
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleCategoryUpdate = async (cat) => {
  try {
    const response = await axiosReq.put(
      BASE_URL + `${UPDATE_CATEGORY}/${cat.id}`,
      {
        categoryName: cat.name,
        isActive: cat.isActive,
        imageUrl: cat.imageUrl,
        updatedOn: new Date(),
        isGeneric: cat.isGeneric,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleMedicineUpdate = async (medic) => {
  try {
    const response = await axiosReq.put(
      BASE_URL + `${UPDATE_MEDICINE}/${medic.id}`,
      {
        medicineName: medic.name,
        isActive: medic.isActive,
        updatedOn: new Date(),
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handlePasswordChange = async (userId, password) => {
  try {
    const response = await axiosReq.post(
      BASE_URL + `${CHANGE_PASSWORD}/${userId}`,
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

export const handleOrganisationDelete = async (id) => {
  try {
    const response = await axiosReq.delete(
      BASE_URL + `${DELETE_ORGANISATION}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleCategoryDelete = async (id) => {
  try {
    const response = await axiosReq.delete(
      BASE_URL + `${DELETE_CATEGORY}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleMedicineDelete = async (id) => {
  try {
    const response = await axiosReq.delete(
      BASE_URL + `${DELETE_MEDICINE}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleUserDelete = async (id) => {
  try {
    const response = await axiosReq.delete(BASE_URL + `${DELETE_USER}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleOrganisationCategoryUpdate = async (
  id,
  categoryId,
  isEnabled
) => {
  try {
    const response = await axiosReq.put(
      BASE_URL + `${UPDATE_ORGANISATION_CATEGORY}/${id}`,
      {
        categoryId: categoryId,
        isEnabled: isEnabled,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleOrganisationCardUpdate = async (id, cardRange) => {
  try {
    const response = await axiosReq.put(
      BASE_URL + `${UPDATE_ORGANISATION_CARD}/${id}`,
      {
        cardRange: cardRange,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrganisationById = async (id) => {
  try {
    const res = await axiosReq.get(`${GET_ORGANISATION_BY_ID}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrganisationNames = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(`${GET_ORGANISATION_NAMES}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersByOrganisationById = async (id) => {
  try {
    const res = await axiosReq.get(`${GET_ORGANISATION_USERS_BY_ID}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(
      `${GET_USERS_SUPER_ADMIN}${searchTerm}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrganisations = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(
      `${GET_ORGANISATIONS}${searchTerm}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrganisationsWithDetails = async () => {
  try {
    const res = await axiosReq.get(`${GET_ORGANISATIONS_W_DETAILS}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(
      `${GET_CATEGORIES}${searchTerm}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMedicines = async (searchTerm, page) => {
  try {
    const res = await axiosReq.get(
      `${GET_MEDICINES}${searchTerm}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardDetails = async () => {
  try {
    const res = await axiosReq.get(`${GET_DASHBOARD}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getActiveCategories = async () => {
  try {
    const res = await axiosReq.get(`${GET_ACTIVE_CATEGORIES}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getOrganisationCategories = async (organisationId) => {
  try {
    const res = await axiosReq.get(
      `${GET_ORGANISATION_CATEGORIES}/${organisationId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getOrganisationPercentages = async (organisationId) => {
  try {
    const res = await axiosReq.get(
      `${GET_ORGANISATION_PERCENTAGES}/${organisationId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// SAVE percentages
export const saveOrganisationPercentages = async (organisationId, percentages) => {
  try {
    const res = await axiosReq.post(
      SAVE_ORGANISATION_PERCENTAGES,
      { organisationId, percentages }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getOrganisationPercentages as getOrgCategoryPercentages,
  saveOrganisationPercentages as saveOrgCategoryPercentages,
};
import axios from "axios";
import axiosReq, { scanCardRequest } from "../../utils/axios/index.js";
import {
  UPDATE_USER_DETAILS,
  GET_USER,
  SCAN_USER,
  SIGNUP_SCAN_USER,
  BASE_URL,
  LOGIN,
  LOGOUT,
  GET_USER_BY_USER_ID_SUPER_ADMIN,
  UPDATE_PASSWORD,
  FORGOT_PASSWORD,
  ADD_NEW_USER,
  DELETE_FILE_FROM_USER,
  UPDATE_USER_DETAILS_SUPER_ADMIN,
  GET_ORG_CATEGORY,
  GET_FILES,
  CREATE_FILES,
  GET_USER_PRESCRIPTIONS,
  GET_USER_ALL_PRESCRIPTIONS,
  GET_USER_PRESCRIPTIONS_BY_PRESID,
  GET_SIGNED_URL_TO_UPLOAD_ON_S3,
  GET_ALL_USERS_FOR_ADMIN,
  GET_ALL_ORGANISATIONS,
  GET_CATEGORIES_BY_ORG,
  GET_CATEGORY_PERCENTAGE,
  GET_UNUSED_PROMO_CODE,
  SAVE_USER_PROMO_CODE,
} from "../../utils/axios/endpoint.js";
import AWS from "aws-sdk";

export const updateUserDetails = async (userId, updatedDetails) => {
  try {
    const res = await axiosReq.put(
      `${UPDATE_USER_DETAILS}/${userId}`,
      updatedDetails
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserFiles = async (
  userId,
  filePath,
  fileName,
  categoryId
) => {
  try {
    const res = await axiosReq.post(`${CREATE_FILES}`, {
      userId,
      filePath,
      fileName,
      categoryId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetailsSuperAdmin = async (userId, updatedDetails) => {
  try {
    const res = await axiosReq.put(
      `${UPDATE_USER_DETAILS_SUPER_ADMIN}/${userId}`,
      updatedDetails
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleUserLogin = async (credentials) => {
  try {
    const response = await axios.post(
      BASE_URL + LOGIN,
      {
        identifier: credentials.identifier,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("error.response: ", error.response);
      return error.response.data;
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
  }
};

export const handleUserLogout = async () => {
  try {
    const res = await axiosReq.post(`${LOGOUT}`, null);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async (cardNumber) => {
  try {
    const res = await axiosReq.get(`${GET_USER}/${cardNumber}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserFiles = async (userId, catId, fileName, month, pageno) => {
  try {
    const res = await axiosReq.post(`${GET_FILES}`, {
      userId,
      catId,
      fileName,
      pageno,
      month,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserCategories = async (id) => {
  try {
    const res = await axiosReq.get(`${GET_ORG_CATEGORY}/${id}`);
    
    return res.data;

  } catch (error) {
    console.log(error);
  }
};

export const getUserPrescriptions = async (month, pageno) => {
  try {
    const res = await axiosReq.post(`${GET_USER_PRESCRIPTIONS}`, {
      pageno,
      month,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const scanCard = async (cardNumber) => {
  try {
    const res = await scanCardRequest.get(`${SCAN_USER}/${cardNumber}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupScanCard = async (signupData) => {
  try {
    const res = await scanCardRequest.put(`${SIGNUP_SCAN_USER}`, signupData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetailsById = async (id) => {
  try {
    const res = await axiosReq.get(`${GET_USER_BY_USER_ID_SUPER_ADMIN}/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewUser = async (userData) => {
  try {
    const res = await axiosReq.post(`${ADD_NEW_USER}`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (userId, filePath, categoryId) => {
  try {
    const res = await axiosReq.delete(`${DELETE_FILE_FROM_USER}`, {
      params: {
        userId,
        filePath,
        categoryId,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (
  email,
  oldPassword,
  newPassword,
  confirmNewPassword
) => {
  try {
    const res = await axiosReq.post(`${UPDATE_PASSWORD}`, {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgetPassword = async (cnic, mobileNo) => {
  try {
    const res = await axiosReq.post(`${FORGOT_PASSWORD}`, {
      cnic: cnic,
      mobileNo: mobileNo,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const uploadtos3 = async (file, folderName) => {
//   try {
//     // Configure S3 instance
//     const s3 = new AWS.S3({
//       accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//       region: process.env.REACT_APP_AWS_REGION,
//     });

//     const uploadParams = {
//       Bucket: "apnacardbucket",
//       Key: `${folderName}/${file.name}`,
//       Body: file,
//       ContentType: file.type,
//     };

//     const uploadResult = await s3.upload(uploadParams).promise();
//     const s3Url = uploadResult.Location;

//     return s3Url;
//   } catch (error) {
//     console.log("Error uploading profile picture:", error);
//     throw error; // Handle error in the calling function
//   }
// };

export const uploadtos3 = async (file, folderName) => {
  try {
    // Step 1: Request the signed URL from your backend
    const filename = `${folderName}/${file.name}`;
    const filetype = file.type;

    const response = await axiosReq.get(
      `${GET_SIGNED_URL_TO_UPLOAD_ON_S3}?filename=${encodeURIComponent(
        filename
      )}&filetype=${encodeURIComponent(filetype)}`
    );

    const signedUrl = response?.data?.payload?.data?.signedUrl;

    // Step 2: Upload file to S3 using the signed URL
    const uploadResponse = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": filetype,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file to S3");
    }

    // The URL where the file is accessible (depends on your bucket settings)
    // Usually the signed URL without the query params or you can reconstruct
    const s3Url = signedUrl.split("?")[0];

    return s3Url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

// export const prescriptionuploadtos3 = async (file, folderName) => {
//   try {
//     // Configure S3 instance
//     const s3 = new AWS.S3({
//       accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//       region: process.env.REACT_APP_AWS_REGION,
//     });

//     const uploadParams = {
//       Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
//       Key: `${folderName}/${file.name}`,
//       Body: file,
//       ContentType: file.type,
//     };

//     const uploadResult = await s3.upload(uploadParams).promise();
//     const s3Url = uploadResult.Location;

//     return {
//       name: file.name,
//       uploadedOn: new Date(),
//       s3Url,
//     };
//   } catch (error) {
//     console.log("Error uploading profile picture:", error);
//     throw error; // Handle error in the calling function
//   }
// };

export const prescriptionuploadtos3 = async (file, folderName) => {
  try {
    const filename = `${folderName}/${file.name}`;
    const filetype = file.type;

    // Step 1: Get signed URL from your backend
    const response = await axiosReq.get(
      `${GET_SIGNED_URL_TO_UPLOAD_ON_S3}?filename=${encodeURIComponent(
        filename
      )}&filetype=${encodeURIComponent(filetype)}`
    );

    // const signedUrl = response?.data?.data?.payload?.data?.signedUrl;
    const signedUrl = response?.data?.payload?.data?.signedUrl;

    if (!signedUrl) {
      throw new Error("Failed to get signed URL");
    }

    // Step 2: Upload file to S3 using the signed URL
    const uploadRes = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error("Failed to upload file to S3");
    }

    // Step 3: Derive final S3 URL (remove query params from signed URL)
    const s3Url = signedUrl.split("?")[0];

    return {
      name: file.name,
      uploadedOn: new Date(),
      s3Url,
    };
  } catch (error) {
    console.error("Error uploading prescription:", error);
    throw error;
  }
};

export const getUserAllPrescriptions = async (userId, filters) => {
  try {
    const res = await axiosReq.get(`${GET_USER_ALL_PRESCRIPTIONS}/${userId}`, {
      filters,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPrescriptionById = async (presId) => {
  try {
    const res = await axiosReq.get(
      `${GET_USER_PRESCRIPTIONS_BY_PRESID}/${presId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersForAdmin = async () => {
  try {
    const res = await axiosReq.get(GET_ALL_USERS_FOR_ADMIN);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// 2. Get all organisations
export const getAllOrganisations = async () => {
  try {
    const res = await axiosReq.get(GET_ALL_ORGANISATIONS);
    return res.data;
  } catch (error) {
    console.error("Error fetching organisations:", error);
    throw error;
  }
};

// 3. Get categories by organisation
export const getCategoriesByOrganisation = async (orgId) => {
  try {
    const res = await axiosReq.get(GET_CATEGORIES_BY_ORG(orgId));
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// 4. Get percentage for category
export const getCategoryPercentage = async (orgId, catId) => {
  try {
    const res = await axiosReq.get(GET_CATEGORY_PERCENTAGE(orgId, catId));
    return res.data;
  } catch (error) {
    console.error("Error fetching percentage:", error);
    throw error;
  }
};

// 5. Get unused promo code
export const getUnusedPromoCode = async (orgId) => {
  try {
    const res = await axiosReq.get(GET_UNUSED_PROMO_CODE(orgId));
    return res.data;
  } catch (error) {
    console.error("Error fetching promo code:", error);
    throw error;
  }
};

// 6. Save user promo code assignment
export const saveUserPromoCode = async (payload) => {
  try {
    const res = await axiosReq.post(SAVE_USER_PROMO_CODE, payload);
    return res.data;
  } catch (error) {
    console.error("Error saving promo code:", error);
    throw error;
  }
};

 export const BASE_URL = "https://apna-card.onrender.com/";
//export const BASE_URL = "http://161.97.76.102:5000/";

//user
export const LOGIN = "api/users/login";
export const LOGOUT = "api/users/logout";
export const GET_USER = "api/users/card";
export const SCAN_USER = "api/users/scan-card";
export const GET_FILES = "api/users/get-files";
export const CREATE_FILES = "api/users/create-files";
export const UPDATE_PASSWORD = "api/users/update-password";
export const FORGOT_PASSWORD = "api/users/forgot-password";
export const DELETE_FILE_FROM_USER = "api/users/delete-file";
export const SIGNUP_SCAN_USER = "api/users/scan-card/signup";
export const GET_ORG_CATEGORY = "api/users/get-category-byorg";
export const UPDATE_USER_DETAILS = "api/users/update-user-details";
export const GET_USER_PRESCRIPTIONS = "api/users/get-prescriptions";
export const GET_USER_ALL_PRESCRIPTIONS = "api/users/getAllPrescriptions";
export const GET_USER_PRESCRIPTIONS_BY_PRESID = "api/users/prescriptions";
export const GET_SIGNED_URL_TO_UPLOAD_ON_S3 = "api/users/get-signed-url";
export const GET_ALL_USERS_FOR_ADMIN = "api/user/users";
export const GET_ALL_ORGANISATIONS = "api/organisation";
export const GET_CATEGORIES_BY_ORG = (orgId) => `api/organisation/${orgId}/categories`;
export const GET_CATEGORY_PERCENTAGE = (orgId, catId) =>
  `api/organisation/${orgId}/categories/${catId}/percentage`;
export const GET_UNUSED_PROMO_CODE = (orgId) =>
  `api/organisation/${orgId}/promo-codes/unused`;
export const SAVE_USER_PROMO_CODE = "api/user-promo-codes";
//admin
export const GET_USERS_BY_ADMIN = "api/admin/users?searchTerm=";
export const DELETE_USER_ADMIN = "api/admin/delete-user";
export const MEDICINE_ADMIN = "api/admin/medicines";
export const UPDATE_USER_DETAILS_ADMIN = "api/admin/update-users-details";
export const ADD_NEW_USER_ADMIN = "api/admin/create-user";
export const GET_ORGANISATION_NAME_ADMIN = "api/admin/organisation-name";
export const GET_USER_BY_USER_ID_ADMIN = "api/admin/users";
export const CHANGE_PASSWORD_ADMIN = "api/admin/change-password";
export const GET_ADMIN_DASHBOARD = "api/admin/get-dashboard";
export const GET_CATEGORIES_ADMIN = "api/admin/categories?searchTerm=";
export const DELETE_CATEGORY_ADMIN = "api/admin/delete-category";
export const UPDATE_CATEGORY_ADMIN = "api/admin/update-category";
export const ADD_NEW_CATEGORY_ADMIN = "api/admin/create-category";
export const GET_SERVICES_ADMIN = "api/admin/get-all-services?searchTerm=";
export const ADD_NEW_SERVICE_ADMIN = "api/admin/create-service";
export const UPDATE_SERVICE_ADMIN = "api/admin/update-service";
export const DELETE_SERVICE_ADMIN = "api/admin/delete-service";
export const USER_PRESCRIPTION_ADMIN = "api/admin/user-prescription";
export const GET_PRESCRIPTIONS = "api/admin/get-prescriptions";
export const UPDATE_PRESCRIPTION_ADMIN = "api/admin/update-prescription";
export const CREATE_PRESCRIPTIONS = "api/admin/prescriptions";
export const GET_MEDICINES_ADMIN = "api/admin/medicines?searchTerm=";
export const UPDATE_ORG_INVOICE_TEMPLATE =
  "api/admin/update-organization-invoice-template";
export const GET_ORGANISATION_BY_ID_ADMIN = "api/admin/get-organisation";

//superadmin
export const DELETE_USER = "api/super-admin/delete-user";
export const ADD_NEW_USER = "api/super-admin/create-user";
export const GET_DASHBOARD = "api/super-admin/get-dashboard";
export const GET_ADMINS = "api/super-admin/admins?searchTerm=";
export const DELETE_CATEGORY = "api/super-admin/delete-category";
export const UPDATE_CATEGORY = "api/super-admin/update-category";
export const CHANGE_PASSWORD = "api/super-admin/change-password";
export const ADD_NEW_CATEGORY = "api/super-admin/create-category";
export const GET_CATEGORIES = "api/super-admin/categories?searchTerm=";
export const GET_USERS_SUPER_ADMIN = "api/super-admin/users?searchTerm=";
export const GET_USER_BY_USER_ID_SUPER_ADMIN = "api/super-admin/users";
export const GET_ACTIVE_CATEGORIES = "api/super-admin/active-categories";
export const UPDATE_ORGANISATION = "api/super-admin/update-organisation";
export const GET_ORGANISATION_BY_ID = "api/super-admin/get-organisation";
export const DELETE_ORGANISATION = "api/super-admin/delete-organisation";
export const ADD_NEW_ORGANISATION = "api/super-admin/create-organisation";
export const GET_ORGANISATION_NAMES = "api/super-admin/organisation-names";
export const GET_ORGANISATIONS = "api/super-admin/organisations?searchTerm=";
export const ADD_NEW_MEDICINE = "api/super-admin/create-medicine";
export const GET_MEDICINES = "api/super-admin/medicines?searchTerm=";
export const DELETE_MEDICINE = "api/super-admin/delete-medicine";
export const UPDATE_MEDICINE = "api/super-admin/update-medicine";
export const UPDATE_USER_DETAILS_SUPER_ADMIN =
  "api/super-admin/update-users-details";
export const GET_ORGANISATIONS_W_DETAILS =
  "api/super-admin/organisation-details";
export const GET_ORGANISATION_USERS_BY_ID =
  "api/super-admin/get-users-by-organization";
export const UPDATE_ORGANISATION_CATEGORY =
  "api/super-admin/update-organisation-category";
export const UPDATE_ORGANISATION_CARD =
  "api/super-admin/update-organisation-cards";
export const GET_ORGANISATION_CATEGORIES = "/api/super-admin/organisation-categories";
export const GET_ORGANISATION_PERCENTAGES = "/api/super-admin/get-org-category-percentages";
export const SAVE_ORGANISATION_PERCENTAGES = "/api/super-admin/create-org-category-percentage";



export const apiRequestStatuses = {
  SUCCESS: "SUCCESS",
  ACCEPTED: "ACCEPTED",
  FAILURE: "FAILURE",
  BAD_REQUEST: "BAD_REQUEST",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

export const userRoles = {
  USER: "User",
  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
};

export const cardType = {
  SINGLECARD: "Single Card",
  FAMILYCARD: "Family Card",
};

export const sideBarPages = {
  DASHBOARD: "Dashboard",
  USERS: "Users",
  ORGANISATIONS: "Organisations",
  CATEGORIES: "Categories",
  SERVICES: "Services",
  WALLET: "Wallet",
  PROFILE: "Profile",
  CARDS: "Cards",
  ADMINS: "Admins",
  MEDICINES: "Medicines",
  INVOICETEMPLATE: "Invoice Template",
};

export const bucketFolderNames = {
  profilePictures: "ProfilePictures",
  prescriptions: "Prescriptions",
  labReports: "LabReports",
};

export const monthsSelect = [
  { value: "", label: "Select Month" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const genderSelect = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const cardTypeSelect = [
  { value: "Single Card", label: "Single Card" },
  { value: "Family Card", label: "Family Card" },
];

export const roleSelect = [
  { value: "User", label: "User" },
  { value: "Admin", label: "Admin" },
];

export const descriptionOptions = [
  "صبح ناشتے سے پہلے",
  "صبح ناشتے کے بعد",
  "دوپہر کھانے سے پہلے",
  "دوپہر کھانے کے بعد",
  "رات کھانے سے پہلے",
  "رات کھانے کے بعد",
  "خالی پیٹ",
  "سونے سے پہلے",
];

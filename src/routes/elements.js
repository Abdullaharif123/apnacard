import {
  LoginPage,
  DetailsPage,
  UserDashboard,
  UpdatePasswordPage,
  ForgotPasswordPage,
  ReadOnlyDetailsPage,
  // SignUpPage,
  Files,
  Prescription,
} from "../pages/user";
import {
  Categories as SAdminCategories,
  Admins as SAdmins,
  Organisations as SAdminOrganisations,
  Users as SAdminUsers,
  Dashboard as SAdminDashboard,
  Profile as SAdminProfile,
  Medicines as SAdminMedicine,
} from "../pages/superAdmin";
import {
  Dashboard as AdminDashboard,
  Users as AdminUsers,
  Categories as AdminCategories,
  Services as AdminServices,
  Profile as AdminProfile,
  ScanCardPage as AdminScanCardPage,
  ScanCardPageByUser as AdminScanCardPageByUser,
} from "../pages/admin";
import {
  Files as AdminFiles,
  Prescription as AdminPrescription,
  // Lost as GenericError,
} from "../pages/common";

import WalletDetailsPage from "../pages/user/walletDetailsPage.js";
import UpdateInvoiceTemplate from "../components/admin/UpdateInvoiceTemplate.js";
import LandingPage from "../components/website/landingPage/LandingPage.jsx";
import Frame from "../components/website/AboutUsPage/indexx.jsx";
import ServicesPage from "../components/website/SolutionsPage/indexSolutionPage.jsx";
import UniqueFeaturesPage from "../components/website/UniqueFeaturesPage/IndexUniqueFeatures.jsx";
import ProductsPage from "../components/website/ProductPage/indexProductPage.jsx";
import ContactUsPage from "../components/website/ContactUsPage/indexContactUs.jsx";
import AddPartnerPage from "../pages/superAdmin/AddPartnerPage";
// import ListingPartners from "../pages/superAdmin/ListingPartners";
import GeneratePromoCodes from "../pages/superAdmin/GeneratePromoCodes";
// import AssignCards from "../pages/superAdmin/AssignCards";
import UserPromoCode from "../pages/user/userpromocode";
import PromoCodeWrapper from "../components/PromoCodeWrapper";
import SuperAdminPromoCodeWrapper from "../components/SuperAdminPromoCodeWrapper";

// Inside your <Routes>:




// import PrescriptionComponent from "../pages/admin/prescription.js";

export const publicRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/about-us",
    element: <Frame />,
  },
  {
    path: "/acs-services",
    element: <ServicesPage />,
  },
  {
    path: "/acs-unqiue-features",
    element: <UniqueFeaturesPage />,
  },
  {
    path: "/acs-products-showcase",
    element: <ProductsPage />,
  },
  {
    path: "/acs-contact-us",
    element: <ContactUsPage />,
  },

  // {
  //   path: "/prescritionByAdmin",
  //   element: <PrescriptionComponent />,
  // },
  // {
  //   path: "/lost",
  //   element: <GenericError />,
  // },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forget-password",
    element: <ForgotPasswordPage />,
  },
  //Deprecated Links
  // {
  //   path: "/marketplace",
  //   element: <Marketplace />,
  // },
  // {
  //   path: "/brand-ambassador",
  //   element: <BrandAmbassador />,
  // },
  // {
  //   path: "/order-medicines",
  //   element: <OrderMedicine />,
  // },
  {
    path: "/scanCard/:cardNumber",
    element: <ReadOnlyDetailsPage />,
  },
  //User cannot Signup by themselves.
  // {
  //   path: "/signup",
  //   element: <SignUpPage />,
  // },
];

export const privateRoutes = [
  //If he logged in and want to see the website
  {
    path: "/users",
    element: <LandingPage />,
  },
];

export const userRoutes = [
  {
    path: "/details",
    element: <DetailsPage />,
  },
  // {
  //   path: "/super-admin/listing-partners",
  //   element: <ListingPartners />,
  // },
  // {
  //   path: "/super-admin/partners/:partnerId/generate-promo",
  //   element: <GeneratePromoCodes />,
  // },
  // {
  //   path: "/super-admin/assign-cards",
  //   element: <AssignCards />,
  // },


  {
    path: "/files",
    element: <Files />,
  },
  {
    path: "/add-partner",
    element: <AddPartnerPage />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/update-password",
    element: <UpdatePasswordPage />,
  },
  {
    path: "/prescription",
    element: <Prescription />,
  },
  {
    path: "/walletDetails",
    element: <WalletDetailsPage />,
  },
  {
    path: "/assign-promo-code",
    element: <PromoCodeWrapper />, // ✅ Use wrapper
  },

];

export const superAdminRoutes = [
  {
    path: "/dashboard",
    element: <SAdminDashboard />,
  },
  {
    path: "/users",
    element: <SAdminUsers />,
  },
  {
    path: "/organisations",
    element: <SAdminOrganisations />,
  },
  {
    path: "/categories",
    element: <SAdminCategories />,
  },
  {
    path: "/admins",
    element: <SAdmins />,
  },
  {
    path: "/profile",
    element: <SAdminProfile />,
  },
  // {
  //   path: "/scanCard/:cardNumber",
  //   element: <AdminScanCardPage />,
  // },
  {
    path: "/files",
    element: <AdminFiles />,
  },
  {
    path: "/prescription",
    element: <AdminPrescription />,
  },
  {
    path: "/medicines",
    element: <SAdminMedicine />,
  },
  {
    path: "/super-admin/generate-promo-codes",
    element: <GeneratePromoCodes />,
  },
  {
    path: "/assign-promo-code",
    element: <SuperAdminPromoCodeWrapper />,
  },
  {
    path: "/assign-promo-code",
    element: <SuperAdminPromoCodeWrapper />,
  },

];

export const adminRoutes = [
  {
    path: "/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/users",
    element: <AdminUsers />,
  },
  {
    path: "/categories",
    element: <AdminCategories />,
  },
  {
    path: "/services",
    element: <AdminServices />,
  },
  {
    path: "/profile",
    element: <AdminProfile />,
  },
  {
    path: "/scanCard/:cardNumber",
    element: <AdminScanCardPage />,
  },
  {
    path: "/scanCard/:cardNumber/:userId",
    element: <AdminScanCardPageByUser />,
  },
  {
    path: "/files",
    element: <AdminFiles />,
  },
  {
    path: "/prescription",
    element: <AdminPrescription />,
  },
  {
    path: "/walletDetails",
    element: <WalletDetailsPage />,
  },
  {
    path: "/invoiceTemplate",
    element: <UpdateInvoiceTemplate />,
  },
];

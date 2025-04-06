import FooterOne from "../../layouts/footers/FooterOne.js";
import HeaderOne from "../../layouts/headers/HeaderOne.js";
import Breadcrumb from "../common/Breadcrumb.js";
import Preloader from "../common/Preloader.js";
import ScrollTop from "../common/ScrollTop.js";
import ScrollToTop from "../common/ScrollToTop.js";
import AdminLoginForm from "./adminLogin.js";

import './login.css'
 

export default function AdminLoginIndex() {
  return (
    <>
      <Preloader />
    <HeaderOne />
    <Breadcrumb title="Login" subtitle="Login" />
    <AdminLoginForm />
    <FooterOne />
    <ScrollToTop />
    <ScrollTop />

    </>
  )
}

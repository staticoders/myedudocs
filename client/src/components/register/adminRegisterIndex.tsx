import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import Preloader from "../common/Preloader";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import AdminRegister from "./adminRegister";

 
export default function AdminRegisterIndex() {
  return (
    <>
    <Preloader />
    <HeaderOne />
    <Breadcrumb title="Register" subtitle="Register" />
    <AdminRegister />
    <FooterOne />
    <ScrollToTop />
    <ScrollTop />

    </>
  )
}
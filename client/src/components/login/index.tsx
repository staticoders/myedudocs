import FooterOne from "../../layouts/footers/FooterOne.js";
import HeaderOne from "../../layouts/headers/HeaderOne.js";
import Breadcrumb from "../common/Breadcrumb.js";
import Preloader from "../common/Preloader.js";
import ScrollTop from "../common/ScrollTop.js";
import ScrollToTop from "../common/ScrollToTop.js";
import LoginForm from "./LoginForm.js";
import './login.css'
 

export default function Login() {
  return (
    <>
      <Preloader />
    <HeaderOne />
    <Breadcrumb title="Login" subtitle="Login" />
    <LoginForm />
    <FooterOne />
    <ScrollToTop />
    <ScrollTop />

    </>
  )
}

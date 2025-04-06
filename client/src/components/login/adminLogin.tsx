import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { message } from 'antd';
import axios from "axios";



export default function AdminLoginForm() {
  const Navigate = useNavigate();
  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const aemail = formData.get("aemail") as string;
    const apassword = formData.get("apassword") as string;

    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/admin/adminLogin", { aemail, apassword });

      message.success("Logged in successfully");

      // ✅ Store user data securely (excluding password)
      localStorage.setItem("edudocs", JSON.stringify({
        id: data.admin.id,
        aname: data.admin.aname,
        aemail: data.admin.aemail,
        token: data.admin.token
      }));

      Navigate("/"); // ✅ Correct way to navigate
    } catch (error: any) {
      message.error(error.response?.data?.message || "Login Failed");
      console.error(error);
    }
  };                  
  // Prevent users from logging in if they are already logged in
  useEffect(() => {
    if (localStorage.getItem('edudocs')) {
      message.warning("You are already logged in ! Welcome To MyEdudocs", 5)
      Navigate('/')
    }
  }, [Navigate])

  return (
    <>
      <section className="login_register section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-xs-12 wow fadeIn">
              <div className="login">
                <h4 className="login_register_title">Admin Log in:</h4>
                <form onSubmit={SubmitHandler}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Admin Email</label>
                    <input type="email" id="contact-email" placeholder="Enter Your Registerd Email" className="form-control" name="aemail" required={true} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-pwd">Admin Password</label>
                    <input type="password" placeholder="Enter Password" id="contact-pwd" className="form-control" name="apassword" required={true} />
                  </div>



                  <div className="form-group col-lg-12">
                    <button className="bg_btn bt" type="submit" name="submit">login</button>
                  </div>
                </form>
                {/* <p>Dont have an account? <Link to="/admin-register">Register Now</Link></p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

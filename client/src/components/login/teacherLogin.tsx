import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { message } from 'antd';
import axios from "axios";



export default function LoginForm() {
  const Navigate = useNavigate();
  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const temail = formData.get("temail") as string;
    const tpassword = formData.get("tpassword") as string;
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/teachers/teacherLogin", {temail,tpassword});

      message.success("Login Successful");

      // Store only necessary teacher data
      localStorage.setItem('edudocs', JSON.stringify({
          id: data.teacher.id,
          tname: data.teacher.tname,
          temail: data.teacher.temail,
          tphn: data.teacher.tphn,
          tspecialization: data.teacher.tspecialization,
          texp: data.teacher.texp,
          token: data.teacher.token
      }));

      Navigate("/"); // Redirect to teacher dashboard
  } catch (error: any) {
      message.error(error.response?.data?.message || "Login Failed");
      console.error(error);
  }
    // try {
    //   const { data } = await axios.post('http://localhost:8080/api/v1/teachers/teacherLogin', { temail, tpassword });

    //   message.success("Logged in successfully");

    //   // ✅ Store user data in localStorage without password
    //   localStorage.setItem('edudocs', JSON.stringify({ ...data.teacher, password: "" }));

    //   Navigate('/'); // ✅ Correct way to navigate
    //   console.log(data);
      
    // } catch (error) {
    //   message.error("Error Encountered !! Login Unsuccessful");
    //   console.error(error);
    // }
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
                <h4 className="login_register_title">Already a Teacher? Sign in:</h4>
                <form onSubmit={SubmitHandler}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Email</label>
                    <input type="email" id="contact-email" placeholder="Enter Your Registerd Email" className="form-control" name="temail" required={true} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-pwd">Password</label>
                    <input type="password" placeholder="Enter Password" id="contact-pwd" className="form-control" name="tpassword" required={true} />
                  </div>

                  <div className="form-check mb-4">
                    <input id="rpaword" className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="rpaword" >
                      Remember Password
                    </label>
                  </div>

                  <div className="form-group col-lg-12">
                    <button className="bg_btn bt" type="submit" name="submit">login</button>
                  </div>
                </form>
                <p>Dont have an account? <Link to="/teacher-register">Register Now</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

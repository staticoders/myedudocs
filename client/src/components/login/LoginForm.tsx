import { Link, useNavigate } from "react-router-dom";
import  { useEffect } from 'react';
import { message } from 'antd';
import axios from "axios";
import url from "../../url"


export default function LoginForm() {
  const Navigate = useNavigate();

  interface LoginFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
  }

  interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {
    target: EventTarget & {
      elements: LoginFormElements;
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
  }

  interface UserData {
    id: string;
    email: string;
    name: string;
    token: string;
  }

  interface LoginResponse {
    user: UserData;
  }

  const SubmitHandler = async (e: LoginFormEvent): Promise<void> => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const { data } = await axios.post<LoginResponse>(`${url}/users/login`, { email, password });

        message.success("Logged in successfully");

        // Store only necessary user data
        localStorage.setItem('edudocs', JSON.stringify({ 
            id: data.user.id, 
            email: data.user.email, 
            name: data.user.name,
            token: data.user.token // Store token for authentication
        }));

        Navigate('/'); // Redirect to home
        console.log(data);
    } catch (error) {
        message.error("Error Encountered! Login Unsuccessful");
        console.log(error);
    }
  };



  // Prevent users from logging in if they are already logged in
  useEffect(() => {
    if (localStorage.getItem('edudocs')) {
      message.warning("You are already logged in ! Welcome To MyEdudocs",5)
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
                <h4 className="login_register_title">Already a student? Sign in:</h4>
                <form onSubmit={SubmitHandler}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Email</label>
                    <input type="email" id="contact-email" placeholder="Enter Your Registerd Email" className="form-control" name="email" required={true} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-pwd">Password</label>
                    <input type="password" placeholder="Enter Password" id="contact-pwd" className="form-control" name="password" required={true}/>
                  </div>

                  <div className="form-check mb-4">
                    <input id="rpaword" className="form-check-input" type="checkbox"/>
                    <label className="form-check-label" htmlFor="rpaword" >
                      Remember Password
                    </label>
                  </div>

                  <div className="form-group col-lg-12">
                    <button className="bg_btn bt" type="submit" name="submit">login</button>
                  </div>
                </form>
                <p>Dont have an account? <Link to="/student-register">Register Now</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

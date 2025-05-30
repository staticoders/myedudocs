import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message } from 'antd';

import axios from "axios";
import url from "../../url";

export default function RegisterForm() {
  const navigate = useNavigate();
  

  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Get form data correctly
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phn = formData.get("phn") as string;
    const password = formData.get("password") as string;
  
    try {
      await axios.post(`${url}/users/register`, { name, email, phn, password });
      message.success("Registration Successful");
  
      // Correcting Navigate usage
      navigate('/student-login');
    } catch (error) {
      message.error("Error Encountered !! Registration Unsuccessful");
      console.log(error);
    }
  };

  // Prevent users from registering if they are already logged in

  useEffect(()=>{
    if(localStorage.getItem('edudocs')){
      message.warning("You are already logged in ! Welcome To MyEdudocs",5)
      navigate('/')
    }
},[navigate])

return (
  <>
    <section className="login_register section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-xs-12 wow fadeIn">
            <div className="register">
              <h4 className="login_register_title">Create a new account for student :</h4>
              <form onSubmit={SubmitHandler}>
                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input type="text" placeholder="Enter Full Name" id="fullname" className=" form-control" name="name"  required={true}/>
                </div>
                <div className="form-group">
                  <label htmlFor="email-address">Email Address</label>
                  <input type="email" placeholder="Enter Email Address" id="email-address" className="form-control " name="email" required={true} />
                </div>
                <div className="form-group">
                  <label htmlFor="phn">Phone</label>
                  <input type="number" placeholder="Enter Phone number" id="phn" className="form-control" name="phn" required={true}/>
                </div>
                <div className="form-group">
                  <label htmlFor="cpwd">Password</label>
                  <input type="password" placeholder="Enter Password" id="cpwd" className="form-control" name="password" max={10} min={10} required={true}/>
                </div>
                <div className="form-group col-lg-12">
                  <button className="bg_btn bt" type="submit" name="submit">Signup now</button>
                </div>
              </form>
              <p>Already have an account? <Link to="/student-login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)
}

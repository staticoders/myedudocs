import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message } from 'antd';

import axios from "axios";

export default function TeacherRegistration() {
  const Navigate = useNavigate();
  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Get form data correctly
    const formData = new FormData(e.currentTarget);
    const tname = formData.get("tname") as string;
    const temail = formData.get("temail") as string;
    const tphn = formData.get("tphn") as string;
    const tpassword = formData.get("tpassword") as string;
    const tspecialization = formData.get("tspecialization") as string;
    const texp = formData.get("texp") as string;
  
    try {
      await axios.post('http://localhost:8080/api/v1/teachers/teacherRegister', { tname, temail, tphn, tpassword,tspecialization,texp });
      message.success("Registration Successful");
  
      // Correcting Navigate usage
      Navigate('/');
    } catch (error) {
      message.error("Error Encountered !! Registration Unsuccessful");
      console.log(error);
    }
  };

  // Prevent users from registering if they are already logged in

  useEffect(()=>{
    if(localStorage.getItem('edudocs')){
      message.warning("You are already logged in ! Welcome To MyEdudocs",5)
      Navigate('/')
    }
},[Navigate])

return (
  <>
    <section className="login_register section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-xs-12 wow fadeIn">
            <div className="register">
              <h4 className="login_register_title">Create a new account For Teachers:</h4>
              <form onSubmit={SubmitHandler}>
                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input type="text" placeholder="Enter Full Name" id="fullname" className=" form-control" name="tname"  required={true} />
                </div>
                <div className="form-group">
                  <label htmlFor="email-address">Email Address</label>
                  <input type="email" placeholder="Enter Email Address" id="email-address" className="form-control " name="temail" required={true}  />
                </div>
                <div className="form-group">
                  <label htmlFor="phn">Phone</label>
                  <input type="number" placeholder="Enter Phone number" id="phn" className="form-control" name="tphn" required={true} />
                </div>
                <div className="form-group">
                  <label htmlFor="cpwd">Password</label>
                  <input type="password" placeholder="Enter Password" id="cpwd" className="form-control" name="tpassword" max={10} min={10} required={true} />
                </div>

                <div className="form-group">
                <label htmlFor="tspecialization">Your Specialization</label>
                <select className="form-select" aria-label="Default select example" name="tspecialization">
                    <option value="Maths">Maths</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="Apptitude">Apptitude</option>
                    <option value="GS">General Science</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Political">Political Science</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Statistics">Statistics</option>
                    <option value="chemistry">chemistry</option>
                    <option value="Physics">Physics</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer">Computer</option>
                    <option value="Bengali">Bengali</option>
         
                    </select>
                </div>

                <div className="form-group">
                  <label htmlFor="texp">Your Total Experience(in Years)</label>
                  <input type="number" placeholder="Enter Your Total Experience" id="texp" className="form-control" name="texp" required={true} />
                </div>

                <div className="form-group col-lg-12">
                  <button className="bg_btn bt" type="submit" name="submit">Signup now</button>
                </div>
              </form>
              <p>Already have an account? <Link to="/teacher-login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)
}

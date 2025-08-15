import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import url from "../../url"; // Assuming you use a central base URL

export default function TeacherRegistration() {
  const Navigate = useNavigate();
  const [teacherProfile, setTeacherProfile] = useState<File | null>(null);

  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Add profile image manually from state
    if (teacherProfile) {
      formData.set("tprofile", teacherProfile);
    }

    try {
      await axios.post(`${url}/teachers/teacherRegister`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Teacher Registered Successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      message.error("Error Encountered !!");
      console.error(error);
    }
  };

  // Prevent registration if already logged in
  useEffect(() => {
    if (localStorage.getItem("edudocs")) {
      message.warning("You are already logged in! Welcome to MyEdudocs", 5);
      Navigate("/");
    }
  }, [Navigate]);

  return (
    <>
      <section className="login_register section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-xs-12 wow fadeIn">
              <div className="register">
                <h4 className="login_register_title">Create a new account For Teachers:</h4>
                <form onSubmit={SubmitHandler} encType="multipart/form-data">
                  <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      id="fullname"
                      className="form-control"
                      name="tname"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-address">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      id="email-address"
                      className="form-control"
                      name="temail"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phn">Phone</label>
                    <input
                      type="number"
                      placeholder="Enter Phone number"
                      id="phn"
                      className="form-control"
                      name="tphn"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpwd">Password</label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      id="cpwd"
                      className="form-control"
                      name="tpassword"
                      minLength={6}
                      maxLength={15}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tspecialization">Your Specialization</label>
                    <select className="form-select" name="tspecialization">
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
                      <option value="chemistry">Chemistry</option>
                      <option value="Physics">Physics</option>
                      <option value="Biology">Biology</option>
                      <option value="Computer">Computer</option>
                      <option value="Bengali">Bengali</option>
                    </select>
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="texp">Your Total Experience (in Years)</label>
                    <input
                      type="number"
                      placeholder="Enter Your Total Experience"
                      id="texp"
                      className="form-control"
                      name="texp"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tcity">Your City</label>
                    <select className="form-select" name="tcity" required>
                      <option value="">Select City</option>
                      {[
                        "Ahmedabad", "Amritsar", "Bangalore", "Bhopal", "Bhubaneswar",
                        "Chandigarh", "Chennai", "Coimbatore", "Dehradun", "Delhi",
                        "Ernakulam", "Faridabad", "Ghaziabad", "Goa", "Gurgaon", "Guwahati",
                        "Hyderabad", "Indore", "Jaipur", "Jammu", "Jamshedpur", "Kanpur",
                        "Kochi", "Kolkata", "Lucknow", "Ludhiana", "Madurai", "Mangalore",
                        "Mumbai", "Mysore", "Nagpur", "Nashik", "Noida", "Patna",
                        "Puducherry", "Pune", "Raipur", "Rajkot", "Ranchi", "Shillong",
                        "Shimla", "Srinagar", "Surat", "Thane", "Thiruvananthapuram",
                        "Udaipur", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam"
                      ].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <br />

                  <div className="form-group">
                    <label htmlFor="tprofile">Profile Image</label>
                    <input
                      type="file"
                      id="tprofile"
                      className="form-control"
                      name="tprofile"
                      accept="image/*"
                      required
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setTeacherProfile(e.target.files[0]);
                        }
                      }}
                    />
                    {teacherProfile && (
                      <img
                        src={URL.createObjectURL(teacherProfile)}
                        alt="Preview"
                        style={{ maxHeight: "150px", marginTop: "10px", borderRadius: "10px" }}
                      />
                    )}
                  </div>
                  <br />

                  <div className="form-group">
                    <label htmlFor="tdesc">Tell Me Something About You</label>
                    <textarea
                      id="tdesc"
                      className="form-control"
                      name="tdesc"
                      rows={5}
                      required
                    />
                  </div>
                  <br />

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
  );
}

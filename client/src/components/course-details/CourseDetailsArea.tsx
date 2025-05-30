import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import uri from "../../url";

export default function CourseDetailsArea() {








  const [coursesDetails, setCoursesDetails] = useState({});
  const [videoDetails, setVideoDetails] = useState('');
  const { id } = useParams();

  const url = `${uri}/course/courseDetails/${id}`;

  // Function to extract the video ID and start time part from the YouTube URL
  const extractVideoLinkPart = (url) => {
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&t=(\d+)s/;
    const match = url.match(regex);

    if (match) {
      return `${match[1]}?start=${match[2]}`;
    }
    return ''; // Return empty string if no match is found
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCoursesDetails(data.course);
        // Assuming `cvdolink` contains the YouTube URL
        if (data.course && data.course.cvdolink) {
          const extractedLink = extractVideoLinkPart(data.course.cvdolink);
          setVideoDetails(extractedLink); // Set the extracted video part
        }
      })
      .catch((error) => {
        console.error("Error fetching Courses:", error);
      });
  }, [url]); // Fetch when `url` or `id` changes

console.log(videoDetails);
  return (
    <>
      <section className="courses-details section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 wow fadeIn">
<ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoDetails}`}
          width="100%"
          height="500px"
          controls={true}
        />
              <div className="scourse_meta">
                <div className="smeta">
                  <img src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=826" alt="author" />
                  <div className="smeta_text">
                    <span>Instructor:</span>
                    <p>
                      <a href="#">{coursesDetails.cinstructor}</a>
                    </p>
                  </div>
                </div>

                <div className="smeta">
                  <span>Category:</span>
                  <p>
                  {coursesDetails.c_category}
                  </p>
                </div>

                <div className="smeta">
                  <span>Last Update:</span>
                  <p>
                  {coursesDetails.updatedAt}
                  </p>

                </div>

                <div className="smeta">
                  <span>Review:</span>
                  <p>
                    <a href="#">
                      <span className="rev_icons">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                      </span>
                      <span className="rev_content">
                        (5.00)
                      </span>
                    </a>
                  </p>
                </div>
              </div>

              <h2 className="scourse-title">{coursesDetails.cname}</h2>

              <nav className="cd_tab">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-overview-tab" data-bs-toggle="tab" data-bs-target="#nav-overview" type="button" role="tab" aria-controls="nav-overview" aria-selected="true">Overview</button>
                  {/* <button className="nav-link" id="nav-curriculum-tab" data-bs-toggle="tab" data-bs-target="#nav-curriculum" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Curriculum</button> */}
                  <button className="nav-link" id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">Review</button>
                  <button className="nav-link" id="nav-instructor-tab" data-bs-toggle="tab" data-bs-target="#nav-instructor" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">Instructor</button>
                </div>
              </nav>

              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-overview" role="tabpanel" aria-labelledby="nav-overview-tab" tabIndex={0}>
                  <p>
                  {coursesDetails.cinstructor}
                  </p>

                  <div className="row pt-2">
                    <div className="col-xl-6 align-self-center">
                      <img src="assets/img/courses/cd2.jpg" className="pb-3" alt="image" />
                    </div>

                    <div className="col-xl-6 align-self-center">
                      <h3>Why you want to learn PHP ?</h3>
                      <ul>
                        <li>Neque sodales ut etiam sit auctor</li>
                        <li>Tristique nulla aliquet enim urna.</li>
                        <li>Nam libero justo laoreet sit amet..</li>
                        <li>Tempus imperdiet nulla malesuada .</li>
                        <li>Perspiciatis unde omnis iste natus.</li>
                        <li>consequat duis aute reprehenderit .</li>
                        <li>Suspendisse ultrices gravida Risus. </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* <div className="tab-pane fade" id="nav-curriculum" role="tabpanel" aria-labelledby="nav-curriculum-tab" tabIndex={0}>
                  <div className="cd_curriculum">
                    <h3>Starting Beginners Level Course</h3>
                    <ul>
                      <li><span><a href="#"><i className='bx bx-play-circle'></i> Introduction of Editing</a></span> <span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>10 Minutes</span></li>
                      <li><span><a href="#"><i className='bx bx-play-circle'></i> Overview of Editing</a></span> <span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>8 Minutes</span></li>
                      <li><span><a href="#"><i className='bx bx-folder'></i> Basic Editing Technology</a></span> <span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>7 Minutes</span></li>
                      <li>
                        <span>
                          <i className='bx bx-bulb'></i> Quiz</span>
                        <span className="cd_cur_right"><a href="#" className="cbtn">Preview</a> 5 Minutes</span></li>
                      <li><span><a href="#"><i className='bx bx-play-circle'></i> Introduction of Editing</a></span> <span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>10 Minutes</span></li>
                      <li><span><a href="#"><i className='bx bx-bulb'></i> Overview of Editing</a></span> <span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>30 Minutes</span></li>
                    </ul>
                  </div>
                </div> */}

                <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab" tabIndex={0}>
                  <div className="cd_rating">
                    <h3>Student's Reviews</h3>
                    <div className="cd_rating_top">
                      <div className="cdr_rate_summary">
                        <h1>5.0</h1>
                        <span className="cdr_rating">
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                        </span>

                        <p>Total 3 Rating</p>
                      </div>

                      <div className="cdr_rate_number">
                        <ul>
                          <li>
                            <span className="cdr_rate_star">5</span>
                            <span className="cdr_rate_value">
                              <span className="rating_width" style={{ width: "100%" }}></span>
                              <span className="cdr_rate_count">3 Rating</span>
                            </span>

                          </li>

                          <li>
                            <span className="cdr_rate_star">4</span>
                            <span className="cdr_rate_value">
                              <span className="rating_width" style={{ width: "80%" }}></span>
                              <span className="cdr_rate_count">2 Rating</span>
                            </span>
                          </li>

                          <li>
                            <span className="cdr_rate_star">3</span>
                            <span className="cdr_rate_value">
                              <span className="rating_width" style={{ width: "60%" }}></span>
                              <span className="cdr_rate_count">1 Rating</span>
                            </span>
                          </li>

                          <li>
                            <span className="cdr_rate_star">2</span>
                            <span className="cdr_rate_value">
                              <span className="rating_width" style={{ width: "40%" }}></span>
                              <span className="cdr_rate_count">2 Rating</span>
                            </span>
                          </li>

                          <li>
                            <span className="cdr_rate_star">1</span>
                            <span className="cdr_rate_value">
                              <span className="rating_width" style={{ width: "20%" }}></span>
                              <span className="cdr_rate_count">2 Rating</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="rating_list">
                      <div className="rating_item">
                        <div className="rating_item_avatar">
                          <img src="assets/img/review/1.jpg" alt="avatar" />
                          <div className="rava_conent">
                            <h3>Robert Max</h3>
                            <p>Outstanding Course </p>
                            <span className="rating_item_ricon">
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                            </span>
                          </div>
                        </div>

                        <div className="rating_item_content">
                          <p>
                            " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it "
                          </p>
                        </div>
                      </div>

                      <div className="rating_item">
                        <div className="rating_item_avatar">
                          <img src="assets/img/review/2.jpg" alt="avatar" />
                          <div className="rava_conent">
                            <h3>Robert Max</h3>
                            <p>Outstanding Course </p>
                            <span className="rating_item_ricon">
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                            </span>
                          </div>
                        </div>

                        <div className="rating_item_content">
                          <p>
                            " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it "
                          </p>
                        </div>
                      </div>

                      <div className="rating_item">
                        <div className="rating_item_avatar">
                          <img src="assets/img/review/3.jpg" alt="avatar" />
                          <div className="rava_conent">
                            <h3>Robert Max</h3>
                            <p>Outstanding Course </p>
                            <span className="rating_item_ricon">
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                            </span>
                          </div>
                        </div>

                        <div className="rating_item_content">
                          <p>
                            " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it "
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="cdr_review_form">
                      <h3>Add a Review</h3>
                      <div className="review_form_ricon">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                      </div>

                      <form action="#" className="rating_form">
                        <textarea name="rating_form" placeholder="Write a Your Rating">
                        </textarea><br />
                        <button type="submit" className="bg_btn bt">
                          Submit Review
                        </button>
                      </form>
                    </div>

                  </div>
                </div>

                <div className="tab-pane fade" id="nav-instructor" role="tabpanel" aria-labelledby="nav-instructor-tab" tabIndex={0}>
                  <div className="cd_instructor">
                    <div className="cdin_image">
                      <img src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=826" alt="" />
                      <ul>
                        <li>
                          <a href="#"><i className="bx bxl-facebook"></i></a>
                        </li>
                        <li>
                          <a href="#"><i className="bx bxl-linkedin"></i></a>
                        </li>
                        <li>
                          <a href="#"><i className="bx bxl-youtube"></i></a>
                        </li>
                      </ul>
                    </div>

                    <div className="cdin_content">
                      <h4><a href="#">{coursesDetails.cinstructor}</a></h4>
                      <span>Web Designer</span>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                      </p>
                      <div className="cdin_meta">
                        <div className="cdin_meta_item"><i className="bx bx-user"></i> 25+ Students</div>
                        <div className="cdin_meta_item"><i className='bx bxs-folder-open'></i> 32 Courses</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-xl-4 wow fadeIn">
              <div className="course-sidebar">
                <h3>Course Features</h3>
                <ul className="scourse_list">
                  <li>
                    <span className="cside-label">
                      <i className="fa-regular fa-clock"></i> Duration
                    </span>

                    <span className="cside-value">
                      {coursesDetails.cdur} Hours
                    </span>
                  </li>

                  <li>
                    <span className="cside-label">
                      <i className="fa-regular fa-file"></i> Lesson
                    </span>

                    <span className="cside-value">
                     { coursesDetails.clesson}
                    </span>
                  </li>

                  <li>
                    <span className="cside-label">
                      <i className="fa-solid fa-graduation-cap"></i> Student’s
                    </span>

                    <span className="cside-value">
                      150
                    </span>
                  </li>

                  <li>
                    <span className="cside-label">
                      <i className="fa-solid fa-clapperboard"></i> Video
                    </span>

                    <span className="cside-value">
                    { coursesDetails.cdur} Hours
                    </span>
                  </li>

                  <li>
                    <span className="cside-label">
                      <i className="fa-solid fa-chart-line"></i> Skill Level
                    </span>

                    <span className="cside-value">
                    {coursesDetails.cskill_level}
                    </span>
                  </li>

                  <li>
                    <span className="cside-label">
                      <i className="fa-solid fa-language"></i> Language
                    </span>

                    <span className="cside-value">
                      {coursesDetails.clanguage}
                    </span>
                  </li>
                </ul>

                <div className="cd_price">
                 <span> {coursesDetails.clanguage} </span>
                </div>

                <div className="text-center">
                  <a href="#" className="bg_btn bt">Buy Course</a>
                </div>

                <div className="cd_social">
                  <span>Share on:</span>
                  <ul>
                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="related-courses">
            <h3 className="created-title">Courses You May Like</h3>

            <div className="row">
              <div className="col-xl-4 col-md-6 col-12 wow fadeIn">
                <div className="single-course">
                  <div className="course-img">
                    <img src="assets/img/courses/1.jpg" alt="course image" />
                    <span className="cprice">$50.00</span>
                  </div>

                  <div className="course_content">
                    <div className="crating">
                      <a href="#">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <span>(21)</span>
                      </a>
                    </div>
                    <h2><a href="#">Photography Crash Course
                      for Photographer</a></h2>
                    <div className="cmeta">
                      <div className="smeta">
                        <i className='bx bx-user'></i>
                        25 Students
                      </div>

                      <div className="smeta">
                        <i className='bx bx-file'></i>
                        15 Lessons
                      </div>

                      <div className="smeta">
                        <i className='bx bx-time-five'></i>
                        1.5 Hours
                      </div>
                    </div>

                    <div className="course_btm">
                      <div className="cauthor">
                        <a href="#">
                          <img src="assets/img/review/1.jpg" alt="" />
                          <span>Masum Billah</span>
                        </a>
                      </div>

                      <div className="ccategory">
                        <a href="#">
                          Photography
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-xl-4 col-md-6 col-12 wow fadeIn">
                <div className="single-course">
                  <div className="course-img">
                    <img src="assets/img/courses/2.jpg" alt="course image" />
                    <span className="cprice">$50.00</span>
                  </div>

                  <div className="course_content">
                    <div className="crating">
                      <a href="#">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <span>(21)</span>
                      </a>
                    </div>
                    <h2><a href="#">Financial Security Thinking and Principles Theory</a></h2>
                    <div className="cmeta">
                      <div className="smeta">
                        <i className='bx bx-user'></i>
                        25 Students
                      </div>

                      <div className="smeta">
                        <i className='bx bx-file'></i>
                        15 Lessons
                      </div>

                      <div className="smeta">
                        <i className='bx bx-time-five'></i>
                        1.5 Hours
                      </div>
                    </div>

                    <div className="course_btm">
                      <div className="cauthor">
                        <a href="#">
                          <img src="assets/img/review/2.jpg" alt="" />
                          <span>Masum Billah</span>
                        </a>
                      </div>

                      <div className="ccategory">
                        <a href="#">
                          Security
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-xl-4 col-md-6 col-12 wow fadeIn">
                <div className="single-course">
                  <div className="course-img">
                    <img src="assets/img/courses/2.jpg" alt="course image" />
                    <span className="cprice">$50.00</span>
                  </div>

                  <div className="course_content">
                    <div className="crating">
                      <a href="#">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <span>(21)</span>
                      </a>
                    </div>
                    <h2><a href="#">Professional Ceramic Moulding for Beginners</a></h2>
                    <div className="cmeta">
                      <div className="smeta">
                        <i className='bx bx-user'></i>
                        25 Students
                      </div>

                      <div className="smeta">
                        <i className='bx bx-file'></i>
                        15 Lessons
                      </div>

                      <div className="smeta">
                        <i className='bx bx-time-five'></i>
                        1.5 Hours
                      </div>
                    </div>

                    <div className="course_btm">
                      <div className="cauthor">
                        <a href="#">
                          <img src="assets/img/review/3.jpg" alt="" />
                          <span>Masum Billah</span>
                        </a>
                      </div>

                      <div className="ccategory">
                        <a href="#">
                          Ceramic
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section >
    </>
  )
}


import { Link } from 'react-router-dom'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useState } from 'react';
import url from '../../../url';
export default function CoursesHomeOne() {


  const [courses, setCourses] = useState({});

  useEffect(() => {
    fetch(`${url}/course/allCourses`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching Courses:", error);

      });
  }, []);





  return (
    <>
      <section className="courses">
        <div className="container">
          <div className="row">
            <div className="col-12 wow fadeInUp">
              <div className="section-title">
                <span>Our Courses List</span>
                <h2>Most Popular Courses</h2>
              </div>
            </div>

            <div className="col-12 wow fadeIn">

              <div className="courses-slider owl-carousel owl-loaded owl-drag">

                <Swiper

                  slidesPerView={3}
                  spaceBetween={30}
                  loop={true}
                  pagination={{ clickable: true }}
                  modules={[Autoplay, Navigation]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  navigation={
                    { nextEl: '.owl-next', prevEl: '.owl-prev' }
                  }
                  breakpoints={{
                    0: {
                      slidesPerView: 1
                    },
                    768: {
                      slidesPerView: 2
                    },
                    1200: {
                      slidesPerView: 3
                    }
                  }}
                  className="courses-slider owl-carousel owl-loaded owl-drag">

                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <SwiperSlide className="single-course">
                        <div className="course-img">
                          <img src={`/public/${course.cimage}`} alt="course image" height={"250px"} />
                          <span className="cprice"><i className="fas fa-rupee-sign"></i>{course.cprice}</span>
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
                          <h2><Link to={`/course-details/${course._id}`}>{course.cname}</Link></h2>

                          <div className="cmeta">
                            <div className="smeta">
                              <i className='bx bx-user'></i>
                              5 Students
                            </div>

                            <div className="smeta">
                              <i className='bx bx-file'></i>
                              {course.clesson} Lessons
                            </div>

                            <div className="smeta">
                              <i className='bx bx-time-five'></i>
                              {course.cdur} Hrs
                            </div>
                          </div>

                          <div className="course_btm">
                            <div className="cauthor">
                              <a href="#">
                                <img src="assets/img/review/1.jpg" alt="" />
                                <span>{course.cinstructor}</span>
                              </a>
                            </div>

                            <div className="ccategory">
                              <a href="#">
                                {course.c_category}
                              </a>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>Loading courses...</p>
                  )}

                </Swiper>



                <div className="owl-nav">
                  <button type="button" role="presentation" className="owl-prev"><i className="bx bx-chevrons-left"></i></button>
                  <button type="button" role="presentation" className="owl-next"><i className="bx bx-chevrons-right"></i></button>
                </div>
              </div>



            </div>
          </div>
        </div>
      </section>
    </>
  )
}

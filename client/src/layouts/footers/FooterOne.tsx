 import './Footer.css'

export default function FooterOne({ style_2 }: any) {
  return (
    <>
      {/* <section className={`footer ${style_2 ? 'fstyle-2' : ''}`}>
        <div className="container">
          {style_2 ? null :
            <div className="row">
              <div className="col-xl-7 col-lg-7 wow fadeIn">
                <h2 className="fntitle">Subscribe to Our  Newsletter <br />
                  for Latest Update</h2>
              </div>

              <div className="col-xl-5 col-lg-5 align-self-center wow fadeIn">
                <div className="newsletter">
                  <form action="#" method="post">
                    <input type="email" name="EMAIL" placeholder="Email Address" />
                    <button type="submit">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>

          }

          <div className="row footer-bottom">
            <div className="col-xl-3 col-md-6 col-12 wow fadeIn">
              <div className="single-footer">
                <div className="about-footer">
                  <div className="footer-logo">
                    <a href="#"><img src="assets/img/footer-logo.svg" alt="Edumon" /></a>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit varius congue Morbi
                  </p>

                  <div className="fot-social">
                    <span>Follow Us On :</span>
                    <ul>
                      <li>
                        <a href="#"><i className="bx bxl-facebook"></i></a>
                      </li>

                      <li>
                        <a href="#"><i className="bx bxl-twitter"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="bx bxl-linkedin"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="bx bxl-youtube"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 col-12 wow fadeIn">
              <div className="single-footer">
                <h3 className="footer-title">Useful Links</h3>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Courses</a></li>
                  <li><a href="#">Categories</a></li>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 col-12 wow fadeIn">
              <div className="single-footer">
                <h3 className="footer-title">Resources</h3>
                <ul>
                  <li><a href="#">Community</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Video Guides</a></li>
                  <li><a href="#">Terms and Conditions</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Security</a></li>
                </ul>
              </div>
            </div>

            {style_2 ?
              <div className="col-xl-3 col-md-6 col-12 wow fadeIn">
                <div className="single-footer">
                  <h3 className="footer-title">Newsletter</h3>
                  <div className="newsletter">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur <br />
                      adipiscing elit. In varius congue .
                    </p>
                    <form onSubmit={e => e.preventDefault()} method="post">
                      <input type="email" name="EMAIL" placeholder="Email Address" />
                      <button type="submit">Subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
              :
              <div className="col-xl-3 col-md-6 col-12 wow fadeIn">
                <div className="single-footer">
                  <h3 className="footer-title">Contact Us</h3>
                  <div className="contact-info">
                    <p>
                      <i className='bx bx-map' ></i>
                      <span>15 Rose StreetHarvey, IL <br />
                        60426 USA</span>
                    </p>
                    <p>
                      <i className='bx bx-phone' ></i>
                      <span>
                        708-210-9101</span>
                    </p>

                    <p>
                      <i className='bx bx-envelope'></i>
                      <span>
                        example@education.com</span>
                    </p>
                  </div>
                </div>
              </div>
            }



          </div>

          <div className="moeffect">
            <div className="fbulb_shape eitem" defaultValue=".5">
              <svg fill="none" viewBox="0 0 90 90"><g fill="#fff" fillOpacity=".28" clipPath="url(#clip0_2833_430)"><path d="M42.715.123c-4.219.404-7.489 1.371-11.057 3.234-8.262 4.325-13.799 12.094-15.223 21.34-.421 2.62-.28 7.664.247 10.108 1.213 5.484 3.287 9.44 7.47 14.203 3.358 3.814 5.115 7.172 6.1 11.601.352 1.565.387 2.356.492 10.055.106 8.086.123 8.367.492 9.176.492 1.072 1.776 2.32 2.778 2.707l.79.299v1.037c0 2.232.897 4.043 2.514 5.115C38.725 89.93 39.34 90 45 90s6.275-.07 7.682-1.002c1.617-1.072 2.513-2.883 2.513-5.115v-1.037l.756-.3c1.072-.403 2.057-1.3 2.672-2.407l.527-.95.106-8.173c.105-8.913.158-9.44 1.248-12.832 1.055-3.287 2.707-6.047 5.66-9.493 4.43-5.15 6.54-9.562 7.506-15.732.281-1.793.281-6.258 0-8.086-1.494-9.809-7.612-18.035-16.488-22.166C52.787.668 47.267-.334 42.715.123zm5.097 3.568c5.872.704 10.688 3.006 14.907 7.102 8.156 7.91 10.037 20.057 4.675 30.146-1.019 1.916-1.933 3.182-4.166 5.784-2.25 2.619-3.375 4.289-4.605 6.802-1.494 3.059-2.373 6.082-2.69 9.229l-.123 1.318-2.232.053-2.25.053V42.064l1.371-.123c3.147-.28 5.15-2.232 5.168-5.08 0-1.423-.281-2.355-1.072-3.392-2.145-2.848-6.645-2.496-8.367.65-.44.809-.528 1.195-.616 2.62l-.087 1.67h-5.45l-.088-1.67c-.087-1.425-.175-1.811-.615-2.62-1.353-2.443-4.5-3.34-7.101-2.004-3.727 1.899-3.569 7.559.246 9.3.597.28 1.406.456 2.425.526l1.53.123V64.16H34.33l-.123-.545a7.62 7.62 0 01-.105-1.072c0-.932-.704-4.06-1.354-5.941-1.213-3.604-3.006-6.557-6.03-10.02-3.62-4.113-5.448-7.541-6.538-12.217-.528-2.285-.65-6.96-.229-9.44.967-5.765 3.955-11.126 8.438-15.081C33.627 5.22 41.045 2.883 47.812 3.69zm-9.685 31.746c.527.44.545.51.545 1.776v1.336l-1.248-.088c-1.512-.123-2.11-.563-2.145-1.6-.053-1.652 1.6-2.478 2.848-1.423zm15.363-.263c.95.44 1.195 1.986.422 2.742-.316.334-.668.457-1.512.527l-1.072.106v-1.301c.018-1.318.158-1.688.791-2.057.457-.263.844-.263 1.371-.017zm-5.678 17.912V64.16h-5.625V42.012h5.625v11.074zm7.91 19.775c0 5.889-.035 6.082-1.195 6.416-.44.141-3.586.176-9.914.141l-9.281-.053-.475-.492-.492-.475-.053-5.36-.052-5.362h21.463v5.185zM51.68 83.865c0 1.16-.405 1.987-1.143 2.338-.861.422-10.213.422-11.074 0-.738-.351-1.143-1.178-1.143-2.338v-.896h13.36v.896z" /><path d="M43.84 8.93c-.897.72-.967 1.916-.176 2.654.352.334.738.422 2.338.563 4.36.369 7.558 1.775 10.582 4.64 1.564 1.477 2.531 2.813 3.586 4.922.79 1.6 1.23 2.021 2.056 2.021.897 0 1.758-.86 1.758-1.757 0-.545-1.09-2.83-2.056-4.272-1.108-1.67-3.639-4.271-5.221-5.361-3.445-2.39-7.523-3.727-11.32-3.727-.844 0-1.284.088-1.547.317zM62.385 27.756c-.545.563-.668 1.248-.317 2.004.58 1.283 2.76 1.09 3.112-.281.193-.774.07-1.266-.44-1.793-.65-.633-1.67-.616-2.355.07zM8.754 8.543c-.615.316-.844.756-.844 1.582 0 .598.176.826 2.074 2.742 2.004 2.004 2.11 2.074 2.83 2.074 1.02 0 1.776-.72 1.776-1.687 0-.615-.158-.826-2.162-2.83-2.32-2.32-2.602-2.479-3.674-1.881zM77.572 10.424c-2.004 2.004-2.162 2.215-2.162 2.83 0 .967.756 1.687 1.776 1.687.72 0 .826-.07 2.83-2.074 1.898-1.916 2.074-2.144 2.074-2.742 0-.844-.229-1.266-.88-1.6-1.071-.545-1.317-.421-3.638 1.899zM.65 27.668c-.861.791-.808 1.951.123 2.637.422.316.791.369 2.707.422 1.213.035 2.55.017 2.954-.053 1.6-.229 2.214-1.828 1.142-2.918l-.51-.51H4.078c-2.9 0-2.988.018-3.428.422zM82.424 27.756c-1.072 1.09-.457 2.69 1.142 2.918.405.07 1.74.088 2.953.053 1.917-.053 2.286-.106 2.708-.422.931-.686.984-1.846.123-2.637-.44-.404-.528-.422-3.428-.422h-2.988l-.51.51zM11.953 43.172c-.72.475-3.516 3.287-3.797 3.797-.65 1.248.123 2.601 1.512 2.601.685 0 .826-.105 2.584-1.81 1.986-1.916 2.338-2.426 2.338-3.287 0-1.213-1.6-1.987-2.637-1.301zM75.955 43.4c-.615.58-.72 1.284-.299 2.092.14.264 1.072 1.283 2.092 2.268 1.758 1.705 1.898 1.81 2.584 1.81 1.389 0 2.162-1.353 1.512-2.601-.282-.51-3.077-3.322-3.797-3.797-.668-.44-1.46-.352-2.092.228z" /></g><defs><clipPath id="clip0_2833_430"><path fill="#fff" d="M0 0h90v90H0z" /></clipPath></defs></svg>
            </div>

            <div className="fpencil_shape eitem" defaultValue="1">
              <svg fill="none" viewBox="0 0 57 57"><path fill="#fff" fillOpacity=".2" d="M46.865.174c-.345.122-.846.367-1.113.557-.268.19-9.479 9.334-20.46 20.316l-19.96 19.97-2.629 6.393C1.255 50.92.041 53.993.02 54.227-.171 55.597 1.089 57 2.514 57c.479 0 .902-.167 7.496-2.885l5.947-2.45 20.038-20.026c11.015-11.016 20.17-20.25 20.349-20.527.768-1.215.869-2.785.234-4.055-.279-.557-.836-1.18-3.208-3.542C50.964 1.121 50.396.608 49.85.363c-.868-.4-2.105-.479-2.985-.19zm-1.693 11.628c2.228 2.228 4.044 4.088 4.044 4.155 0 .144-2.139 2.283-2.284 2.283-.056 0-1.949-1.838-4.199-4.088l-4.099-4.099 1.136-1.136c.635-.635 1.192-1.147 1.26-1.147.055 0 1.926 1.816 4.142 4.032zm-5.87 1.259l1.727 1.726-7.106 7.106c-7.685 7.696-7.429 7.384-6.816 7.986.601.613.29.869 7.986-6.817l7.106-7.106 1.726 1.727c.947.947 1.726 1.77 1.726 1.838 0 .055-6.783 6.894-15.07 15.18l-15.058 15.06-1.782-1.783-1.782-1.782 7.106-7.106c7.685-7.696 7.429-7.384 6.816-7.986-.601-.612-.29-.869-7.986 6.817l-7.106 7.106-1.782-1.782-1.782-1.782 15.059-15.06c8.287-8.286 15.125-15.069 15.18-15.069.068 0 .892.78 1.839 1.727zM10.178 46.864c2.072 2.072 3.753 3.799 3.731 3.82-.09.068-6.16 2.551-6.382 2.618-.156.045-.68-.412-2.038-1.77-1.003-1.003-1.827-1.872-1.827-1.939 0-.156 2.606-6.516 2.673-6.516.034 0 1.76 1.705 3.843 3.787z"></path></svg>
            </div>

            <div className="fshape1 spinning">
              <svg fill="none" viewBox="0 0 68 73"><path fill="#fff" fillOpacity=".05" d="M4.216 47.5C.004 45.604-.578 39.86 3.17 37.16L52.345 1.71c3.747-2.7 9.013-.332 9.478 4.263l6.112 60.313c.465 4.595-4.218 7.971-8.43 6.077L4.216 47.5z" /></svg>
            </div>

            <div className="fshape2 eitem" defaultValue=".5">
              <svg fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#0D5FF9" /></svg>
            </div>

            <div className="fshape3">
              <svg fill="none" viewBox="0 0 132 199"><circle cx="99.5" cy="99.5" r="98.5" stroke="#fff" strokeOpacity=".05" strokeWidth="2" /></svg>
            </div>

            <div className="fshape4 spinning">
              <svg fill="none" viewBox="0 0 82 92"><path stroke="#fff" strokeOpacity=".05" strokeWidth="3" d="M36.75 3.186a8.5 8.5 0 018.5 0l30.703 17.726a8.5 8.5 0 014.25 7.361v35.454a8.5 8.5 0 01-4.25 7.36L45.25 88.815a8.5 8.5 0 01-8.5 0L6.047 71.088a8.5 8.5 0 01-4.25-7.361V28.273a8.5 8.5 0 014.25-7.362L36.75 3.186z" /></svg>
            </div>

            <div className="fshape5 eitem">
              <svg fill="none" viewBox="0 0 199 199"><circle cx="99.5" cy="99.5" r="99.5" fill="#0D5FF9" fillOpacity=".05" /></svg>
            </div>

          </div>
        </div>

        <div className="copyright text-center wow fadeIn">
          <p>Copyright © {new Date().getFullYear()} <a href="#">Edumon</a>. All rights reserved.</p>
        </div>
      </section> */}

       <section>
       <footer className="footer-sec text-white py-5 text-light">
      <div className="container">
        <div className="row border-bottom pb-4">
          <div className="col-md-6 text-center text-md-start text-subscribe">
            <h2 className="text-light">Subscribe to Our Newsletter for Latest Update</h2>
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end mt-3 mt-md-0">
            <input
              type="email"
              className="form-control w-50 me-2 input-subscribe"
              placeholder="Email Address"
            />
            <button className="btn btn-primary btn-subscribe">Subscribe</button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-3">
            <h5 className="text-light"> <i className="fa-solid fa-book"></i> &nbsp; MyEdudocs</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit varius congue Morbi.</p>
            <h6 className='text-light'>Follow Us On:</h6>
            <div className="d-flex gap-2">
              {/* <FaFacebookF className="bg-secondary p-2 rounded-circle" />
              <FaTwitter className="bg-secondary p-2 rounded-circle" />
              <FaLinkedinIn className="bg-secondary p-2 rounded-circle" />
              <FaYoutube className="bg-secondary p-2 rounded-circle" /> */}
              <i className="fa-brands fa-facebook bg-primary p-2 rounded-circle"></i>
              <i className="fa-brands fa-x-twitter bg-secondary p-2 rounded-circle"></i>
              <i className="fa-brands fa-instagram bg-danger p-2 rounded-circle"></i>
              <i className="fa-brands fa-linkedin bg-primary p-2 rounded-circle"></i>

            </div>
          </div>

          <div className="col-md-3">
            <h5 className="text-light"><i className="fa-solid fa-link"></i> &nbsp; Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className='text-light text-decoration-none'>Home</a></li>
              <li><a href="/about" className='text-light text-decoration-none'>About Us</a></li>
              <li><a href="/courses" className='text-light text-decoration-none'>Courses</a></li>
              <li><a href="/" className='text-light text-decoration-none'>Pricing</a></li>
              <li><a href="/contact" className='text-light text-decoration-none'>Contact</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="text-light"><i className="fa-solid fa-paperclip"></i> &nbsp;Resources</h5>
            <ul className="list-unstyled">
            <li><a href="/" className='text-light text-decoration-none'>Community</a></li>
              <li><a href="/" className='text-light text-decoration-none'>Support</a></li>
              <li><a href="/" className='text-light text-decoration-none'>Terms and Conditions</a></li>
              <li><a href="/" className='text-light text-decoration-none'>Blogs</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="text-light"> <i className="fa-solid fa-address-book"></i> &nbsp; Contact Us</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center gap-2"><i className="fa-solid fa-location-dot"></i> India,India</li>
              <li className="d-flex align-items-center gap-2"><i className="fa-solid fa-phone"></i> 708-210-9101</li>
              <li className="d-flex align-items-center gap-2"><i className="fa-solid fa-envelope"></i> example@education.com</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-secondary mt-4 text-light">
          <b>Copyright © 2025 MyEdudocs. All rights reserved.</b>
        </p>
      </div>
    </footer>
       </section>
    </>
  )
}

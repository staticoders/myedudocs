 import './Footer.css'

export default function FooterOne() {
  return (
    <>


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

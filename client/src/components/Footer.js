import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="btn-wrap footer-wrap">
          <Link to="/">
            <div className="footer-back-btn-wrap">
              <button className="btn footer-btn">Home</button>
            </div>
          </Link>
          <Link to="/meow">
            <div className="footer-back-btn-wrap">
              <button className="btn footer-btn">Cats Page</button>
            </div>
          </Link>
          <Link to="/woof">
            <div className="footer-back-btn-wrap">
              <button className="btn footer-btn">Dogs Page</button>
            </div>
          </Link>
          <Link to="/catalog">
            <div className="footer-back-btn-wrap">
              <button className="btn footer-btn footer-catalog">
                Catalog Page
              </button>
            </div>
          </Link>
        </div>
        <div className="company-info-wrap">
          <div className="contact-wrap">
            <p className="contact">
              <b>Contact Us</b>
            </p>
            <p>(800)-000-0000</p>
            <p>info@mypets.com</p>
          </div>
          <div className="address-wrap">
            <p className="address">
              <b>Address</b>
            </p>
            <p>287 Fetch Drive, Ballpark, CA</p>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <p className="copyright">
          copyright &#xA9; 2023 | ALL PRODUCTS ARE SAMPLED FROM CHEWY.COM FOR
          EDUCATIONAL PURPOSES. NOTHING FOR SALE.{' '}
        </p>
      </div>
    </>
  );
}

import './SubscriptionSuccess.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function SubscriptionSuccess() {
  return (
    <>
      <div className="container">
        <h2 className="success-h2">
          🎉 Hurray! You are registered to myPets! 🎉
        </h2>
        <div className="sucess-signin-wrap">
          {localStorage.getItem('account') !== null ? (
            <Link to="/signout">
              <button className="success-signin-btn">Go To My Account</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className="success-signin-btn">Sign In</button>
            </Link>
          )}
        </div>
        <img
          src="/images/success.jpeg"
          alt="cats and dogs"
          className="success-img"
        />
      </div>
      <Footer />
    </>
  );
}

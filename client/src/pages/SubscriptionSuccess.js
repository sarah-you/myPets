import './SubscriptionSuccess.css';
import { Link } from 'react-router-dom';
export default function SubscriptionSuccess() {
  return (
    <>
      <div className="container">
        <h2 className="success-h2">
          🎉 Hurray! Welcome to the club. You are subscribed to myPets! 🎉
        </h2>
        <div className="sucess-signin-wrap">
          {localStorage.getItem('account') !== null ? (
            <Link to="/signout">Go To My Account</Link>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
        <img
          src="/images/success.jpeg"
          alt="cats and dogs"
          className="success-img"
        />
      </div>
    </>
  );
}

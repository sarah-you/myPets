import './SubscriptionSuccess.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function SubscriptionSuccess() {
  return (
    <>
      <div className="container">
        <h2 className="success-h2">
          🎉 Hurray! Welcome to the club. You are subscribed to myPets! 🎉
        </h2>
        <div className="sucess-signin-wrap">
          <Link to="/signin">Sign In</Link>
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

import './SubscriptionSuccess.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteSubscriber } from '../lib';

export default function SubscriptionSuccess() {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const stringData = localStorage.getItem('userInput');
  const userData = JSON.parse(stringData);

  async function handleClick() {
    try {
      await deleteSubscriber(userData.userId);
      alert(`Your account has been deleted`);
      navigate('/subscription');
    } catch (err) {
      setError(error);
      alert(`Error unsubscribing: ${err}`);
    }
  }

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

        <div className="unsubscribe-btn-wrap">
          <button onClick={handleClick} className="unsubscribe-btn">
            Delete my Account 🥺
          </button>
        </div>
      </div>
    </>
  );
}

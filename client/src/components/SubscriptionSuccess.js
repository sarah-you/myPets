import './SubscriptionSuccess.css';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionSuccess() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('userInput');
    navigate('/subscription');
  };

  const stringData = localStorage.getItem('userInput');
  const userData = JSON.parse(stringData);
  return (
    <>
      <div className="container">
        <h2 className="success-h2">
          🎉 Hurray! Welcome to the club. You are subscribed to myPets! 🎉
        </h2>
        <img
          src="/images/success.jpeg"
          alt="cats and dogs"
          className="success-img"
        />
        <h3>Your goodest user ID is: ✨ {userData?.userId} ✨</h3>
        <p className="success-text">
          Please use this user ID when you add items to your cart!{' '}
          <b>(COMING SOON!)</b> <br />
          Your unique ID will always be available here as long as you are
          subscribed! <br /> If you do not see a unique ID, it's because you're
          not subscribed yet! Please navigate to Subscription at the top
          navigation bar and subscribe!
        </p>
        <div className="unsubscribe-btn-wrap">
          <button onClick={handleClick} className="unsubscribe-btn">
            Unsubscribe 🥺
          </button>
        </div>
      </div>
    </>
  );
}

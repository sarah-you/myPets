import './SubscriptionSuccess.css';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionSuccess() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('userInput');
    if (userData === null) {
      navigate('/subscription');
    }
  };

  const stringData = localStorage.getItem('userInput');
  const userData = JSON.parse(stringData);
  return (
    <>
      <div className="container">
        <h2>
          🎉 Hurray! Welcome to the club. You are subscribed to myPets! 🎉
        </h2>
        <img
          src="/images/success.jpeg"
          alt="cats and dogs"
          className="success-img"
        />
        <h3>Your goodest user Id is: ✨ {userData?.userId} ✨</h3>
        <p>
          please use this when you add subscription items to your cart! Your
          unique ID will always be available here as long as you are subscribed!
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

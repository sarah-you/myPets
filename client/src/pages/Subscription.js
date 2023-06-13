import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createSubscriber } from '../lib';
import './Subscription.css';
import { FaCaretLeft } from 'react-icons/fa';
import SubscriptionSuccess from '../components/SubscriptionSuccess';

export default function Subscription() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const { firstName, lastName, email, address } = formJson;
    try {
      const result = await createSubscriber(
        firstName,
        lastName,
        email,
        address
      );
      navigate('sucess', { state: result });
    } catch (err) {
      setError(error);
    }
  }
  return (
    <div>
      <h1>myPets Subscription 📦</h1>
      <SubscriptionSuccess navigate={navigate} />
      <div className="content-wrap">
        <div className="form-wrap">
          <form method="post" onSubmit={handleSubmit} className="form">
            <h4>Receive your pet's favorites right to your door!</h4>
            <p>
              subscription details vary for each product. Please check the
              products' details for more information :){' '}
            </p>
            <label className="fn">
              <input name="firstName" placeholder="First Name" />
            </label>
            <label className="ln">
              <input name="lastName" placeholder="Last Name" />
            </label>
            <label className="email">
              <input type="text" name="email" placeholder="Email" />
            </label>
            <label className="address">
              <input name="address" placeholder="Delivery Address" />
            </label>
            <button type="submit" className="subscribe-btn">
              Subscribe
            </button>
          </form>
        </div>
        <div className="link">
          <Link to="/">
            <div className="back-btn-wrap">
              <FaCaretLeft />
              <button className="btn home-btn">Back to Home</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

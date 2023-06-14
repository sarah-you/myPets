import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createSubscriber } from '../lib';
import './Subscription.css';
import {
  FaCaretLeft,
  FaUserCircle,
  FaEnvelope,
  FaMapPin,
} from 'react-icons/fa';

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
      const userData = JSON.stringify(result);
      localStorage.setItem('userInput', userData);
      navigate('/success');
    } catch (err) {
      setError(error);
    }
  }
  return (
    <div>
      <h1>myPets Subscription 📦</h1>
      <div className="content-wrap">
        <div className="form-wrap">
          <form method="post" onSubmit={handleSubmit} className="form">
            <h4>Receive your pet's favorites right to your door!</h4>
            <p className="text">
              subscription details vary for each product. Please check the
              products' details for more information :)
            </p>
            <label className="fn">
              <div className="fn-input-wrap">
                <FaUserCircle className="fn-icon" />
                <input name="firstName" placeholder="First Name" />
              </div>
            </label>
            <label className="ln">
              <FaUserCircle className="ln-icon" />
              <input name="lastName" placeholder="Last Name" />
            </label>
            <label className="email">
              <FaEnvelope className="email-icon" />
              <input type="text" name="email" placeholder="Email" />
            </label>
            <label className="address">
              <FaMapPin className="address-icon" />
              <input name="address" placeholder="Delivery Address" />
            </label>
            <button type="submit" className="subscribe-btn">
              Subscribe
            </button>
            <p>
              <b>cancel anytime!</b>
            </p>
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

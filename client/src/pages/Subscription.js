import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createSubscriber } from '../lib';
import './Subscription.css';
import {
  FaCaretLeft,
  FaUserCircle,
  FaEnvelope,
  FaMapPin,
  FaLock,
  FaUser,
} from 'react-icons/fa';

export default function Subscription() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const { firstName, lastName, email, address, username, password } =
      formJson;
    try {
      const result = await createSubscriber(
        firstName,
        lastName,
        email,
        address,
        username,
        password
      );
      const userData = JSON.stringify(result);
      localStorage.setItem('userInput', userData);
      navigate('/success');
    } catch (err) {
      setError(error);
      alert(`Error registering ${err})`);
    }
  }

  return (
    <div>
      <h1 className="sub-head">myPets Subscription 📦</h1>
      <div className="content-wrap">
        <div className="form-wrap">
          <form method="post" onSubmit={handleSubmit} className="form">
            <h4 className="sub-h4">
              Receive your pet's favorites right to your door!
            </h4>
            <p className="text">
              myPets is currently only taking subscription applications so that
              our future members can have priority during our soft launch.{' '}
              <b>(COMING SOON)</b> If you want to become pals, sign up today! We
              won't bite :)
            </p>
            <label className="fn">
              <div className="fn-input-wrap">
                <FaUserCircle className="fn-icon" />
                <input name="firstName" placeholder="First Name" required />
              </div>
            </label>
            <label className="ln">
              <FaUserCircle className="ln-icon" />
              <input name="lastName" placeholder="Last Name" required />
            </label>
            <label className="email">
              <FaEnvelope className="email-icon" />
              <input type="text" name="email" placeholder="Email" required />
            </label>
            <label className="address">
              <FaMapPin className="address-icon" />
              <input name="address" placeholder="Delivery Address" required />
            </label>
            <label className="username">
              <FaUser className="username-icon" />
              <input name="username" placeholder="Username" required />
            </label>
            <label className="password">
              <FaLock className="password-icon" />
              <input
                name="password"
                placeholder="Password"
                type="password"
                required
              />
            </label>
            <button type="submit" className="sub-btn">
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

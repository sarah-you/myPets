import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createSubscriber } from '../lib';
import './Subscription.css';
import { FaCaretLeft } from 'react-icons/fa';

export default function Subscription() {
  const [error, setError] = useState();

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
    } catch (err) {
      setError(error);
    }
  }
  return (
    <div>
      <h1>myPets Subscription 📦</h1>
      <h3>COMING SOON!</h3>
      <h3>
        Receive biweekly supply of your pet's favorites right to your door!
      </h3>
      <div className="link">
        <Link to="/">
          <div className="back-btn-wrap">
            <FaCaretLeft />
            <button className="btn home-btn">Back to Home</button>
          </div>
        </Link>
      </div>
      {/* <div className="form-wrap">
        <form method="post" onSubmit={handleSubmit} className="form">
          <label className="fn">
            <input name="firstname" placeholder="First Name" />
          </label>
          <label className="ln">
            <input name="lastname" placeholder="Last Name" />
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

      </div> */}
    </div>
  );
}

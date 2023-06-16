import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.target);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      const accountData = {
        username: user,
        pw: token,
      };
      const myAccount = JSON.stringify(accountData);
      localStorage.setItem('account', myAccount);
      alert(`Welcome! You are now signed in to your account.`);
      navigate('/signout');
    } catch (err) {
      alert(
        `Login Failed. The username or password is invalid. Please try again`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full d-flex justify-between account-head">
          <h1>myPets Account</h1>
          <h5 className="signin-h5">Welcome!</h5>
          <p className="signin-text">
            Please sign in or register to add your pets' favorites to your
            personal list!
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row margin-bottom-1">
          <div className="column-half">
            <label className="margin-bottom-1 d-block">
              Username
              <input
                required
                name="username"
                type="text"
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
              />
            </label>
            <label className="margin-bottom-1 d-block">
              Password
              <input
                required
                name="password"
                type="password"
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="column-full d-flex justify-between">
            <button
              disabled={isLoading}
              className="input-b-radius text-padding purple-background white-text">
              Sign In
            </button>
          </div>
          <Link to="/subscription">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

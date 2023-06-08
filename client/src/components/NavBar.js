import { Link, Outlet } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="links-wrap">
        <div className="home-wrap">
          <Link to="/" className="home">
            <img src="images/logo.png" alt="paw print" className="paw" />
            myPets
          </Link>
        </div>
        <div className="meow-wrap">
          <Link to="meow" className="meow">
            <img
              src="images/cat-icon.png"
              alt="cute cartoon cat"
              className="kitti"
            />
            Meow
          </Link>
        </div>
        <div className="woof-wrap">
          <Link to="woof" className="woof">
            <img
              src="images/dog-icon.png"
              alt="cute cartoon dog"
              className="doggo"
            />
            Woof
          </Link>
        </div>
        <div className="pc-wrap">
          <Link to="details/:productId" className="pc">
            <img
              src="images/pc-icon.png"
              alt="4 square blocks"
              className="pc-icon"
            />
            Product Catalog
          </Link>
        </div>
        <div className="subscribe-wrap">
          <Link to="subscription" className="subscribe">
            <img
              src="images/subscribe-icon.png"
              alt="box icon"
              className="subscribe-icon"
            />
            Subscription
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

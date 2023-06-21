import { Link, Outlet } from 'react-router-dom';
import './NavBar.css';
import { TbCat, TbDog } from 'react-icons/tb';
import { HiOutlineSquares2X2, HiOutlineUserCircle } from 'react-icons/hi2';
import { FaPaw } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="links-wrap">
        <div className="home-wrap">
          <Link to="/" className="home">
            <FaPaw className="paw" />
            myPets
          </Link>
        </div>
        <div className="meow-wrap">
          <Link to="/meow" className="meow">
            <TbCat className="kitti" />
            myCats
          </Link>
        </div>
        <div className="woof-wrap">
          <Link to="/woof" className="woof">
            <TbDog className="doggo" />
            myDogs
          </Link>
        </div>
        <div className="pc-wrap">
          <Link to="/catalog" className="pc">
            <HiOutlineSquares2X2 className="pc-icon" />
            Catalog
          </Link>
        </div>
        <div className="account-wrap">
          {localStorage.getItem('account') !== null ? (
            <Link to="/signout" className="account">
              <HiOutlineUserCircle className="account-icon" />
              myPage
            </Link>
          ) : (
            <Link to="/signin" className="account">
              <HiOutlineUserCircle className="account-icon" />
              myPage
            </Link>
          )}
        </div>
        <div className="cart-wrap">
          {localStorage.getItem('account') !== null ? (
            <Link to="/cart" className="cart">
              <BsCart4 className="cart-icon" />
              myCart
            </Link>
          ) : (
            <Link to="/signin" className="account">
              <BsCart4 className="account-icon" />
              myCart
            </Link>
          )}
        </div>
      </div>
      <div className="banner-wrap">
        <p className="banner">
          The is the beta version of myPets subscription. Thank you for your
          patience :)
        </p>
      </div>
      <Outlet />
    </div>
  );
}

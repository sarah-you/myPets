import { Link } from 'react-router-dom';
import { FaCaretLeft } from 'react-icons/fa';
import './Meow.css';
import CatProd from '../components/CatProd';

export default function Meow() {
  return (
    <div className="meow-page">
      <img src="../images/cat-page-hero.png" alt="cat" className="cat-hero" />
      <div className="cat-content-wrap">
        <h1 className="cat-h1">myCats 🐈</h1>
        <CatProd />
        <Link to="/">
          <div className="back-btn-wrap">
            <FaCaretLeft />
            <button className="btn home-btn">Back to Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

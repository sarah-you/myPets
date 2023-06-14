import { Link } from 'react-router-dom';
import { FaCaretLeft } from 'react-icons/fa';
import './Meow.css';
import CatProd from '../components/CatProd';

export default function Meow() {
  return (
    <div className="meow">
      <img src="../images/cat-page-hero.png" alt="cat" className="cat-hero" />
      <CatProd />
      <Link to="/">
        <div className="back-btn-wrap">
          <FaCaretLeft />
          <button className="btn home-btn">Back to Home</button>
        </div>
      </Link>
    </div>
  );
}

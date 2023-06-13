import { Link } from 'react-router-dom';
import { FaCaretLeft } from 'react-icons/fa';

export default function Catalog() {
  return (
    <div className="product-catalog">
      <Link to="/">
        {' '}
        <div className="back-btn-wrap">
          <FaCaretLeft />
          <button className="btn home-btn">Back to Home</button>
        </div>
      </Link>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { FaCaretLeft } from 'react-icons/fa';

export default function Meow() {
  return (
    <div className="meow">
      <Link to="/">
        <div className="back-btn-wrap">
          <FaCaretLeft />
          <button className="btn home-btn">Back to Home</button>
        </div>
      </Link>
    </div>
  );
}

import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-full">
          <h3>(404 Error) Oopsies! We couldn't find that page :(</h3>
          <div className="img-wrap">
            <img src="images/404.jpeg" alt="cute kitten 404" />
          </div>
          <div className="link-wrap">
            <Link className="link" to="/">
              Return to the catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

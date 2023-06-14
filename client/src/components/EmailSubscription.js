import { useEffect, useState } from 'react';
import './EmailSubscription.css';
import { Link } from 'react-router-dom';

export default function EmailSubscriptionModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setShowModal(true);
    }, 8000);
    return () => clearTimeout(intervalId);
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="es-modal">
          <div className="modal-content modal-wrap">
            <div className="content-wrap">
              <h2>Hey Friend!</h2>
              <p>
                Don’t forget, you can subscribe to our available plans to have
                your buddy’s favorites ready at all times! Sign up today for
                extra 25% off the first month
              </p>
              <div className="es-btn-wrap">
                <Link to="success">
                  <button className="es-btn subscribe-btn">
                    <span>Subscribe</span>
                  </button>
                </Link>
                <button onClick={handleCloseModal} className="close-btn es-btn">
                  Close
                </button>
              </div>
            </div>
            <div className="img-wrap">
              <img src="../images/popUp.jpeg" alt="dog and friend" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

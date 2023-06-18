import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import './PdCarousel.css';

export default function PdCarousel({ imgs, productName }) {
  const [current, setCurrent] = useState(0);
  function handleClickPrev() {
    setCurrent((current - 1 + imgs.length) % imgs.length);
  }
  function handleClickNext() {
    setCurrent((current + 1) % imgs.length);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-full">
          <div className="pd-carousel-wrap">
            <div className="pd-l-arrow-wrap">
              <FaChevronLeft onClick={handleClickPrev} />
            </div>
            <div className="mid-col-wrap">
              <div className="img-wrap">
                <PdImage img={imgs[current]} productName={productName} />
              </div>
            </div>
            <div className="pd-r-arrow-wrap">
              <FaChevronRight onClick={handleClickNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// image component
function PdImage({ img, productName }) {
  return <img className="pd-carousel-img" src={img} alt={productName}></img>;
}

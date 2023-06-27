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

  function handleClick(index) {
    setCurrent(index);
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
              <div className="-pd-carousel-img-wrap">
                <PdImage
                  img={imgs[current]}
                  productName={productName}
                  className="pd-carousel-img"
                />
              </div>
              <div className="pd-carousel-sm-imgs">
                <div className="sm-previews">
                  {imgs.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={productName}
                      onClick={() => handleClick(index)}
                    />
                  ))}
                </div>
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

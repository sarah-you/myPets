import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from './Image';
import { useState } from 'react';
import ProgressBar from './ProgressBar';

import './Carousel.css';

export default function Carousel({ img }) {
  const [current, setCurrent] = useState(0);
  function handleClickPrev() {
    setCurrent((current - 1 + img.length) % img.length);
  }
  function handleClickNext() {
    setCurrent((current + 1) % img.length);
  }
  function handleClick(index) {
    setCurrent(index);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-full">
          <div className="carousel-wrap">
            <div className="l-arrow-wrap">
              <FaChevronLeft onClick={handleClickPrev} />
            </div>
            <div className="mid-col-wrap">
              <div className="img-wrap">
                <Image img={img[current]} />
              </div>
              <div className="progress-bar">
                <ProgressBar
                  img={img}
                  count={img.length}
                  onClick={handleClick}
                  interval={handleClickNext}
                  current={current}
                />
              </div>
            </div>
            <div className="r-arrow-wrap">
              <FaChevronRight onClick={handleClickNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

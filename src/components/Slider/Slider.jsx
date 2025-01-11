import { arrowDown } from "@/assets";
import { useEffect, useState } from "react";
import { slides } from "./constants";
import "./Slider.scss";

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const changeSlide = (direction) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + slides.length) % slides.length
    );
  };

  return (
    <div className="hero-slider">
      <button
        className="hero-slider__arrow hero-slider__arrow--left"
        onClick={() => changeSlide(-1)}
      >
        <img
          src={arrowDown}
          alt="Previous slide"
          className="hero-slider__arrow-icon hero-slider__arrow-icon--left"
        />
      </button>
      <button
        className="hero-slider__arrow hero-slider__arrow--right"
        onClick={() => changeSlide(1)}
      >
        <img
          src={arrowDown}
          alt="Next slide"
          className="hero-slider__arrow-icon hero-slider__arrow-icon--right"
        />
      </button>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slider__slide ${
            index === currentIndex ? "hero-slider__slide--active" : ""
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        ></div>
      ))}
      <div className="hero-slider__content">
        <h1 className="hero-slider__title">
          Plac, kuća, bazen, uređeno dvorište
        </h1>
        <p className="hero-slider__subtitle">
          20 minuta od Beograda, 10 minuta od Ikee
        </p>
        <img
          src={arrowDown}
          alt="Arrow down"
          className="hero-slider__arrow-down"
        />
      </div>
    </div>
  );
};

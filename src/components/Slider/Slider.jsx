import { useState, useEffect } from "react";
import "./Slider.scss";

const slides = [
  {
    id: 1,
    image: "http://192.168.1.9:3000/public/assets/hero-slide-1.jpg",
    title: "Slide One",
    subtitle: "This is the first slide",
  },
  {
    id: 2,
    image: "http://192.168.1.9:3000/public/assets/hero-slide-2.jpg",
    title: "Slide Two",
    subtitle: "This is the second slide",
  },
  {
    id: 3,
    image: "http://192.168.1.9:3000/public/assets/hero-slide-1.jpg",
    title: "Slide Three",
    subtitle: "This is the third slide",
  },
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="hero-slider">
      <button
        className="hero-slider__arrow hero-slider__arrow--left"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <button
        className="hero-slider__arrow hero-slider__arrow--right"
        onClick={goToNext}
      >
        &gt;
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
        <h1 className="hero-slider__title">Vaš raj u nadomku Beograda</h1>
        <p className="hero-slider__subtitle">Luksuzne vile za moderan život</p>
      </div>
    </div>
  );
};

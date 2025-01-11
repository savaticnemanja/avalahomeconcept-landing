import {
  astralLogo,
  bekamentLogo,
  bracaMaricLogo,
  ciricHomeInvestLogo,
  fluidraLogo,
  geberitLogo,
  wienerbergerLogo,
} from "@/assets";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Partners.scss";

const logos = [
  { src: astralLogo, alt: "Partner 1" },
  { src: bekamentLogo, alt: "Partner 2" },
  { src: bracaMaricLogo, alt: "Partner 3" },
  { src: ciricHomeInvestLogo, alt: "Partner 4" },
  { src: fluidraLogo, alt: "Partner 5" },
  { src: geberitLogo, alt: "Partner 6" },
  { src: wienerbergerLogo, alt: "Partner 7" },
];

export const Partners = () => {
  const [slidesToShow, setSlidesToShow] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(6);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <section className="partners">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="partners__logo-container">
            <img src={logo.src} alt={logo.alt} className="partners__logo" />
          </div>
        ))}
      </Slider>
    </section>
  );
};

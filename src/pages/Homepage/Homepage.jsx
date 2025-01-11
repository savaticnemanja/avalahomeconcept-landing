import {
  Contact,
  Location,
  Partners,
  PaymentDynamic,
  ProjectShowcase,
  Showcase,
  Slider,
} from "@/components";
import "./Homepage.scss";

export const Homepage = () => {
  return (
    <div className="homepage">
      <Slider />
      <div className="homepage__video-wrapper">
        <iframe
          className="homepage__video"
          src="https://www.youtube.com/embed/4cE_MdRrw3Q?si=rKcaPGbPpgRTwLMC"
          title="Avala Home Concept Intro Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <Showcase />
      <ProjectShowcase />
      <Location />
      <PaymentDynamic />
      <Contact />
      <Partners />
    </div>
  );
};

import { specifications } from "./constants";
import "./Specifications.scss";

export const Specifications = () => {
  return (
    <section id="specifications" className="specifications">
      <h1 className="specifications__title">Specifikacije gradnje</h1>
      <div className="specifications__features">
        {specifications.map((feature, index) => (
          <div className="specifications__feature-row" key={index}>
            <div className="specifications__feature">
              <img
                src={feature.icon}
                className="specifications__feature-icon"
              />
              <h4 className="specifications__feature-title">{feature.title}</h4>
              <p className="specifications__feature-description">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

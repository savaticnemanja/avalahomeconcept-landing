import { plan1, plan2 } from "../../assets";
import "./ProjectShowcase.scss";

export const ProjectShowcase = () => {
  return (
    <div className="project-showcase">
      <div className="project-showcase__project">
        <img src={plan1} alt="Plan1" />
      </div>
      <div className="project-showcase__project">
        <img src={plan2} alt="Plan1" />
      </div>
    </div>
  );
};

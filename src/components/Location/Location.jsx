import { map } from "@/assets";
import "./Location.scss";

export const Location = () => {
  return (
    <section id="location" className="location">
      <h1 className="location__title">Lokacija</h1>
      <div className="safe-zone">
        <div className="location__map">
          <img src={map} alt="" />
        </div>
      </div>
    </section>
  );
};

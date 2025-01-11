import {
  project1Main,
  project1Render,
  project1Spec1,
  project1Spec2,
  project1Spec3,
} from "@/assets";

import "./Project2.scss";

export const Project2 = () => {
  return (
    <div className="project2">
      <div className="project2__hero-image">
        <img src={project1Render} alt="" />
      </div>
      <div className="project2__main">
        <img className="project2__main-image" src={project1Main} alt="" />
        <div className="project2__main-description">
          Prostrana prizemna kuća od 139 metara kvadratnih. Ova moderno
          dizajnirana kuća ima i dva parking mesta i odvojenu namensku
          prostoriju pokraj bazena u koju možete smestiti letnju kuhinju. Čak
          tri prozračne i komforne sobe prozicionirane su tako da primaju dosta
          sunčeve svetlosti što će Vam svakog jutra uliti dodatno raspoloženje.
          Vrata velikog dnevnog boravka otvaraju se na terasu koja pruža
          veličanstven pogled na Avalaski toranj. Sa terase se stepenicama
          spuštate na uređenu stazu koja Vas vodi do bazena i plaže.
        </div>
      </div>
      <div className="project2__showcase-images">
        <div className="project2__showcase-image">
          <img src={project1Spec1} alt="" />
        </div>
        <div className="project2__showcase-image">
          <img src={project1Spec2} alt="" />
        </div>
        <div className="project2__showcase-image">
          <img src={project1Spec3} alt="" />
        </div>
      </div>
      <div className="project2__surface">
        <div className="project2__surface-title">Površina</div>
        <div className="project2__surface-value">139m²</div>
      </div>
    </div>
  );
};

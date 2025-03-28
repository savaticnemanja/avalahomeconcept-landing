import { plan1, plan2 } from "@/assets";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProjectShowcase.scss";

const projectData1 = [
  { name: "1. Predprostor", area: "10,00 m2", link: "/project1" },
  {
    name: "2. Tehnička prostorija",
    area: "3,00 m2",
    link: "/project1",
  },
  { name: "3. Toalet", area: "4,00 m2", link: "/project1" },
  { name: "4. Hodnik", area: "10,00 m2", link: "/project1" },
  { name: "5. Terasa", area: "11,00 m2", link: "/project1" },
  { name: "6. Soba", area: "15,00 m2", link: "/project1" },
  { name: "7. Soba", area: "12,00 m2", link: "/project1" },
  { name: "8. Soba", area: "12,00 m2", link: "/project1" },
  { name: "9. Kupatilo", area: "6,00 m2", link: "/project1" },
  { name: "10. Vešernica", area: "5,00 m2", link: "/project1" },
  { name: "11. Dnevni boravak", area: "22,00 m2", link: "/project1" },
  {
    name: "12. Kuhinja i trpezarija",
    area: "27,00 m2",
    link: "/project1",
  },
  { name: "13. Ostava", area: "2 m2", link: "/project1" },
];

const projectData2 = [
  { name: "1. Predprostor", area: "4,00 m2", link: "/project2" },
  { name: "2. Hodnik", area: "10,00 m2", link: "/project2" },
  { name: "3. Toalet + vešeraj", area: "6,00 m2", link: "/project2" },
  { name: "4. Soba", area: "12,00 m2", link: "/project2" },
  { name: "5. Soba", area: "12,00 m2", link: "/project2" },
  { name: "6. Soba", area: "14,00 m2", link: "/project2" },
  { name: "7. Garderober", area: "8,00 m2", link: "/project2" },
  { name: "8. Kupatilo", area: "10,00 m2", link: "/project2" },
  { name: "9. Terasa", area: "18,00 m2", link: "/project2" },
  { name: "10. Otvoreni trem", area: "7,00 m2", link: "/project2" },
  { name: "11. Dnevni boravak", area: "31,00 m2", link: "/project2" },
  { name: "12. Kuhinja", area: "8,00 m2", link: "/project2" },
  { name: "13. Ostava", area: "3,00 m2", link: "/project2" },
  {
    name: "14. Tehnička prostorija",
    area: "4,00 m2",
    link: "/project2",
  },
];

const ProjectImage = ({ src, alt }) => (
  <div className="project-showcase__project">
    <img src={src} alt={alt} />
  </div>
);

const ProjectTable = ({ data }) => (
  <table className="project-showcase__table">
    <thead>
      <tr>
        <th>NETO POVRŠINA</th>
        <th>m2</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.area}</td>
        </tr>
      ))}
      <tr>
        <td>
          <Link to={data[0].link}>
            <button className="project-showcase__details-button">
              Detaljna specifikacija
              <FaArrowCircleRight className="showcase__icon" />
            </button>
          </Link>
        </td>
      </tr>
    </tbody>
  </table>
);

export const ProjectShowcase = () => {
  return (
    <div className="project-showcase">
      <div className="project-showcase__project-container">
        <ProjectImage src={plan1} alt="Plan1" />
        <ProjectTable data={projectData1} />
      </div>
      <div className="project-showcase__project-container">
        <ProjectImage src={plan2} alt="Plan2" />
        <ProjectTable data={projectData2} />
      </div>
    </div>
  );
};

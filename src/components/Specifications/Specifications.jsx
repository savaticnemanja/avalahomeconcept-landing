import "./Specifications.scss";

const features = [
  {
    title: "Čvrsta gradnja",
    description: "Armirano betonska konstrukcija",
    icon: "assets/specification/construction.svg",
  },
  {
    title: "Thermo klima blok",
    description: "Broj 1. blok na tržištu",
    icon: "assets/specification/brickwall.svg",
  },
  {
    title: "Termoizolacija",
    description: "Austrotherm – debljina 10 cm, debljina zida 30 cm",
    icon: "assets/specification/wall.svg",
  },
  {
    title: "Sanitarije",
    description:
      "Geberit ugradni sistem uz prateću galanteriju, staklene tuš kabine",
    icon: "assets/specification/bathroom.svg",
  },
  {
    title: "Fasadna stolarija",
    description:
      "Aluminijumski prozori sa alu roletnama i dvostrukim staklom, punjeno argonom",
    icon: "assets/specification/cube.svg",
  },
  {
    title: "Staklo",
    description: 'Climaguard solar "Guardian" (4 godišnja doba)',
    icon: "assets/specification/glass.svg",
  },
  {
    title: "Grejanje",
    description:
      "Etažno, digitalni elektro kotao, skriveno radijatorsko grejanje. Toplotne pumpe (opciono)",
    icon: "assets/specification/heat.svg",
  },
  {
    title: "Unutrašnja vrata",
    description:
      "Medijapan presvučen CPL folijom sa dodatnim ojačanjima u štoku i krilu sa pervajz lajsnama",
    icon: "assets/specification/open-door.svg",
  },
  {
    title: "Spoljna vrata",
    description: "Sigurnosna vrata sa zaključavanjem u 6 tačaka",
    icon: "assets/specification/key.svg",
  },
  {
    title: "Fasada",
    description: "Prirodni materijali: drvo, keramika i kamen",
    icon: "assets/specification/bricks.svg",
  },
  {
    title: "Plafon",
    description: "Visina 2,70–2,90 m",
    icon: "assets/specification/ceiling-light.svg",
  },
  {
    title: "Uređeno dvorište",
    description:
      "Svuda se postavlja seme premium trave visokog kvaliteta bočno ograđivanjem",
    icon: "assets/specification/lawn-mower.svg",
  },
];

export const Specifications = () => {
  return (
    <section id="specifications" className="specifications">
      <h1 className="specifications__title">Specifikacije gradnje</h1>
      <div className="specifications__features">
        {features.map((feature, index) => (
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

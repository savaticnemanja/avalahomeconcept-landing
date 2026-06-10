import {
  bathroom,
  bricks,
  brickwall,
  ceilingLight,
  construction,
  cube,
  glass,
  heat,
  key,
  lawnMower,
  openDoor,
  wall,
} from "@/assets";

export const specifications = [
  {
    title: "Čvrsta gradnja",
    description: "Armirano betonska konstrukcija",
    icon: construction,
  },
  {
    title: "Thermo klima blok",
    description: "Broj 1. blok na tržištu",
    icon: brickwall,
  },
  {
    title: "Termoizolacija",
    description: "Debljina 10 cm, debljina zida 30 cm",
    icon: wall,
  },
  {
    title: "Sanitarije",
    description:
      "Geberit ugradni sistem uz prateću galanteriju, staklene tuš kabine",
    icon: bathroom,
  },
  {
    title: "Fasadna stolarija",
    description:
      "Aluminijumski prozori sa alu roletnama i dvostrukim staklom, punjeno argonom",
    icon: cube,
  },
  {
    title: "Staklo",
    description: 'Climaguard solar "Guardian" (4 godišnja doba)',
    icon: glass,
  },
  {
    title: "Grejanje",
    description:
      "Etažno, digitalni elektro kotao, skriveno radijatorsko grejanje. Toplotne pumpe (opciono)",
    icon: heat,
  },
  {
    title: "Unutrašnja vrata",
    description:
      "Medijapan presvučen CPL folijom sa dodatnim ojačanjima u štoku i krilu sa pervajz lajsnama",
    icon: openDoor,
  },
  {
    title: "Spoljna vrata",
    description: "Sigurnosna vrata sa zaključavanjem u 6 tačaka",
    icon: key,
  },
  {
    title: "Fasada",
    description: "Prirodni materijali: drvo, keramika i kamen",
    icon: bricks,
  },
  {
    title: "Plafon",
    description: "Visina 2,70–2,90 m",
    icon: ceilingLight,
  },
  {
    title: "Uređeno dvorište",
    description:
      "Svuda se postavlja seme premium trave visokog kvaliteta bočno ograđivanjem",
    icon: lawnMower,
  },
];

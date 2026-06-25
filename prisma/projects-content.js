// Multilingual content for the three offered single-storey houses (128.26 /
// 138.55 / 141.78 m²). Single source of truth shared by prisma/seed.js (fresh
// installs) and scripts/import-houses.mjs (refreshing an existing DB). This file
// is an explicit snapshot of the live content at avalahomeconcept.com —
// regenerate it from the live data when the admin-managed content changes.

const LOCALES = ['sr', 'en', 'ru', 'de'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Spread a { sr, en, ru, de } object into { baseSr, baseEn, baseRu, baseDe }.
export const loc = (base, obj) => {
  const out = {};
  for (const l of LOCALES) out[`${base}${cap(l)}`] = obj[l] ?? '';
  return out;
};

export const HOUSES = [
  {
    slug: "prizemna-kuca-128-26-m2",
    filePrefix: "project1",
    folder: "project-1",
    cover: "cover.webp",
    images: ["cover.webp","photo-1.webp","photo-2.webp"],
    pin: {"top":"54%","left":"31%"},
    totalAreaM2: 128.26,
    title: {"sr":"Prizemna kuća 128.26 m²","en":"Single-storey house 128.26 m²","ru":"Одноэтажный дом 128.26 м²","de":"Einstöckiges Haus 128.26 m²"},
    subtitle: {"sr":"Prizemna kuća","en":"Single-storey house","ru":"Одноэтажный дом","de":"Einstöckiges Haus"},
    badge: {"sr":"Dostupno","en":"Available","ru":"Доступно","de":"Verfügbar"},
    description: {"sr":"Prizemna porodična kuća površine 128.26 m² sa tri spavaće sobe, dva kupatila i garderobom. Prostran otvoreni prostor kuhinje, trpezarije i dnevnog boravka od 44 m² izlazi na terasu i uređeno dvorište. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.","en":"A single-storey family house of 128.26 m² with three bedrooms, two bathrooms and a dressing room. A spacious open-plan kitchen, dining and living area of 44 m² opens onto a covered terrace and a landscaped yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.","ru":"Одноэтажный семейный дом площадью 128.26 м² с тремя спальнями, двумя ванными комнатами и гардеробной. Просторная объединённая кухня-столовая-гостиная 44 м² выходит на крытую террасу и благоустроенный двор. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.","de":"Einstöckiges Familienhaus mit 128.26 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der großzügige offene Wohn-, Ess- und Küchenbereich von 44 m² öffnet sich zur überdachten Terrasse und zum angelegten Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad."},
    highlights: [
      {"icon":"LuBed","value":"3","label":{"sr":"Sobe","en":"Bedrooms","ru":"Спальни","de":"Schlafzimmer"}},
      {"icon":"LuBath","value":"2","label":{"sr":"Kupatila","en":"Bathrooms","ru":"Ванные","de":"Badezimmer"}},
      {"icon":"LuSofa","value":"","label":{"sr":"Kuhinja, trpezarija i dnevni boravak 44 m²","en":"Open-plan kitchen, dining & living 44 m²","ru":"Кухня, столовая и гостиная 44 м²","de":"Offener Wohn-, Ess- und Küchenbereich 44 m²"}},
      {"icon":"LuCar","value":"","label":{"sr":"Dva parking mesta 2,5 x 5 m","en":"Two parking spaces 2,5 x 5 m","ru":"Два парковочных места 2,5 x 5 м","de":"Zwei Stellplätze 2,5 x 5 m"}},
      {"icon":"LuWaves","value":"","label":{"sr":"Bazen 8 x 4 m","en":"Pool 8 x 4 m","ru":"Бассейн 8 x 4 м","de":"Pool 8 x 4 m"}},
      {"icon":"LuMaximize2","value":"128.26 m²","label":{"sr":"Površina","en":"Area","ru":"Площадь","de":"Fläche"}},
    ],
    rooms: [
      {"area":"6,53 m²","name":{"sr":"Ulazni hol","en":"Entrance hall","ru":"Входной холл","de":"Eingangshalle"}},
      {"area":"6,72 m²","name":{"sr":"Hodnik","en":"Hallway","ru":"Коридор","de":"Flur"}},
      {"area":"43,81 m²","name":{"sr":"Kuhinja, trpezarija i dnevni boravak","en":"Kitchen, dining & living room","ru":"Кухня, столовая и гостиная","de":"Küche, Ess- und Wohnzimmer"}},
      {"area":"20,06 m²","name":{"sr":"Terasa","en":"Terrace","ru":"Терраса","de":"Terrasse"}},
      {"area":"4,47 m²","name":{"sr":"Kupatilo","en":"Bathroom","ru":"Ванная комната","de":"Badezimmer"}},
      {"area":"4,36 m²","name":{"sr":"Tehnička prostorija","en":"Utility room","ru":"Техническое помещение","de":"Hauswirtschaftsraum"}},
      {"area":"4,95 m²","name":{"sr":"Garderoba","en":"Dressing room","ru":"Гардеробная","de":"Ankleidezimmer"}},
      {"area":"3,94 m²","name":{"sr":"Kupatilo","en":"Bathroom","ru":"Ванная комната","de":"Badezimmer"}},
      {"area":"13,32 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
      {"area":"11,01 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
      {"area":"9,10 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
    ],
  },
  {
    slug: "prizemna-kuca-138-55-m2",
    filePrefix: "project2",
    folder: "project-2",
    cover: "cover.webp",
    images: ["cover.webp","photo-1.webp","photo-2.webp"],
    pin: {"top":"86%","left":"29%"},
    totalAreaM2: 138.55,
    title: {"sr":"Prizemna kuća 138.55 m²","en":"Single-storey house 138.55 m²","ru":"Одноэтажный дом 138.55 м²","de":"Einstöckiges Haus 138.55 m²"},
    subtitle: {"sr":"Prizemna kuća","en":"Single-storey house","ru":"Одноэтажный дом","de":"Einstöckiges Haus"},
    badge: {"sr":"Dostupno","en":"Available","ru":"Доступно","de":"Verfügbar"},
    description: {"sr":"Prizemna porodična kuća površine 138.55 m² sa tri spavaće sobe, dva kupatila i garderobom. Centralni otvoreni prostor kuhinje, trpezarije i dnevnog boravka od 49 m² povezuje se sa terasom i dvorištem. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.","en":"A single-storey family house of 138.55 m² with three bedrooms, two bathrooms and a dressing room. A central open-plan kitchen, dining and living area of 49 m² connects to a covered terrace and the yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.","ru":"Одноэтажный семейный дом площадью 138.55 м² с тремя спальнями, двумя ванными комнатами и гардеробной. Центральная объединённая кухня-столовая-гостиная 49 м² соединяется с крытой террасой и двором. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.","de":"Einstöckiges Familienhaus mit 138.55 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der zentrale offene Wohn-, Ess- und Küchenbereich von 49 m² verbindet sich mit der überdachten Terrasse und dem Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad."},
    highlights: [
      {"icon":"LuBed","value":"3","label":{"sr":"Sobe","en":"Bedrooms","ru":"Спальни","de":"Schlafzimmer"}},
      {"icon":"LuBath","value":"2","label":{"sr":"Kupatila","en":"Bathrooms","ru":"Ванные","de":"Badezimmer"}},
      {"icon":"LuSofa","value":"","label":{"sr":"Kuhinja, trpezarija i dnevni boravak 49 m²","en":"Open-plan kitchen, dining & living 49 m²","ru":"Кухня, столовая и гостиная 49 м²","de":"Offener Wohn-, Ess- und Küchenbereich 49 m²"}},
      {"icon":"LuCar","value":"","label":{"sr":"Dva parking mesta 2,5 x 5 m","en":"Two parking spaces 2,5 x 5 m","ru":"Два парковочных места 2,5 x 5 м","de":"Zwei Stellplätze 2,5 x 5 m"}},
      {"icon":"LuWaves","value":"","label":{"sr":"Bazen 8 x 4 m","en":"Pool 8 x 4 m","ru":"Бассейн 8 x 4 м","de":"Pool 8 x 4 m"}},
      {"icon":"LuMaximize2","value":"138.55 m²","label":{"sr":"Površina","en":"Area","ru":"Площадь","de":"Fläche"}},
    ],
    rooms: [
      {"area":"6,53 m²","name":{"sr":"Ulazni hol","en":"Entrance hall","ru":"Входной холл","de":"Eingangshalle"}},
      {"area":"6,72 m²","name":{"sr":"Hodnik","en":"Hallway","ru":"Коридор","de":"Flur"}},
      {"area":"48,66 m²","name":{"sr":"Kuhinja, trpezarija i dnevni boravak","en":"Kitchen, dining & living room","ru":"Кухня, столовая и гостиная","de":"Küche, Ess- und Wohnzimmer"}},
      {"area":"20,75 m²","name":{"sr":"Terasa","en":"Terrace","ru":"Терраса","de":"Terrasse"}},
      {"area":"4,47 m²","name":{"sr":"Kupatilo","en":"Bathroom","ru":"Ванная комната","de":"Badezimmer"}},
      {"area":"4,36 m²","name":{"sr":"Tehnička prostorija","en":"Utility room","ru":"Техническое помещение","de":"Hauswirtschaftsraum"}},
      {"area":"4,95 m²","name":{"sr":"Garderoba","en":"Dressing room","ru":"Гардеробная","de":"Ankleidezimmer"}},
      {"area":"3,94 m²","name":{"sr":"Kupatilo","en":"Bathroom","ru":"Ванная комната","de":"Badezimmer"}},
      {"area":"15,62 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
      {"area":"11,16 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
      {"area":"11,40 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
    ],
  },
  {
    slug: "prizemna-kuca-141-78-m2",
    filePrefix: "small-houses",
    folder: "project-3",
    cover: "cover.webp",
    images: ["cover.webp","photo-1.webp","photo-2.webp"],
    pin: {"top":"58%","left":"80%"},
    totalAreaM2: 141.78,
    title: {"sr":"Prizemna kuća 141.78 m²","en":"Single-storey house 141.78 m²","ru":"Одноэтажный дом 141.78 м²","de":"Einstöckiges Haus 141.78 m²"},
    subtitle: {"sr":"Prizemna kuća","en":"Single-storey house","ru":"Одноэтажный дом","de":"Einstöckiges Haus"},
    badge: {"sr":"Dostupno","en":"Available","ru":"Доступно","de":"Verfügbar"},
    description: {"sr":"Najprostranija prizemna kuća u kompleksu, površine 141.78 m², sa tri spavaće sobe, dva kupatila i garderobom. Dnevna zona kuhinje, trpezarije i dnevnog boravka od 48 m² otvara se na veliku terasu i dvorište. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.","en":"The most spacious single-storey house in the complex at 141.78 m², with three bedrooms, two bathrooms and a dressing room. The 48 m² open-plan kitchen, dining and living zone opens onto a large terrace and yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.","ru":"Самый просторный одноэтажный дом в комплексе, 141.78 м², с тремя спальнями, двумя ванными комнатами и гардеробной. Объединённая кухня-столовая-гостиная 48 м² открывается на большую террасу и двор. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.","de":"Das geräumigste einstöckige Haus der Anlage mit 141.78 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der 48 m² große offene Wohn-, Ess- und Küchenbereich öffnet sich zu einer großen Terrasse und dem Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad."},
    highlights: [
      {"icon":"LuBed","value":"3","label":{"sr":"Sobe","en":"Bedrooms","ru":"Спальни","de":"Schlafzimmer"}},
      {"icon":"LuBath","value":"2","label":{"sr":"Kupatila","en":"Bathrooms","ru":"Ванные","de":"Badezimmer"}},
      {"icon":"LuSofa","value":"","label":{"sr":"Kuhinja, trpezarija i dnevni boravak 48 m²","en":"Open-plan kitchen, dining & living 48 m²","ru":"Кухня, столовая и гостиная 48 м²","de":"Offener Wohn-, Ess- und Küchenbereich 48 m²"}},
      {"icon":"LuCar","value":"","label":{"sr":"Dva parking mesta 2,5 x 5 m","en":"Two parking spaces 2,5 x 5 m","ru":"Два парковочных места 2,5 x 5 м","de":"Zwei Stellplätze 2,5 x 5 m"}},
      {"icon":"LuWaves","value":"","label":{"sr":"Bazen 8 x 4 m","en":"Pool 8 x 4 m","ru":"Бассейн 8 x 4 м","de":"Pool 8 x 4 m"}},
      {"icon":"LuMaximize2","value":"141.78 m²","label":{"sr":"Površina","en":"Area","ru":"Площадь","de":"Fläche"}},
    ],
    rooms: [
      {"area":"6,68 m²","name":{"sr":"Ulazni hol","en":"Entrance hall","ru":"Входной холл","de":"Eingangshalle"}},
      {"area":"7,79 m²","name":{"sr":"Hodnik","en":"Hallway","ru":"Коридор","de":"Flur"}},
      {"area":"11,75 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
      {"area":"10,92 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
      {"area":"4,35 m²","name":{"sr":"Kupatilo","en":"Bathroom","ru":"Ванная комната","de":"Badezimmer"}},
      {"area":"5,28 m²","name":{"sr":"Kupatilo","en":"Bathroom","ru":"Ванная комната","de":"Badezimmer"}},
      {"area":"6,38 m²","name":{"sr":"Garderoba","en":"Dressing room","ru":"Гардеробная","de":"Ankleidezimmer"}},
      {"area":"14,63 m²","name":{"sr":"Soba","en":"Room","ru":"Комната","de":"Zimmer"}},
      {"area":"20,97 m²","name":{"sr":"Terasa","en":"Terrace","ru":"Терраса","de":"Terrasse"}},
      {"area":"48,07 m²","name":{"sr":"Kuhinja, trpezarija i dnevni boravak","en":"Kitchen, dining & living room","ru":"Кухня, столовая и гостиная","de":"Küche, Ess- und Wohnzimmer"}},
      {"area":"4,93 m²","name":{"sr":"Tehnička prostorija","en":"Utility room","ru":"Техническое помещение","de":"Hauswirtschaftsraum"}},
    ],
  },
];

// Create the houses (with images, highlights and rooms) for `prisma`.
// `copyAsset(srcRel, destName)` copies a source file into uploads and returns
// the stored filename; `startOrder` lets callers control project ordering.
export async function createHouses(prisma, copyAsset, startOrder = 0) {
  let projOrder = startOrder;
  for (const h of HOUSES) {
    const project = await prisma.project.create({
      data: {
        slug: h.slug,
        order: projOrder++,
        ...loc('title', h.title),
        ...loc('subtitle', h.subtitle),
        ...loc('badge', h.badge),
        ...loc('description', h.description),
        totalAreaM2: h.totalAreaM2,
        sitePlanTop: h.pin.top,
        sitePlanLeft: h.pin.left,
        coverFilename: `seed-${h.filePrefix}-${h.cover}`,
      },
    });

    let imgOrder = 0;
    for (const file of h.images) {
      const filename = copyAsset(`scripts/assets/projects/${h.folder}/${file}`, `seed-${h.filePrefix}-${file}`);
      await prisma.projectImage.create({ data: { projectId: project.id, filename, order: imgOrder++ } });
    }

    let hOrder = 0;
    for (const hl of h.highlights) {
      await prisma.projectHighlight.create({
        data: { projectId: project.id, order: hOrder++, icon: hl.icon, value: hl.value, ...loc('label', hl.label) },
      });
    }

    for (let i = 0; i < h.rooms.length; i += 1) {
      const room = h.rooms[i];
      await prisma.projectRoom.create({
        data: { projectId: project.id, order: i, area: room.area, ...loc('name', room.name) },
      });
    }
  }
}

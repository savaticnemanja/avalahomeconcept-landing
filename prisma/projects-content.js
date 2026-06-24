// Multilingual content for the three offered houses (Kuća 1/2/3). Single source
// of truth shared by prisma/seed.js (fresh installs) and scripts/import-houses.mjs
// (refreshing an existing DB). This file is an explicit snapshot of the live
// content — regenerate it from the database when the admin-managed data changes.

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
    slug: "kuca-1",
    filePrefix: "project1",
    folder: "project-1",
    cover: "cover.webp",
    images: ["cover.webp","photo-1.webp","photo-2.webp"],
    pin: {"top":"34%","left":"72%"},
    totalAreaM2: 128,
    title: {"sr":"Kuća 1","en":"House 1 — Single-storey house 128 m²","ru":"Дом 1 — Одноэтажный дом 128 м²","de":"Haus 1 — Einstöckiges Haus 128 m²"},
    subtitle: {"sr":"Prizemna kuća","en":"Single-storey house","ru":"Одноэтажный дом","de":"Einstöckiges Haus"},
    badge: {"sr":"Dostupno","en":"Available","ru":"Доступно","de":"Verfügbar"},
    description: {"sr":"Prizemna porodična kuća površine 128 m² sa tri spavaće sobe, dva kupatila i garderobom. Prostran otvoreni prostor kuhinje, trpezarije i dnevnog boravka od 44 m² izlazi na natkrivenu terasu i uređeno dvorište. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.","en":"A single-storey family house of 128 m² with three bedrooms, two bathrooms and a dressing room. A spacious open-plan kitchen, dining and living area of 44 m² opens onto a covered terrace and a landscaped yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.","ru":"Одноэтажный семейный дом площадью 128 м² с тремя спальнями, двумя ванными комнатами и гардеробной. Просторная объединённая кухня-столовая-гостиная 44 м² выходит на крытую террасу и благоустроенный двор. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.","de":"Einstöckiges Familienhaus mit 128 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der großzügige offene Wohn-, Ess- und Küchenbereich von 44 m² öffnet sich zur überdachten Terrasse und zum angelegten Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad."},
    highlights: [
      {"icon":"LuBed","value":"3","label":{"sr":"Sobe","en":"Bedrooms","ru":"Спальни","de":"Schlafzimmer"}},
      {"icon":"LuBath","value":"2","label":{"sr":"Kupatila","en":"Bathrooms","ru":"Ванные","de":"Badezimmer"}},
      {"icon":"LuSunrise","value":"20 m²","label":{"sr":"Terasa","en":"Terrace","ru":"Терраса","de":"Terrasse"}},
      {"icon":"LuMaximize2","value":"128 m²","label":{"sr":"Površina","en":"Area","ru":"Площадь","de":"Fläche"}},
      {"icon":"LuDot","value":"","label":{"sr":"Kuhinja, trpezarija i dnevni boravak 44 m²","en":"Open-plan kitchen, dining & living 44 m²","ru":"Кухня, столовая и гостиная 44 м²","de":"Offener Wohn-, Ess- und Küchenbereich 44 m²"}},
      {"icon":"LuDot","value":"","label":{"sr":"Dva kupatila i garderoba","en":"Two bathrooms and a dressing room","ru":"Две ванные комнаты и гардеробная","de":"Zwei Badezimmer und ein Ankleidezimmer"}},
      {"icon":"LuDot","value":"","label":{"sr":"Natkrivena terasa 20 m²","en":"Covered terrace 20 m²","ru":"Крытая терраса 20 м²","de":"Überdachte Terrasse 20 m²"}},
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
    slug: "kuca-2",
    filePrefix: "project2",
    folder: "project-2",
    cover: "cover.webp",
    images: ["cover.webp","photo-1.webp","photo-2.webp"],
    pin: {"top":"40%","left":"43%"},
    totalAreaM2: 138,
    title: {"sr":"Kuća 2","en":"House 2 — Single-storey house 139 m²","ru":"Дом 2 — Одноэтажный дом 139 м²","de":"Haus 2 — Einstöckiges Haus 139 m²"},
    subtitle: {"sr":"Prizemna kuća","en":"Single-storey house","ru":"Одноэтажный дом","de":"Einstöckiges Haus"},
    badge: {"sr":"Dostupno","en":"Available","ru":"Доступно","de":"Verfügbar"},
    description: {"sr":"Prizemna porodična kuća površine 138 m² sa tri spavaće sobe, dva kupatila i garderobom. Centralni otvoreni prostor kuhinje, trpezarije i dnevnog boravka od 49 m² povezuje se sa natkrivenom terasom i dvorištem. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.","en":"A single-storey family house of 139 m² with three bedrooms, two bathrooms and a dressing room. A central open-plan kitchen, dining and living area of 49 m² connects to a covered terrace and the yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.","ru":"Одноэтажный семейный дом площадью 139 м² с тремя спальнями, двумя ванными комнатами и гардеробной. Центральная объединённая кухня-столовая-гостиная 49 м² соединяется с крытой террасой и двором. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.","de":"Einstöckiges Familienhaus mit 139 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der zentrale offene Wohn-, Ess- und Küchenbereich von 49 m² verbindet sich mit der überdachten Terrasse und dem Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad."},
    highlights: [
      {"icon":"LuBed","value":"3","label":{"sr":"Sobe","en":"Bedrooms","ru":"Спальни","de":"Schlafzimmer"}},
      {"icon":"LuBath","value":"2","label":{"sr":"Kupatila","en":"Bathrooms","ru":"Ванные","de":"Badezimmer"}},
      {"icon":"LuSunrise","value":"21 m²","label":{"sr":"Terasa","en":"Terrace","ru":"Терраса","de":"Terrasse"}},
      {"icon":"LuMaximize2","value":"139 m²","label":{"sr":"Površina","en":"Area","ru":"Площадь","de":"Fläche"}},
      {"icon":"LuDot","value":"","label":{"sr":"Kuhinja, trpezarija i dnevni boravak 49 m²","en":"Open-plan kitchen, dining & living 49 m²","ru":"Кухня, столовая и гостиная 49 м²","de":"Offener Wohn-, Ess- und Küchenbereich 49 m²"}},
      {"icon":"LuDot","value":"","label":{"sr":"Dva kupatila i garderoba","en":"Two bathrooms and a dressing room","ru":"Две ванные комнаты и гардеробная","de":"Zwei Badezimmer und ein Ankleidezimmer"}},
      {"icon":"LuDot","value":"","label":{"sr":"Natkrivena terasa 21 m²","en":"Covered terrace 21 m²","ru":"Крытая терраса 21 м²","de":"Überdachte Terrasse 21 m²"}},
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
    slug: "kuca-3",
    filePrefix: "small-houses",
    folder: "small-houses",
    cover: "cover.webp",
    images: ["cover.webp","photo-1.webp","photo-2.webp"],
    pin: {"top":"20%","left":"24%"},
    totalAreaM2: 141,
    title: {"sr":"Kuća 3","en":"House 3 — Single-storey house 142 m²","ru":"Дом 3 — Одноэтажный дом 142 м²","de":"Haus 3 — Einstöckiges Haus 142 m²"},
    subtitle: {"sr":"Prizemna kuća","en":"Single-storey house","ru":"Одноэтажный дом","de":"Einstöckiges Haus"},
    badge: {"sr":"Dostupno","en":"Available","ru":"Доступно","de":"Verfügbar"},
    description: {"sr":"Najprostranija prizemna kuća u kompleksu, površine 141 m², sa tri spavaće sobe, dva kupatila i garderobom. Dnevna zona kuhinje, trpezarije i dnevnog boravka od 48 m² otvara se na veliku terasu i dvorište. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.","en":"The most spacious single-storey house in the complex at 142 m², with three bedrooms, two bathrooms and a dressing room. The 48 m² open-plan kitchen, dining and living zone opens onto a large terrace and yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.","ru":"Самый просторный одноэтажный дом в комплексе, 142 м², с тремя спальнями, двумя ванными комнатами и гардеробной. Объединённая кухня-столовая-гостиная 48 м² открывается на большую террасу и двор. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.","de":"Das geräumigste einstöckige Haus der Anlage mit 142 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der 48 m² große offene Wohn-, Ess- und Küchenbereich öffnet sich zu einer großen Terrasse und dem Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad."},
    highlights: [
      {"icon":"LuBed","value":"3","label":{"sr":"Sobe","en":"Bedrooms","ru":"Спальни","de":"Schlafzimmer"}},
      {"icon":"LuBath","value":"2","label":{"sr":"Kupatila","en":"Bathrooms","ru":"Ванные","de":"Badezimmer"}},
      {"icon":"LuSunrise","value":"21 m²","label":{"sr":"Terasa","en":"Terrace","ru":"Терраса","de":"Terrasse"}},
      {"icon":"LuMaximize2","value":"142 m²","label":{"sr":"Površina","en":"Area","ru":"Площадь","de":"Fläche"}},
      {"icon":"LuDot","value":"","label":{"sr":"Kuhinja, trpezarija i dnevni boravak 48 m²","en":"Open-plan kitchen, dining & living 48 m²","ru":"Кухня, столовая и гостиная 48 м²","de":"Offener Wohn-, Ess- und Küchenbereich 48 m²"}},
      {"icon":"LuDot","value":"","label":{"sr":"Dva kupatila i garderoba","en":"Two bathrooms and a dressing room","ru":"Две ванные комнаты и гардеробная","de":"Zwei Badezimmer und ein Ankleidezimmer"}},
      {"icon":"LuDot","value":"","label":{"sr":"Natkrivena terasa 21 m²","en":"Covered terrace 21 m²","ru":"Крытая терраса 21 м²","de":"Überdachte Terrasse 21 m²"}},
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
      const filename = copyAsset(`src/assets/projects/${h.folder}/${file}`, `seed-${h.filePrefix}-${file}`);
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

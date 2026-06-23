// Multilingual content for the three offered houses (Kuća 1/2/3), taken from
// the official PDF floor plans. Single source of truth shared by prisma/seed.js
// (fresh installs) and scripts/import-houses.mjs (updating an existing DB).

const LOCALES = ['sr', 'en', 'ru', 'de'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Spread a { sr, en, ru, de } object into { baseSr, baseEn, baseRu, baseDe }.
export const loc = (base, obj) => {
  const out = {};
  for (const l of LOCALES) out[`${base}${cap(l)}`] = obj[l] ?? '';
  return out;
};

export const STAT_LABELS = {
  beds: { sr: 'Sobe', en: 'Bedrooms', ru: 'Спальни', de: 'Schlafzimmer' },
  baths: { sr: 'Kupatila', en: 'Bathrooms', ru: 'Ванные', de: 'Badezimmer' },
  terrace: { sr: 'Terasa', en: 'Terrace', ru: 'Терраса', de: 'Terrasse' },
  area: { sr: 'Površina', en: 'Area', ru: 'Площадь', de: 'Fläche' },
};

// Room-name translations, one entry per room type appearing in the plans.
const R = {
  hall: { sr: 'Ulazni hol', en: 'Entrance hall', ru: 'Входной холл', de: 'Eingangshalle' },
  hallway: { sr: 'Hodnik', en: 'Hallway', ru: 'Коридор', de: 'Flur' },
  living: {
    sr: 'Kuhinja, trpezarija i dnevni boravak',
    en: 'Kitchen, dining & living room',
    ru: 'Кухня, столовая и гостиная',
    de: 'Küche, Ess- und Wohnzimmer',
  },
  terrace: { sr: 'Terasa', en: 'Terrace', ru: 'Терраса', de: 'Terrasse' },
  bath: { sr: 'Kupatilo', en: 'Bathroom', ru: 'Ванная комната', de: 'Badezimmer' },
  utility: {
    sr: 'Tehnička prostorija',
    en: 'Utility room',
    ru: 'Техническое помещение',
    de: 'Hauswirtschaftsraum',
  },
  wardrobe: { sr: 'Garderoba', en: 'Dressing room', ru: 'Гардеробная', de: 'Ankleidezimmer' },
  room: { sr: 'Soba', en: 'Room', ru: 'Комната', de: 'Zimmer' },
};

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} m²`;
const rm = (key, area) => ({ name: R[key], area: fmt(area) });

const subtitle = {
  sr: 'Prizemna kuća',
  en: 'Single-storey house',
  ru: 'Одноэтажный дом',
  de: 'Einstöckiges Haus',
};
const badge = { sr: 'Dostupno', en: 'Available', ru: 'Доступно', de: 'Verfügbar' };

const title = (n, m2) => ({
  sr: `Kuća ${n} — Prizemna kuća ${m2} m²`,
  en: `House ${n} — Single-storey house ${m2} m²`,
  ru: `Дом ${n} — Одноэтажный дом ${m2} м²`,
  de: `Haus ${n} — Einstöckiges Haus ${m2} m²`,
});

const bullets = (living, terrace) => [
  {
    sr: `Kuhinja, trpezarija i dnevni boravak ${living} m²`,
    en: `Open-plan kitchen, dining & living ${living} m²`,
    ru: `Кухня, столовая и гостиная ${living} м²`,
    de: `Offener Wohn-, Ess- und Küchenbereich ${living} m²`,
  },
  {
    sr: 'Dva kupatila i garderoba',
    en: 'Two bathrooms and a dressing room',
    ru: 'Две ванные комнаты и гардеробная',
    de: 'Zwei Badezimmer und ein Ankleidezimmer',
  },
  {
    sr: `Natkrivena terasa ${terrace} m²`,
    en: `Covered terrace ${terrace} m²`,
    ru: `Крытая терраса ${terrace} м²`,
    de: `Überdachte Terrasse ${terrace} m²`,
  },
];

export const HOUSES = [
  {
    slug: 'kuca-1-prizemna-kuca-128-m2',
    filePrefix: 'project1',
    folder: 'project-1',
    cover: 'cover.webp',
    images: ['cover.webp', 'floorplan.webp', 'main.webp', 'render.webp', 'view-1.webp', 'view-2.webp', 'view-3.webp'],
    pin: { top: '34%', left: '72%' },
    totalAreaM2: 128.26,
    beds: 3,
    baths: 2,
    terraceText: '20 m²',
    areaText: '128 m²',
    title: title(1, 128),
    subtitle,
    badge,
    description: {
      sr: 'Prizemna porodična kuća površine 128 m² sa tri spavaće sobe, dva kupatila i garderobom. Prostran otvoreni prostor kuhinje, trpezarije i dnevnog boravka od 44 m² izlazi na natkrivenu terasu i uređeno dvorište. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.',
      en: 'A single-storey family house of 128 m² with three bedrooms, two bathrooms and a dressing room. A spacious open-plan kitchen, dining and living area of 44 m² opens onto a covered terrace and a landscaped yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.',
      ru: 'Одноэтажный семейный дом площадью 128 м² с тремя спальнями, двумя ванными комнатами и гардеробной. Просторная объединённая кухня-столовая-гостиная 44 м² выходит на крытую террасу и благоустроенный двор. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.',
      de: 'Einstöckiges Familienhaus mit 128 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der großzügige offene Wohn-, Ess- und Küchenbereich von 44 m² öffnet sich zur überdachten Terrasse und zum angelegten Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad.',
    },
    bullets: bullets(44, 20),
    rooms: [
      rm('hall', 6.53),
      rm('hallway', 6.72),
      rm('living', 43.81),
      rm('terrace', 20.06),
      rm('bath', 4.47),
      rm('utility', 4.36),
      rm('wardrobe', 4.95),
      rm('bath', 3.94),
      rm('room', 13.32),
      rm('room', 11.01),
      rm('room', 9.1),
    ],
  },
  {
    slug: 'kuca-2-prizemna-kuca-139-m2',
    filePrefix: 'project2',
    folder: 'project-2',
    cover: 'cover.webp',
    images: ['cover.webp', 'floorplan.webp', 'main.webp', 'render.webp', 'view-1.webp', 'view-2.webp', 'view-3.webp'],
    pin: { top: '40%', left: '43%' },
    totalAreaM2: 138.55,
    beds: 3,
    baths: 2,
    terraceText: '21 m²',
    areaText: '139 m²',
    title: title(2, 139),
    subtitle,
    badge,
    description: {
      sr: 'Prizemna porodična kuća površine 139 m² sa tri spavaće sobe, dva kupatila i garderobom. Centralni otvoreni prostor kuhinje, trpezarije i dnevnog boravka od 49 m² povezuje se sa natkrivenom terasom i dvorištem. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.',
      en: 'A single-storey family house of 139 m² with three bedrooms, two bathrooms and a dressing room. A central open-plan kitchen, dining and living area of 49 m² connects to a covered terrace and the yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.',
      ru: 'Одноэтажный семейный дом площадью 139 м² с тремя спальнями, двумя ванными комнатами и гардеробной. Центральная объединённая кухня-столовая-гостиная 49 м² соединяется с крытой террасой и двором. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.',
      de: 'Einstöckiges Familienhaus mit 139 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der zentrale offene Wohn-, Ess- und Küchenbereich von 49 m² verbindet sich mit der überdachten Terrasse und dem Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad.',
    },
    bullets: bullets(49, 21),
    rooms: [
      rm('hall', 6.53),
      rm('hallway', 6.72),
      rm('living', 48.66),
      rm('terrace', 20.75),
      rm('bath', 4.47),
      rm('utility', 4.36),
      rm('wardrobe', 4.95),
      rm('bath', 3.94),
      rm('room', 15.62),
      rm('room', 11.16),
      rm('room', 11.4),
    ],
  },
  {
    slug: 'kuca-3-prizemna-kuca-142-m2',
    filePrefix: 'small-houses',
    folder: 'small-houses',
    cover: 'cover.webp',
    images: ['cover.webp', 'floorplan.webp', 'main.webp', 'view-1.webp', 'view-2.webp', 'view-3.webp', 'view-4.webp', 'view-5.webp', 'view-6.webp'],
    pin: { top: '20%', left: '24%' },
    totalAreaM2: 141.78,
    beds: 3,
    baths: 2,
    terraceText: '21 m²',
    areaText: '142 m²',
    title: title(3, 142),
    subtitle,
    badge,
    description: {
      sr: 'Najprostranija prizemna kuća u kompleksu, površine 142 m², sa tri spavaće sobe, dva kupatila i garderobom. Dnevna zona kuhinje, trpezarije i dnevnog boravka od 48 m² otvara se na veliku terasu i dvorište. Deo zatvorenog kompleksa na Avali, 20 minuta od Beograda.',
      en: 'The most spacious single-storey house in the complex at 142 m², with three bedrooms, two bathrooms and a dressing room. The 48 m² open-plan kitchen, dining and living zone opens onto a large terrace and yard. Part of a gated complex on Mount Avala, 20 minutes from Belgrade.',
      ru: 'Самый просторный одноэтажный дом в комплексе, 142 м², с тремя спальнями, двумя ванными комнатами и гардеробной. Объединённая кухня-столовая-гостиная 48 м² открывается на большую террасу и двор. Часть закрытого комплекса на Авале, в 20 минутах от Белграда.',
      de: 'Das geräumigste einstöckige Haus der Anlage mit 142 m², drei Schlafzimmern, zwei Badezimmern und einem Ankleidezimmer. Der 48 m² große offene Wohn-, Ess- und Küchenbereich öffnet sich zu einer großen Terrasse und dem Garten. Teil einer geschlossenen Wohnanlage am Berg Avala, 20 Minuten von Belgrad.',
    },
    bullets: bullets(48, 21),
    rooms: [
      rm('hall', 6.68),
      rm('hallway', 7.79),
      rm('room', 11.75),
      rm('room', 10.92),
      rm('bath', 4.35),
      rm('bath', 5.28),
      rm('wardrobe', 6.38),
      rm('room', 14.63),
      rm('terrace', 20.97),
      rm('living', 48.07),
      rm('utility', 4.93),
    ],
  },
];

// Create the three projects (with images, highlights and rooms) for `prisma`.
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
    const stat = (icon, value, label) =>
      prisma.projectHighlight.create({
        data: { projectId: project.id, order: hOrder++, icon, value, ...loc('label', label) },
      });
    await stat('LuBed', String(h.beds), STAT_LABELS.beds);
    await stat('LuBath', String(h.baths), STAT_LABELS.baths);
    await stat('LuSunrise', h.terraceText, STAT_LABELS.terrace);
    await stat('LuMaximize2', h.areaText, STAT_LABELS.area);
    for (const b of h.bullets) {
      await prisma.projectHighlight.create({
        data: { projectId: project.id, order: hOrder++, icon: 'LuDot', value: '', ...loc('label', b) },
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

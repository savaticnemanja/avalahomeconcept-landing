import project1Main from '@/assets/projects/project1/main.webp';
import project1Render from '@/assets/projects/project1/render.webp';
import project1Spec1 from '@/assets/projects/project1/spec-1.webp';
import project1Spec2 from '@/assets/projects/project1/spec-2.webp';
import project1Spec3 from '@/assets/projects/project1/spec-3.webp';
import project2Main from '@/assets/projects/project2/main.webp';
import project2Render from '@/assets/projects/project2/render.webp';
import project2Spec1 from '@/assets/projects/project2/spec-1.webp';
import project2Spec2 from '@/assets/projects/project2/spec-2.webp';
import project2Spec3 from '@/assets/projects/project2/spec-3.webp';

export const projects = [
  {
    heroImage: project1Render,
    mainImage: project1Main,
    description: `Prostrana prizemna kuća od 139 metara kvadratnih. Ova moderno dizajnirana kuća ima i dva parking mesta i odvojenu namensku prostoriju pokraj bazena u koju možete smestiti letnju kuhinju. Čak tri prozračne i komforne sobe pozicionirane su tako da primaju dosta sunčeve svetlosti što će Vam svakog jutra uliti dodatno raspoloženje. Vrata velikog dnevnog boravka otvaraju se na terasu koja pruža veličanstven pogled na Avalaski toranj. Sa terase se stepenicama spuštate na uređenu stazu koja Vas vodi do bazena i plaže.`,
    showcaseImages: [project1Spec1, project1Spec2, project1Spec3],
    surfaceArea: 139,
    seoTitle: 'Projekat 1 — Prizemna kuća 139m²',
    seoDescription: 'Prostrana prizemna kuća od 139m² sa tri svetle sobe, bazenom i terasom sa pogledom na Avalski toranj. Zatvoren kompleks 20 min od Beograda.',
    netSurfaceArea: [
      { name: 'Predprostor', area: '10,00 m²' },
      { name: 'Tehnička prostorija', area: '3,00 m²' },
      { name: 'Toalet', area: '4,00 m²' },
      { name: 'Hodnik', area: '10,00 m²' },
      { name: 'Terasa', area: '11,00 m²' },
      { name: 'Soba 1', area: '15,00 m²' },
      { name: 'Soba 2', area: '12,00 m²' },
      { name: 'Soba 3', area: '12,00 m²' },
      { name: 'Kupatilo', area: '6,00 m²' },
      { name: 'Vešernica', area: '5,00 m²' },
      { name: 'Dnevni boravak', area: '22,00 m²' },
      { name: 'Kuhinja i trpezarija', area: '27,00 m²' },
    ],
  },
  {
    heroImage: project2Render,
    mainImage: project2Main,
    description: `Udobna porodična kuća od 147 m² okružena prirodom i prijatnim ambijentom. Zakoračite u prostran dnevni boravak sa velikim staklenim vratima koja gledaju na predivno zelenilo Avalske planine. Ova moderno koncipirana porodična kuća ima čak tri spavaće sobe, dva odvojena kupatila, džakuzi (opciono) i veliku trpezariju koja je povezana sa dnevnim boravkom.`,
    showcaseImages: [project2Spec1, project2Spec2, project2Spec3],
    surfaceArea: 147,
    seoTitle: 'Projekat 2 — Porodična kuća 147m²',
    seoDescription: 'Udobna porodična kuća od 147m² sa tri spavaće sobe, dva kupatila i opcionalnim džakuzijem, okružena zelenilom Avale.',
    netSurfaceArea: [
      { name: 'Predprostor', area: '4,00 m²' },
      { name: 'Hodnik', area: '10,00 m²' },
      { name: 'Toalet + vešeraj', area: '6,00 m²' },
      { name: 'Soba 1', area: '12,00 m²' },
      { name: 'Soba 2', area: '12,00 m²' },
      { name: 'Soba 3', area: '14,00 m²' },
      { name: 'Garderober', area: '8,00 m²' },
      { name: 'Kupatilo', area: '10,00 m²' },
      { name: 'Terasa', area: '18,00 m²' },
      { name: 'Otvoreni trem', area: '7,00 m²' },
      { name: 'Dnevni boravak', area: '31,00 m²' },
      { name: 'Kuhinja', area: '8,00 m²' },
      { name: 'Ostava', area: '3,00 m²' },
      { name: 'Tehnička prostorija', area: '4,00 m²' },
    ],
  },
];

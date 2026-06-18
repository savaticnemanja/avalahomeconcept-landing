import project1Main from '@/assets/projects/project-1/main.webp';
import project1Render from '@/assets/projects/project-1/render.webp';
import project1Plan from '@/assets/projects/project-1/plan-card.webp';
import project1Spec1 from '@/assets/projects/project-1/view-1.webp';
import project1Spec2 from '@/assets/projects/project-1/view-2.webp';
import project1Spec3 from '@/assets/projects/project-1/view-3.webp';
import project2Main from '@/assets/projects/project-2/main.webp';
import project2Render from '@/assets/projects/project-2/render.webp';
import project2Plan from '@/assets/projects/project-2/plan-card.webp';
import project2Spec1 from '@/assets/projects/project-2/view-1.webp';
import project2Spec2 from '@/assets/projects/project-2/view-2.webp';
import project2Spec3 from '@/assets/projects/project-2/view-3.webp';
import smallHousesMain from '@/assets/projects/small-houses/main.webp';
import smallHousesInfo1 from '@/assets/projects/small-houses/info-1.webp';
import smallHousesInfo2 from '@/assets/projects/small-houses/info-2.webp';
import smallHousesView1 from '@/assets/projects/small-houses/view-1.webp';
import smallHousesView2 from '@/assets/projects/small-houses/view-2.webp';
import smallHousesView3 from '@/assets/projects/small-houses/view-3.webp';
import smallHousesView4 from '@/assets/projects/small-houses/view-4.webp';
import smallHousesView5 from '@/assets/projects/small-houses/view-5.webp';
import smallHousesView6 from '@/assets/projects/small-houses/view-6.webp';

export const projects = [
  {
    key: 'project1',
    dictKey: 'project1',
    cardIndex: 0,
    area: '139',
    beds: 3,
    terrace: '11m²',
    pin: { top: '34%', left: '72%' },

    cardImage: project1Plan,
    heroImage: project1Render,
    mainImage: project1Main,
    planImage: project1Plan,
    showcaseImages: [project1Spec1, project1Spec2, project1Spec3],
    renderImages: [project1Render, project1Spec1, project1Spec2, project1Spec3],
    surfaceArea: 139,
    netAreas: [
      '10,00 m²',
      '3,00 m²',
      '4,00 m²',
      '10,00 m²',
      '11,00 m²',
      '15,00 m²',
      '12,00 m²',
      '12,00 m²',
      '6,00 m²',
      '5,00 m²',
      '22,00 m²',
      '27,00 m²',
    ],
  },
  {
    key: 'project2',
    dictKey: 'project2',
    cardIndex: 1,
    area: '147',
    beds: 3,
    terrace: '18m²',
    pin: { top: '40%', left: '43%' },

    cardImage: project2Plan,
    heroImage: project2Render,
    mainImage: project2Main,
    planImage: project2Plan,
    showcaseImages: [project2Spec1, project2Spec2, project2Spec3],
    renderImages: [project2Render, project2Spec1, project2Spec2, project2Spec3],
    surfaceArea: 147,
    netAreas: [
      '4,00 m²',
      '10,00 m²',
      '6,00 m²',
      '12,00 m²',
      '12,00 m²',
      '14,00 m²',
      '8,00 m²',
      '10,00 m²',
      '18,00 m²',
      '7,00 m²',
      '31,00 m²',
      '8,00 m²',
      '3,00 m²',
      '4,00 m²',
    ],
  },
  {
    key: 'smallHouses',
    dictKey: 'smallHouses',
    cardIndex: 2,
    area: '80–100',
    beds: 2,
    terrace: null,
    pin: { top: '20%', left: '24%' },

    cardImage: smallHousesMain,
    heroImage: smallHousesMain,
    mainImage: smallHousesInfo1,
    planImage: smallHousesInfo1,
    showcaseImages: [smallHousesInfo2, smallHousesView1, smallHousesView2],
    renderImages: [
      smallHousesMain,
      smallHousesInfo1,
      smallHousesInfo2,
      smallHousesView1,
      smallHousesView2,
      smallHousesView3,
      smallHousesView4,
      smallHousesView5,
      smallHousesView6,
    ],
    surfaceArea: null,
    netAreas: null,
  },
];

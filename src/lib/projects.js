import project1Main from '@/assets/projects/project-1/main.webp';
import project1Render from '@/assets/projects/project-1/render.webp';
import project1Spec1 from '@/assets/projects/project-1/view-1.webp';
import project1Spec2 from '@/assets/projects/project-1/view-2.webp';
import project1Spec3 from '@/assets/projects/project-1/view-3.webp';
import project2Main from '@/assets/projects/project-2/main.webp';
import project2Render from '@/assets/projects/project-2/render.webp';
import project2Spec1 from '@/assets/projects/project-2/view-1.webp';
import project2Spec2 from '@/assets/projects/project-2/view-2.webp';
import project2Spec3 from '@/assets/projects/project-2/view-3.webp';

// Images + language-neutral values. Human-readable text (description, room
// names, SEO strings) lives in dict.projects.project1 / project2.
export const projects = [
  {
    key: 'project1',
    heroImage: project1Render,
    mainImage: project1Main,
    showcaseImages: [project1Spec1, project1Spec2, project1Spec3],
    surfaceArea: 139,
    // areas align by index with dict.projects.project1.rooms
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
    heroImage: project2Render,
    mainImage: project2Main,
    showcaseImages: [project2Spec1, project2Spec2, project2Spec3],
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
];

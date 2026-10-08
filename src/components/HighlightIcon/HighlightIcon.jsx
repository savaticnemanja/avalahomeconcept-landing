import {
  LuBath,
  LuBed,
  LuCar,
  LuDot,
  LuFlame,
  LuHouse,
  LuKey,
  LuMaximize2,
  LuRuler,
  LuSnowflake,
  LuSofa,
  LuStar,
  LuSunrise,
  LuTrees,
  LuUtensils,
  LuWaves,
} from 'react-icons/lu';

// Highlight icons are stored by name in the DB. Map only the names the admin
// can pick (HIGHLIGHT_ICONS in src/lib/admin/constants.js) — importing the
// whole `react-icons/lu` namespace ships ~700 KB of icons to every page.
// Keep this map in sync when adding an icon to the admin picker.
const ICONS = {
  LuBath,
  LuBed,
  LuCar,
  LuDot,
  LuFlame,
  LuHouse,
  LuKey,
  LuMaximize2,
  LuRuler,
  LuSnowflake,
  LuSofa,
  LuStar,
  LuSunrise,
  LuTrees,
  LuUtensils,
  LuWaves,
};

export const HighlightIcon = ({ name, className }) => {
  const Cmp = ICONS[name] ?? LuDot;
  return <Cmp className={className} />;
};

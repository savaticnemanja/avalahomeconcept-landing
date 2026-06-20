'use client';

// Simple SVG donut chart with legend
export const DonutChart = ({ data, colors }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const COLORS = colors || [
    '#C4975A', '#8B7B5C', '#A98B5F', '#B8956A', '#9B8767',
    '#7A6E5D', '#C9A878', '#B39F75', '#A39170', '#938A72'
  ];

  let currentAngle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const sliceAngle = (d.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const r = 60;
    const x1 = 100 + r * Math.cos(startAngle);
    const y1 = 100 + r * Math.sin(startAngle);
    const x2 = 100 + r * Math.cos(endAngle);
    const y2 = 100 + r * Math.sin(endAngle);

    const largeArc = sliceAngle > Math.PI ? 1 : 0;
    const path = `M 100 100 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const midAngle = startAngle + sliceAngle / 2;
    const labelR = r * 0.65;
    const lx = 100 + labelR * Math.cos(midAngle);
    const ly = 100 + labelR * Math.sin(midAngle);
    const pct = ((d.value / total) * 100).toFixed(0);

    return { path, x: lx, y: ly, pct, color: COLORS[i % COLORS.length], label: d.label, value: d.value };
  });

  return (
    <div className="flex gap-6">
      <svg viewBox="0 0 200 200" className="w-40 h-40 flex-shrink-0">
        {slices.map((s, i) => (
          <g key={i}>
            <path d={s.path} fill={s.color} opacity="0.9" />
            {s.pct !== '0' && (
              <text
                x={s.x}
                y={s.y}
                textAnchor="middle"
                dy="0.3em"
                className="text-[10px] font-bold text-white pointer-events-none"
              >
                {s.pct}%
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="flex flex-col gap-2 justify-center flex-1 min-w-0">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 flex-shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-text truncate">{s.label}</span>
            <span className="text-text-muted flex-shrink-0 ml-auto tabular-nums">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

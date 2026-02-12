export default function Logo({ width = 240, height = 80, className = "" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Deep Navy Background Circle */}
      <circle cx="60" cy="60" r="45" fill="#1a2f4a" opacity="0.1" />

      {/* Icon: Financial Growth Chart */}
      <g transform="translate(30, 30)">
        {/* Emerald Base Line */}
        <line
          x1="10"
          y1="50"
          x2="70"
          y2="50"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Electric Blue Rising Bars */}
        <rect x="15" y="42" width="8" height="8" rx="2" fill="#3b82f6" />
        <rect x="28" y="35" width="8" height="15" rx="2" fill="#3b82f6" />
        <rect x="41" y="25" width="8" height="25" rx="2" fill="#10b981" />
        <rect x="54" y="15" width="8" height="35" rx="2" fill="#10b981" />

        {/* Deep Navy Trend Line */}
        <path
          d="M 19 46 L 32 39 L 45 29 L 58 19"
          stroke="#1a2f4a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Electric Blue Accent Dot */}
        <circle cx="58" cy="19" r="3.5" fill="#3b82f6" />
      </g>

      {/* Text: FINTRACK */}
      <text
        x="110"
        y="70"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="42"
        fontWeight="700"
        fill="#1a2f4a"
      >
        FIN
        <tspan fill="#10b981">TRACK</tspan>
      </text>

      {/* Tagline */}
      <text
        x="112"
        y="88"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="11"
        fontWeight="400"
        fill="#64748b"
        letterSpacing="0.5"
      >
        SMART EXPENSE ANALYTICS
      </text>
    </svg>
  );
}

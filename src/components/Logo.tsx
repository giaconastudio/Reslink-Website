// SVG recreation of the Reslink logo — paper plane + RESLINK wordmark
export default function Logo({ dark = true, height = 32 }: { dark?: boolean; height?: number }) {
  const color = dark ? '#061A3A' : '#ffffff';
  return (
    <svg height={height} viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paper plane icon */}
      <g transform="translate(0, 4)">
        <path
          d="M2 14L28 2L20 28L14 18L2 14Z"
          fill={color}
          opacity="0.9"
        />
        <path
          d="M14 18L20 28L28 2"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="2" y1="14" x2="20" y2="12" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </g>
      {/* RESLINK wordmark */}
      <text
        x="38"
        y="27"
        fontFamily="var(--font-phudu), 'Arial Black', sans-serif"
        fontWeight="800"
        fontSize="22"
        fill={color}
        letterSpacing="-0.5"
      >
        RESLINK
      </text>
    </svg>
  );
}

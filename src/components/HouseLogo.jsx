export default function HouseLogo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 48 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Chimney */}
      <rect x="30" y="4" width="7" height="16" rx="1" fill="currentColor" opacity="0.5" />
      {/* Roof */}
      <path d="M4 30L24 10L44 30H4Z" fill="currentColor" />
      {/* Body */}
      <rect x="8" y="30" width="32" height="34" rx="1" fill="currentColor" opacity="0.85" />
      {/* Door */}
      <rect x="19" y="46" width="10" height="18" rx="1" fill="white" opacity="0.3" />
      {/* Left window */}
      <rect x="11" y="36" width="9" height="8" rx="1" fill="white" opacity="0.3" />
      {/* Right window */}
      <rect x="28" y="36" width="9" height="8" rx="1" fill="white" opacity="0.3" />
    </svg>
  )
}

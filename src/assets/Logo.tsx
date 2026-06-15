import React from "react";

interface LogoProps {
  scale: number;
}

export const Logo: React.FC<LogoProps> = ({ scale }) => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${scale})`, opacity: scale }}
    >
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" stroke="#6366f1" strokeWidth="2" />
      {/* Inner diamond */}
      <rect
        x="60"
        y="20"
        width="56.57"
        height="56.57"
        rx="4"
        fill="#818cf8"
        transform="rotate(45 60 20)"
        opacity={0.8}
      />
      {/* Center dot */}
      <circle cx="60" cy="60" r="8" fill="#c7d2fe" />
    </svg>
  );
};
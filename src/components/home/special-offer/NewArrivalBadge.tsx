// components/NewArrivalBadge.tsx
import React from "react";

type Props = {
  /** width in pixels or CSS string (keeps aspect ratio) */
  width?: number | string;
  className?: string;
  ariaLabel?: string;
};

export default function NewArrivalBadge({
  width = 140,
  className = "",
  ariaLabel = "New arrival badge",
}: Props) {
  return (
    <div
      className={`inline-block ${className}`}
      role='img'
      aria-label={ariaLabel}>
      <svg
        width={width}
        viewBox='0 0 120 140'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid meet'>
        <defs>
          <linearGradient id='grad-red' x1='0' x2='0' y1='0' y2='1'>
            <stop offset='0' stopColor='#ff4d4d' />
            <stop offset='1' stopColor='#d90000' />
          </linearGradient>

          {/* soft drop shadow */}
          <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'>
            <feDropShadow
              dx='0'
              dy='6'
              stdDeviation='6'
              floodColor='#000'
              floodOpacity='0.25'
            />
          </filter>
        </defs>

        {/* main shape (rounded rect with center tail) + shadow */}
        <g filter='url(#shadow)'>
          <path
            d='M12 0 H108 A12 12 0 0 1 120 12 V84 A12 12 0 0 1 108 96 H68 L60 132 L52 96 H12 A12 12 0 0 1 0 84 V12 A12 12 0 0 1 12 0 Z'
            fill='url(#grad-red)'
          />
          {/* subtle glossy highlight at the top */}
          <path
            d='M12 0 H108 A12 12 0 0 1 120 12 V48 H0 V12 A12 12 0 0 1 12 0 Z'
            fill='#fff'
            opacity='0.12'
          />
        </g>

        {/* Text (two lines) — tweak font-size/weight to fine tune */}
        <text
          x='50%'
          y='46'
          textAnchor='middle'
          fill='#fff'
          fontWeight={800}
          fontSize={14}
          fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
          style={{ letterSpacing: "0.06em" }}>
          NEW
        </text>

        <text
          x='50%'
          y='76'
          textAnchor='middle'
          fill='#fff'
          fontWeight={800}
          fontSize={14}
          fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
          style={{ letterSpacing: "0.06em" }}>
          ARRIVAL
        </text>
      </svg>
    </div>
  );
}

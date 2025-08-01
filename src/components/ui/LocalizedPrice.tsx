// components/LocalizedPrice.tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  value: number;
  className?: string;
}

export default function LocalizedPrice({ value, className }: Props) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    const formattedValue =
      new Intl.NumberFormat("fa-IR", {
        maximumFractionDigits: 0,
      }).format(value) + " تومان";
    setFormatted(formattedValue);
  }, [value]);

  return <span className={className}>{formatted}</span>;
}

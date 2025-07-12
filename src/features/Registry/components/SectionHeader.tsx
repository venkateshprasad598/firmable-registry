import React from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className = "" }) => (
  <p className={`text-3xl font-semibold tracking-tight text-gray-800 mb-5 ${className}`}>
    {title}
  </p>
);


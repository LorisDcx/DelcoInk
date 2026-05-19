import React from 'react';

interface SectionDividerProps {
  color?: string;
}

export default function SectionDivider({ 
  color = '#abc9b6'
}: SectionDividerProps) {
  return (
    <div 
      className="w-120 h-px mx-auto"
      style={{ 
        background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
        boxShadow: `0 0 4px ${color}40`
      }}
    />
  );
}

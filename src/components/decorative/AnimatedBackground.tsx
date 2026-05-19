import React from 'react';

interface AnimatedBackgroundProps {
  type?: 'cloud' | 'grain' | 'wave';
  opacity?: number;
  color1?: string;
  color2?: string;
  duration?: number;
  zIndex?: number;
}

export default function AnimatedBackground({
  type = 'cloud',
  opacity = 0.1,
  color1 = '#2d6a4f',
  color2 = '#855485',
  duration = 20,
  zIndex = -10
}: AnimatedBackgroundProps) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex
  };

  if (type === 'cloud') {
    return (
      <div 
        style={{
          ...baseStyle,
          background: `linear-gradient(45deg, rgba(45, 106, 79, ${opacity * 0.8}) 0%, rgba(133, 84, 133, ${opacity * 0.8}) 50%, rgba(45, 106, 79, ${opacity * 0.8}) 100%)`,
          backgroundSize: '200% 200%',
          animation: `cloudMove ${duration}s ease-in-out infinite`,
          mixBlendMode: 'overlay',
          filter: 'blur(60px)'
        }}
      />
    );
  }

  if (type === 'grain') {
    return (
      <div style={baseStyle}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity,
            mixBlendMode: 'overlay'
          }}
        />
      </div>
    );
  }

  if (type === 'wave') {
    return (
      <div style={baseStyle}>
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `conic-gradient(from 0deg at 50% 50%, rgba(45, 106, 79, ${opacity * 0.5}) 0deg, rgba(133, 84, 133, ${opacity * 0.5}) 90deg, rgba(45, 106, 79, ${opacity * 0.5}) 180deg, rgba(133, 84, 133, ${opacity * 0.5}) 270deg, rgba(45, 106, 79, ${opacity * 0.5}) 360deg)`,
            animation: `rotate ${duration}s linear infinite`,
            mixBlendMode: 'overlay',
            filter: 'blur(30px)'
          }}
        />
      </div>
    );
  }

  return null;
}

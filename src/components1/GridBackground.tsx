
import React from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
}

const GridBackground = ({ children }: GridBackgroundProps) => {
  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(107,114,128,0.5) 2px, transparent 2px),
            linear-gradient(90deg, rgba(107,114,128,0.5) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 35%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 35%, transparent 100%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GridBackground;

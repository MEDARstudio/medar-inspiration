import React from 'react';

interface ProjectVisualProps {
  type: 'kinetic' | 'editorial' | 'sound' | 'pavilion' | 'monolith' | 'protocol';
  className?: string;
  isHovered?: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  type,
  className = '',
  isHovered = false,
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center transition-all duration-700 select-none ${className}`}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #333333 1px, transparent 1px), linear-gradient(to bottom, #333333 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Dynamic Red Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-30' : 'opacity-10'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 50%, #FF1E1E 0%, transparent 65%)',
        }}
      />

      {/* Project specific procedural rendering */}
      {type === 'kinetic' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full p-6 text-white transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
        >
          {/* Concentric club radar */}
          <circle cx="200" cy="150" r="110" fill="none" stroke="#222" strokeWidth="1" />
          <circle cx="200" cy="150" r="80" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="150" r="50" fill="none" stroke="#FF1E1E" strokeWidth="1.5" className={isHovered ? 'animate-pulse' : ''} />
          <circle cx="200" cy="150" r="20" fill="#FF1E1E" />
          {/* Crosshairs */}
          <line x1="200" y1="20" x2="200" y2="280" stroke="#444" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="40" y1="150" x2="360" y2="150" stroke="#444" strokeWidth="1" strokeDasharray="2 4" />
          {/* Laser sweeps */}
          <line
            x1="200"
            y1="150"
            x2="320"
            y2="70"
            stroke="#FF1E1E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="320" cy="70" r="4" fill="#FFFFFF" />
          {/* Audio reactive bars */}
          {[40, 75, 110, 145, 180, 215, 250, 285, 320, 355].map((x, i) => {
            const h = 15 + Math.sin(i * 1.2) * 25 + (isHovered ? Math.cos(i) * 15 : 0);
            return (
              <rect
                key={i}
                x={x}
                y={250 - h}
                width="6"
                height={h}
                fill={i % 3 === 0 ? '#FF1E1E' : '#FFFFFF'}
                opacity={0.8}
                rx="1"
              />
            );
          })}
          <text x="30" y="45" fill="#888" fontSize="10" fontFamily="Space Mono">
            BPM // 138.4 · KINETIC
          </text>
        </svg>
      )}

      {type === 'editorial' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full p-6 text-white transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
        >
          {/* Haute couture drape silhouette */}
          <path
            d="M 120 40 Q 200 120 280 40 L 320 260 Q 200 230 80 260 Z"
            fill="#121212"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Crimson tension cord */}
          <path
            d="M 120 40 Q 230 180 320 260"
            fill="none"
            stroke="#FF1E1E"
            strokeWidth="2.5"
          />
          <path
            d="M 280 40 Q 170 180 80 260"
            fill="none"
            stroke="#FF1E1E"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="200" cy="150" r="6" fill="#FF1E1E" />
          {/* Measurement labels */}
          <text x="50" y="275" fill="#888" fontSize="10" fontFamily="Space Mono">
            DRAPE // OBSIDIAN SILK
          </text>
          <text x="300" y="275" fill="#FF1E1E" fontSize="10" fontFamily="Space Mono">
            002 // FR
          </text>
        </svg>
      )}

      {type === 'sound' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full p-6 text-white transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
        >
          {/* Synthesizer grid & oscilloscope */}
          <rect x="40" y="50" width="320" height="200" rx="4" fill="#0E0E0E" stroke="#2B2B2B" strokeWidth="1.5" />
          {/* Waveform */}
          <path
            d="M 50 150 Q 90 70 130 150 T 210 150 T 290 150 T 350 150"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <path
            d="M 50 150 Q 110 30 170 150 T 290 150 T 350 150"
            fill="none"
            stroke="#FF1E1E"
            strokeWidth="2"
            opacity={0.8}
          />
          {/* Hardware potentiometers */}
          {[90, 160, 230, 300].map((cx, idx) => (
            <g key={idx}>
              <circle cx={cx} cy="90" r="14" fill="#1A1A1A" stroke="#444" strokeWidth="1" />
              <line
                x1={cx}
                y1="90"
                x2={cx + Math.cos(idx * 1.5) * 12}
                y2={90 + Math.sin(idx * 1.5) * 12}
                stroke="#FF1E1E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ))}
          <text x="55" y="235" fill="#888" fontSize="10" fontFamily="Space Mono">
            FREQ // 432 Hz · MONOLITH
          </text>
        </svg>
      )}

      {type === 'pavilion' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full p-6 text-white transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
        >
          {/* Isometric architectural pavilion */}
          <polygon points="200,60 330,120 200,180 70,120" fill="#141414" stroke="#444" strokeWidth="1.5" />
          <polygon points="70,120 200,180 200,240 70,180" fill="#1A1A1A" stroke="#555" strokeWidth="1.5" />
          <polygon points="330,120 200,180 200,240 330,180" fill="#0D0D0D" stroke="#444" strokeWidth="1.5" />
          {/* Red laser light cut */}
          <line x1="200" y1="60" x2="200" y2="240" stroke="#FF1E1E" strokeWidth="2.5" />
          <line x1="135" y1="90" x2="265" y2="150" stroke="#FF1E1E" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="200" cy="180" r="5" fill="#FF1E1E" />
          <text x="35" y="270" fill="#888" fontSize="10" fontFamily="Space Mono">
            SPATIAL // CONCRETE 04
          </text>
        </svg>
      )}

      {type === 'monolith' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full p-6 text-white transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
        >
          {/* Aerodynamic hypercar silhouette lines */}
          <path
            d="M 50 190 C 100 190 140 140 220 135 C 290 130 330 160 360 170"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 60 195 L 350 185"
            fill="none"
            stroke="#FF1E1E"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Aerodynamic diffuser */}
          <line x1="120" y1="210" x2="160" y2="210" stroke="#555" strokeWidth="4" />
          <line x1="260" y1="210" x2="300" y2="210" stroke="#555" strokeWidth="4" />
          <circle cx="140" cy="210" r="16" fill="none" stroke="#FF1E1E" strokeWidth="2" />
          <circle cx="280" cy="210" r="16" fill="none" stroke="#FF1E1E" strokeWidth="2" />
          <text x="45" y="60" fill="#888" fontSize="10" fontFamily="Space Mono">
            AERODYNAMICS // SPECTRE GT
          </text>
        </svg>
      )}

      {type === 'protocol' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full p-6 text-white transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
        >
          {/* Constructivist poster layout */}
          <line x1="40" y1="40" x2="360" y2="260" stroke="#FF1E1E" strokeWidth="4" />
          <rect x="70" y="60" width="120" height="120" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <text x="85" y="145" fill="#FFFFFF" fontSize="64" fontWeight="bold" fontFamily="Syne">
            00
          </text>
          <circle cx="280" cy="180" r="45" fill="#FF1E1E" opacity={0.9} />
          <text x="245" y="190" fill="#000000" fontSize="16" fontWeight="bold" fontFamily="Space Mono">
            MEDAR
          </text>
          <text x="40" y="280" fill="#888" fontSize="10" fontFamily="Space Mono">
            PROTOCOLE // GEN-TYPE
          </text>
        </svg>
      )}

      {/* Subtle corner ticks */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/40" />
      <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/40" />
      <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/40" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/40" />
    </div>
  );
};

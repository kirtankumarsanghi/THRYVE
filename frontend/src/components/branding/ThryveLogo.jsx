export default function ThryveLogo({ size = "md", showText = true, className = "" }) {
  const sizeMap = {
    sm: { box: "w-10 h-10", text: "text-lg", icon: 16 },
    md: { box: "w-12 h-12", text: "text-xl", icon: 20 },
    lg: { box: "w-16 h-16", text: "text-3xl", icon: 28 },
  };
  const selected = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* 3D Animated Logo */}
      <div className={`${selected.box} relative perspective-1000`}>
        {/* Multi-layer glow effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500 via-pink-500 to-rose-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-50 transition-opacity duration-700 animate-pulse-slower" />
        
        {/* Main 3D logo container */}
        <div className="relative w-full h-full preserve-3d group-hover:rotate-y-12 transition-transform duration-700">
          {/* Back layer for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl transform translate-z-[-4px] opacity-60" />
          
          {/* Middle layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl transform translate-z-[-2px] opacity-80" />
          
          {/* Front layer */}
          <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl shadow-2xl shadow-blue-500/50 group-hover:shadow-cyan-400/70 transition-all duration-500 overflow-hidden transform translate-z-0">
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
            
            {/* Rotating background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent animate-spin-slow" />
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            </div>
            
            {/* Particle effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-float-1 opacity-60" />
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-float-2 opacity-60" />
              <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-float-3 opacity-80" />
            </div>
            
            {/* Enhanced T icon with 3D effect */}
            <svg 
              viewBox="0 0 40 40" 
              className="relative z-10 w-full h-full p-2 group-hover:scale-110 transition-transform duration-500"
              fill="none"
            >
              {/* Shadow layer */}
              <g opacity="0.3" transform="translate(1, 1)">
                <path 
                  d="M8 10 L32 10 M20 10 L20 32" 
                  stroke="#000" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </g>
              
              {/* Main T with gradient */}
              <defs>
                <linearGradient id="tGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.8)" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <path 
                d="M8 10 L32 10 M20 10 L20 32" 
                stroke="url(#tGradient)" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                filter="url(#glow)"
                className="drop-shadow-2xl"
              />
              
              {/* Animated growth arrow */}
              <g className="animate-bounce-subtle">
                <path 
                  d="M20 18 L26 12 M26 12 L26 16 M26 12 L22 12" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="opacity-95 drop-shadow-lg"
                  filter="url(#glow)"
                />
              </g>
              
              {/* Pulsing accent dots */}
              <circle cx="14" cy="26" r="1.5" fill="white" className="opacity-90 animate-pulse-slow" />
              <circle cx="26" cy="26" r="1.5" fill="white" className="opacity-90 animate-pulse-slower" />
              
              {/* Sparkle effects */}
              <g className="animate-twinkle">
                <path d="M10 14 L10 16 M9 15 L11 15" stroke="white" strokeWidth="0.5" opacity="0.8" />
                <path d="M30 28 L30 30 M29 29 L31 29" stroke="white" strokeWidth="0.5" opacity="0.8" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${selected.text} font-black tracking-tight leading-none relative`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 drop-shadow-sm animate-gradient-x">
              THRYVE
            </span>
            {/* Text glow effect */}
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 blur-sm opacity-50 animate-gradient-x">
              THRYVE
            </span>
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-300/70 uppercase">
            Performance
          </span>
        </div>
      )}

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, -5px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-3px, 5px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(2px, -3px); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.5; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes rotate-y-12 {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(12deg); }
        }
        .animate-float-1 { animation: float-1 3s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 4s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 5s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-gradient-x { 
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite; 
        }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-12 { transform: rotateY(12deg); }
        .translate-z-0 { transform: translateZ(0); }
        .translate-z-\[-2px\] { transform: translateZ(-2px); }
        .translate-z-\[-4px\] { transform: translateZ(-4px); }
      `}</style>
    </div>
  );
}

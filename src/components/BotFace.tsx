import { useEffect, useState } from 'react';

interface BotFaceProps {
  isSpeaking: boolean;
  isThinking: boolean;
}

export default function BotFace({ isSpeaking, isThinking }: BotFaceProps) {
  const [blinkState, setBlinkState] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(0);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Speaking mouth animation
  useEffect(() => {
    if (isSpeaking) {
      const speakInterval = setInterval(() => {
        setMouthOpen(Math.random());
      }, 100);
      return () => clearInterval(speakInterval);
    } else {
      setMouthOpen(0);
    }
  }, [isSpeaking]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Status indicator */}
      <div className="absolute -top-2 -right-2 md:top-0 md:right-0 flex items-center gap-2 px-2 md:px-3 py-1 rounded-full bg-black/50 border border-cyan-500/30">
        <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-yellow-400 animate-pulse' : isSpeaking ? 'bg-pink-500 animate-pulse' : 'bg-cyan-400'}`} />
        <span className="text-[10px] md:text-xs text-cyan-400">
          {isThinking ? 'Thinking...' : isSpeaking ? 'Speaking' : 'Listening'}
        </span>
      </div>

      {/* Bot head container */}
      <div className="relative w-full max-w-[200px] md:max-w-[280px] aspect-square">
        {/* Glow effect behind head */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 via-pink-500/20 to-yellow-500/30 blur-3xl" />

        {/* Main face SVG */}
        <svg viewBox="0 0 200 200" className="relative z-10 w-full h-full">
          <defs>
            {/* Gradient for head */}
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="50%" stopColor="#2a2a4e" />
              <stop offset="100%" stopColor="#1a1a2e" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Eye glow */}
            <filter id="eyeGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Head outer ring */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="url(#headGradient)" strokeWidth="4" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="#00fff0" strokeWidth="1" opacity="0.3" />

          {/* Head fill */}
          <circle cx="100" cy="100" r="85" fill="url(#headGradient)" />

          {/* Decorative circuit lines */}
          <path d="M30 100 L50 100 L60 90" stroke="#00fff0" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M170 100 L150 100 L140 90" stroke="#00fff0" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M100 30 L100 50 L110 60" stroke="#ff00aa" strokeWidth="1" fill="none" opacity="0.3" />

          {/* Antenna */}
          <line x1="100" y1="10" x2="100" y2="30" stroke="#00fff0" strokeWidth="2" filter="url(#glow)" />
          <circle cx="100" cy="8" r="4" fill={isThinking ? '#ffd700' : '#00fff0'} filter="url(#glow)">
            {isThinking && (
              <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
            )}
          </circle>

          {/* Eyes background */}
          <ellipse cx="65" cy="85" rx="22" ry={blinkState ? 2 : 18} fill="#0a0a12" />
          <ellipse cx="135" cy="85" rx="22" ry={blinkState ? 2 : 18} fill="#0a0a12" />

          {/* Eye glow rings */}
          <ellipse cx="65" cy="85" rx="22" ry={blinkState ? 2 : 18} fill="none" stroke="#00fff0" strokeWidth="2" filter="url(#eyeGlow)" />
          <ellipse cx="135" cy="85" rx="22" ry={blinkState ? 2 : 18} fill="none" stroke="#00fff0" strokeWidth="2" filter="url(#eyeGlow)" />

          {/* Eye pupils */}
          {!blinkState && (
            <>
              <circle cx="65" cy="85" r="8" fill="#00fff0" filter="url(#eyeGlow)">
                {isThinking && (
                  <animate attributeName="cx" values="60;70;60" dur="1s" repeatCount="indefinite" />
                )}
              </circle>
              <circle cx="135" cy="85" r="8" fill="#00fff0" filter="url(#eyeGlow)">
                {isThinking && (
                  <animate attributeName="cx" values="130;140;130" dur="1s" repeatCount="indefinite" />
                )}
              </circle>
              {/* Eye highlights */}
              <circle cx="68" cy="82" r="3" fill="white" opacity="0.8" />
              <circle cx="138" cy="82" r="3" fill="white" opacity="0.8" />
            </>
          )}

          {/* Nose indicator */}
          <polygon points="100,105 95,115 105,115" fill="#ff00aa" opacity="0.5" />

          {/* Mouth */}
          <path
            d={isSpeaking
              ? `M 70 140 Q 100 ${155 + mouthOpen * 15} 130 140`
              : 'M 70 140 Q 100 150 130 140'
            }
            stroke="#ff00aa"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
            strokeLinecap="round"
          />

          {/* Speaking visualization bars */}
          {isSpeaking && (
            <g transform="translate(100, 160)">
              {[-20, -10, 0, 10, 20].map((x, i) => (
                <rect
                  key={i}
                  x={x - 2}
                  y={-10}
                  width="4"
                  height={10 + Math.sin(Date.now() / 100 + i) * 5 + mouthOpen * 10}
                  fill="#ff00aa"
                  opacity="0.6"
                >
                  <animate
                    attributeName="height"
                    values={`${5 + i * 2};${15 + i * 3};${5 + i * 2}`}
                    dur={`${0.2 + i * 0.05}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          )}

          {/* Cheek indicators */}
          <circle cx="40" cy="110" r="8" fill="#ff00aa" opacity={isSpeaking ? 0.4 : 0.2}>
            {isSpeaking && (
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="0.5s" repeatCount="indefinite" />
            )}
          </circle>
          <circle cx="160" cy="110" r="8" fill="#ff00aa" opacity={isSpeaking ? 0.4 : 0.2}>
            {isSpeaking && (
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="0.5s" repeatCount="indefinite" />
            )}
          </circle>
        </svg>
      </div>

      {/* Bot name */}
      <div className="mt-2 md:mt-4 text-center">
        <h2 className="font-display text-lg md:text-xl font-bold text-cyan-400 tracking-wider">SYNTHIA</h2>
        <p className="text-[10px] md:text-xs text-pink-400/60 tracking-[0.15em] md:tracking-[0.2em]">NEURAL MUSIC ENGINE v3.0</p>
      </div>

      {/* Thinking indicator */}
      {isThinking && (
        <div className="mt-3 md:mt-4 flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-yellow-400"
                style={{
                  animation: 'bounce 0.6s infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-yellow-400">Processing...</span>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

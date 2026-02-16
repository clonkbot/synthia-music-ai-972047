import { useState, useEffect } from 'react';
import type { Song } from '../App';

interface MusicPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

export default function MusicPlayer({ song, isPlaying, onPlayPause, songs, onSelectSong }: MusicPlayerProps) {
  const [progress, setProgress] = useState(0);
  const [animatedWaveform, setAnimatedWaveform] = useState<number[]>([]);

  useEffect(() => {
    if (song) {
      setAnimatedWaveform(song.waveform);
    }
  }, [song]);

  useEffect(() => {
    if (isPlaying && song) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 0.5;
        });
        setAnimatedWaveform((prev) =>
          prev.map((v) => Math.max(0.2, Math.min(1, v + (Math.random() - 0.5) * 0.2)))
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, song]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!song && songs.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-yellow-500/20 backdrop-blur-xl">
        <div className="flex flex-col items-center justify-center py-6 md:py-8 text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-yellow-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <p className="text-sm md:text-base text-yellow-400/60">No songs yet</p>
          <p className="text-[10px] md:text-xs text-yellow-400/40 mt-1">Generate your first track above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-yellow-500/20 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
          <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-white text-sm md:text-base">Music Player</h3>
          <p className="text-[10px] md:text-xs text-yellow-400/60">{songs.length} track{songs.length !== 1 ? 's' : ''} generated</p>
        </div>
      </div>

      {song && (
        <>
          {/* Now Playing */}
          <div className="mb-4 p-3 md:p-4 rounded-xl bg-black/30 border border-yellow-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm md:text-base text-white font-medium truncate">{song.title}</p>
                <p className="text-[10px] md:text-xs text-yellow-400/60">{song.genre} · {formatTime(song.duration)}</p>
              </div>
            </div>

            {/* Waveform visualization */}
            <div className="h-12 md:h-16 flex items-center gap-[2px] mb-3">
              {animatedWaveform.map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-100 ${
                    i / animatedWaveform.length * 100 < progress
                      ? 'bg-gradient-to-t from-yellow-500 to-orange-400'
                      : 'bg-yellow-500/20'
                  }`}
                  style={{
                    height: `${height * 100}%`,
                    transform: isPlaying ? `scaleY(${0.8 + Math.random() * 0.4})` : 'scaleY(1)',
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="relative h-1 bg-yellow-500/20 rounded-full mb-2">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between text-[10px] md:text-xs text-yellow-400/50">
              <span>{formatTime(song.duration * progress / 100)}</span>
              <span>{formatTime(song.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>
            <button
              onClick={onPlayPause}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-yellow-500/30"
            >
              {isPlaying ? (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Song List */}
      {songs.length > 0 && (
        <div>
          <p className="text-xs text-yellow-400/50 mb-2">Your Tracks</p>
          <div className="space-y-2 max-h-32 md:max-h-40 overflow-y-auto custom-scrollbar">
            {songs.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSong(s)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                  song?.id === s.id
                    ? 'bg-yellow-500/20 border border-yellow-500/30'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-yellow-500/50 to-orange-500/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs md:text-sm text-white truncate">{s.title}</p>
                  <p className="text-[10px] text-yellow-400/50">{s.genre}</p>
                </div>
                <span className="text-[10px] text-yellow-400/40">{formatTime(s.duration)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(234, 179, 8, 0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(234, 179, 8, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(234, 179, 8, 0.3);
        }
      `}</style>
    </div>
  );
}

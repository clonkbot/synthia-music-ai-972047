import { useState } from 'react';

interface SongGeneratorProps {
  onGenerate: (prompt: string, genre: string) => void;
  isGenerating: boolean;
}

const genres = [
  { id: 'synthwave', label: 'Synthwave', color: 'from-purple-500 to-pink-500' },
  { id: 'lofi', label: 'Lo-Fi', color: 'from-cyan-500 to-blue-500' },
  { id: 'pop', label: 'Pop', color: 'from-pink-500 to-orange-500' },
  { id: 'electronic', label: 'Electronic', color: 'from-cyan-400 to-green-400' },
  { id: 'ambient', label: 'Ambient', color: 'from-blue-500 to-purple-500' },
  { id: 'hiphop', label: 'Hip Hop', color: 'from-yellow-500 to-red-500' },
];

export default function SongGenerator({ onGenerate, isGenerating }: SongGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('synthwave');

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt, selectedGenre);
      setPrompt('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-pink-500/20 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-yellow-500/20 flex items-center justify-center border border-pink-500/30">
          <svg className="w-4 h-4 md:w-5 md:h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-white text-sm md:text-base">Song Generator</h3>
          <p className="text-[10px] md:text-xs text-pink-400/60">Powered by Suno AI</p>
        </div>
      </div>

      {/* Genre Selection */}
      <div className="mb-4">
        <label className="text-xs text-cyan-400/70 mb-2 block">Select Genre</label>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs transition-all ${
                selectedGenre === genre.id
                  ? `bg-gradient-to-r ${genre.color} text-white shadow-lg`
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input */}
      <div className="mb-4">
        <label className="text-xs text-cyan-400/70 mb-2 block">Describe Your Song</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A dreamy song about dancing under neon lights in a futuristic city..."
          className="w-full bg-[#0a0a12]/60 border border-pink-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-pink-400/30 focus:outline-none focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/20 resize-none h-20"
          disabled={isGenerating}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
      >
        {isGenerating ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Generate Song</span>
          </>
        )}
      </button>

      {/* API badges */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="px-2 py-1 rounded-md bg-cyan-500/10 text-[8px] md:text-[10px] text-cyan-400/60 border border-cyan-500/20">Suno AI</span>
        <span className="px-2 py-1 rounded-md bg-pink-500/10 text-[8px] md:text-[10px] text-pink-400/60 border border-pink-500/20">Claude API</span>
        <span className="px-2 py-1 rounded-md bg-yellow-500/10 text-[8px] md:text-[10px] text-yellow-400/60 border border-yellow-500/20">ElevenLabs</span>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import BotFace from './components/BotFace';
import ChatInterface from './components/ChatInterface';
import MusicPlayer from './components/MusicPlayer';
import SongGenerator from './components/SongGenerator';

export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface Song {
  id: string;
  title: string;
  genre: string;
  duration: number;
  waveform: number[];
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hey there, music maker! I'm SYNTHIA, your AI music companion. I can help you create amazing songs, chat about music, or just vibe together. What kind of tune are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState<Song[]>([]);
  const speakTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateWaveform = (): number[] => {
    return Array.from({ length: 50 }, () => Math.random() * 0.8 + 0.2);
  };

  const botResponses = [
    "That's a fantastic idea! I'm thinking we could blend some synthwave vibes with a touch of lo-fi. Let me cook something up...",
    "Oh, I love that genre! The bass lines in that style are absolutely electric. What mood should we go for?",
    "Interesting choice! I've been analyzing thousands of tracks in that style. Should we add some vocal harmonies?",
    "You've got great taste! Let me generate something special. This might take a moment while I compose the perfect arrangement.",
    "That's exactly what I was thinking! The neural networks are firing up. Get ready for something awesome!",
    "I can definitely work with that! What tempo are you feeling? Something chill or more upbeat?",
  ];

  const handleSendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    // Simulate bot thinking and responding
    setTimeout(() => {
      setIsThinking(false);
      const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      // Simulate speaking
      setIsSpeaking(true);
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
      speakTimeoutRef.current = setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }, 1500);
  }, []);

  const handleGenerateSong = useCallback((prompt: string, genre: string) => {
    setIsThinking(true);

    setTimeout(() => {
      const newSong: Song = {
        id: Date.now().toString(),
        title: `${prompt.slice(0, 20)}...`,
        genre,
        duration: Math.floor(Math.random() * 120) + 120,
        waveform: generateWaveform(),
      };
      setGeneratedSongs((prev) => [newSong, ...prev]);
      setCurrentSong(newSong);
      setIsThinking(false);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: `I've created "${newSong.title}" in the ${genre} style! Hit play to hear your new track. What do you think?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsSpeaking(true);
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
      speakTimeoutRef.current = setTimeout(() => {
        setIsSpeaking(false);
      }, 2500);
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white overflow-hidden relative">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
           }}
      />

      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a12] via-[#1a0a2e] to-[#0a0a12]" />

      {/* Circuit pattern overlay */}
      <div className="fixed inset-0 opacity-5"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300fff0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 md:p-6 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <div>
                <h1 className="font-display text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                  SYNTHIA
                </h1>
                <p className="text-[10px] md:text-xs text-cyan-400/60 tracking-[0.2em] uppercase">AI Music Companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-cyan-400 hidden sm:inline">Connected</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main grid */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left column - Bot and Music */}
          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
            {/* Bot Face */}
            <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-cyan-500/20 backdrop-blur-xl">
              <BotFace isSpeaking={isSpeaking} isThinking={isThinking} />
            </div>

            {/* Song Generator */}
            <SongGenerator onGenerate={handleGenerateSong} isGenerating={isThinking} />

            {/* Music Player */}
            <MusicPlayer
              song={currentSong}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              songs={generatedSongs}
              onSelectSong={setCurrentSong}
            />
          </div>

          {/* Right column - Chat */}
          <div className="lg:col-span-7 flex flex-col min-h-[400px] lg:min-h-0">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isThinking={isThinking}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 border-t border-cyan-500/10">
          <p className="text-center text-[10px] md:text-xs text-cyan-400/30 tracking-wide">
            Requested by <span className="text-cyan-400/50">@stringer_kade</span> · Built by <span className="text-pink-400/50">@clonkbot</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

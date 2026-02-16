import { useState, useRef, useEffect } from 'react';
import type { Message } from '../App';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isThinking: boolean;
}

export default function ChatInterface({ messages, onSendMessage, isThinking }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isThinking) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickPrompts = [
    'Create an upbeat pop song',
    'Make something chill and lo-fi',
    'I want synthwave vibes',
    'Something epic and cinematic',
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80 rounded-2xl md:rounded-3xl border border-cyan-500/20 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-cyan-500/20 bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center border border-cyan-500/30">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-white text-sm md:text-base">Chat with SYNTHIA</h3>
              <p className="text-[10px] md:text-xs text-cyan-400/60">Powered by Claude AI + ElevenLabs</p>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-[10px] md:text-xs text-pink-400/60 hidden sm:inline">Neural Link Active</span>
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-pink-500/30 to-pink-600/20 border border-pink-500/30'
                  : 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30'
              }`}
            >
              <p className="text-sm md:text-base text-white/90 leading-relaxed">{message.content}</p>
              <p className={`text-[10px] mt-2 ${message.role === 'user' ? 'text-pink-400/50' : 'text-cyan-400/50'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-cyan-400"
                      style={{
                        animation: 'pulse-bounce 1s infinite',
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-cyan-400/70">SYNTHIA is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-4 md:px-6 py-2 border-t border-cyan-500/10 bg-black/10 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="px-3 py-1.5 rounded-full text-[10px] md:text-xs text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t border-cyan-500/20 bg-black/30">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell SYNTHIA what kind of music you want..."
              className="w-full bg-[#0a0a12]/80 border border-cyan-500/30 rounded-xl px-4 py-3 text-sm md:text-base text-white placeholder-cyan-400/30 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 resize-none min-h-[48px] max-h-[120px]"
              rows={1}
              disabled={isThinking}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center hover:from-pink-400 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>

      <style>{`
        @keyframes pulse-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 240, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 240, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 240, 0.3);
        }
      `}</style>
    </div>
  );
}

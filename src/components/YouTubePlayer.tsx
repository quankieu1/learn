import React, { useState } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Music } from 'lucide-react';
import { useYouTube } from '../hooks/useYouTube';

interface YouTubePlayerProps {
  onUrlChange: (url: string) => void;
  disabled?: boolean;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  onUrlChange,
  disabled = false
}) => {
  const [url, setUrl] = useState('');
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const { isPlaying, isReady, isLoaded, loadVideo, play, pause, stop, setVolume: setPlayerVolume } = useYouTube();

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      loadVideo(url);
      onUrlChange(url);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setPlayerVolume(isMuted ? 0 : newVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setPlayerVolume(isMuted ? volume : 0);
  };

  return (
    <div className="mb-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <Music className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-700">Background Music</h3>
        </div>
        
        <form onSubmit={handleUrlSubmit} className="mb-4">
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL for background music..."
              disabled={disabled}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={disabled || !url.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:scale-105"
            >
              Load
            </button>
          </div>
        </form>

        {isLoaded && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={play}
                  disabled={disabled || isPlaying}
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-50 hover:transform hover:scale-105"
                >
                  <Play className="w-5 h-5 ml-1" />
                </button>
                
                <button
                  onClick={pause}
                  disabled={disabled || !isPlaying}
                  className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-50 hover:transform hover:scale-105"
                >
                  <Pause className="w-5 h-5" />
                </button>
                
                <button
                  onClick={stop}
                  disabled={disabled}
                  className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-50 hover:transform hover:scale-105"
                >
                  <Square className="w-5 h-5" />
                </button>
                
                <button
                  onClick={toggleMute}
                  disabled={disabled}
                  className="w-10 h-10 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  disabled={disabled}
                  className="w-24 accent-blue-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-600 w-8">{volume}%</span>
              </div>
            </div>
            
            {isLoaded && (
              <div className="mt-3 text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isPlaying 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {isPlaying ? '♪ Playing' : '⏸ Paused'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Hidden YouTube player */}
      <div id="youtube-player" className="hidden"></div>
    </div>
  );
};
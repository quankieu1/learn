import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const useYouTube = () => {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const initializePlayer = useCallback((videoId: string) => {
    if (window.YT && window.YT.Player) {
      const newPlayer = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 1, // Auto play when loaded
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            setPlayer(newPlayer);
            setIsLoaded(true);
            // Auto play when ready
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          }
        }
      });
    }
  }, []);

  const loadVideo = useCallback((url: string) => {
    const videoId = extractVideoId(url);
    if (videoId) {
      if (player) {
        player.loadVideoById(videoId);
        // Auto play after loading new video
        setTimeout(() => {
          player.playVideo();
        }, 1000);
      } else {
        initializePlayer(videoId);
      }
    }
  }, [player, initializePlayer]);

  const play = useCallback(() => {
    if (player && isReady) {
      player.playVideo();
    }
  }, [player, isReady]);

  const pause = useCallback(() => {
    if (player && isReady) {
      player.pauseVideo();
    }
  }, [player, isReady]);

  const stop = useCallback(() => {
    if (player && isReady) {
      player.stopVideo();
    }
  }, [player, isReady]);

  const setVolume = useCallback((volume: number) => {
    if (player && isReady) {
      player.setVolume(volume);
    }
  }, [player, isReady]);

  useEffect(() => {
    if (!window.YT) {
      window.onYouTubeIframeAPIReady = () => {
        // YouTube API is ready
      };
    }
  }, []);

  return {
    isPlaying,
    isReady,
    isLoaded,
    loadVideo,
    play,
    pause,
    stop,
    setVolume
  };
};
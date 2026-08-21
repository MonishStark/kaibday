import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const AudioPlayer: React.FC = () => {
  const [muted, setMuted] = useState(soundFx.getMuted());
  const [bgmActive, setBgmActive] = useState(soundFx.getIsPlayingBgm());
  const [isSongPlaying, setIsSongPlaying] = useState(soundFx.isBirthdaySongActive());

  useEffect(() => {
    const handleTimeUpdate = () => {
      setIsSongPlaying(soundFx.isBirthdaySongActive());
      setBgmActive(soundFx.getIsPlayingBgm());
    };

    soundFx.onTimeUpdate(handleTimeUpdate);
    return () => {
      soundFx.removeTimeUpdateListener(handleTimeUpdate);
    };
  }, []);

  const handleToggleMute = () => {
    const isMuted = soundFx.toggleMute();
    setMuted(isMuted);
    soundFx.playClick();
  };

  const handleToggleBGM = () => {
    const isPlaying = soundFx.toggleBGM();
    setBgmActive(isPlaying);
    setIsSongPlaying(soundFx.isBirthdaySongActive());
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-kai-cream/90 backdrop-blur-md border border-kai-beige/80 px-3 py-2 rounded-full shadow-md transition-all hover:shadow-lg">
      <button
        onClick={handleToggleBGM}
        className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
          bgmActive || isSongPlaying
            ? 'bg-kai-blush text-kai-charcoal font-semibold animate-pulse'
            : 'hover:bg-kai-beige/50 text-kai-muted'
        }`}
        title="Toggle Ambient Music / Birthday Song"
      >
        <Music className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">
          {isSongPlaying ? '♪ Birthday Song' : bgmActive ? 'Music ON' : 'Ambient Music'}
        </span>
      </button>

      <button
        onClick={handleToggleMute}
        className="p-1.5 rounded-full hover:bg-kai-beige/60 text-kai-charcoal transition-colors"
        title={muted ? 'Unmute Sound FX' : 'Mute Sound FX'}
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-kai-muted" />
        ) : (
          <Volume2 className="w-4 h-4 text-kai-charcoal" />
        )}
      </button>
    </div>
  );
};

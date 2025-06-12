import React from 'react';
import { Language } from '../types';

interface StudyAnimationProps {
  language: Language;
  isStudying: boolean;
}

export const StudyAnimation: React.FC<StudyAnimationProps> = ({
  language,
  isStudying
}) => {
  return (
    <div className="relative w-96 h-96 mx-auto mb-8">
      {/* Main pixel art container */}
      <div className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden">
        {/* Base pixel art image */}
        <img 
          src="/src/assets/image copy.png" 
          alt="Study Scene"
          className={`w-full h-full object-cover pixel-art rounded-3xl ${isStudying ? 'animate-study-focus' : ''}`}
        />
        
        {/* Animated overlay effects when studying */}
        {isStudying && (
          <>
            {/* Screen glow effect */}
            <div className="absolute top-[45%] right-[25%] w-16 h-12 bg-cyan-400/30 rounded animate-pulse" style={{ animationDuration: '2s' }}></div>
            
            {/* Lamp glow effect */}
            <div className="absolute top-[35%] left-[15%] w-12 h-8 bg-yellow-300/40 rounded-full animate-gentle-glow"></div>
            
            {/* Window light enhancement */}
            <div className="absolute top-[20%] right-[15%] w-20 h-16 bg-orange-200/20 rounded animate-gentle-glow" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating study particles */}
            <div className="absolute top-[30%] left-[40%] w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-[50%] right-[30%] w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-[60%] left-[50%] w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-[40%] right-[40%] w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            
            {/* Hair movement effect - subtle overlay on hair area */}
            <div className="absolute top-[35%] left-[45%] w-8 h-6 bg-black/10 rounded-full animate-hair-sway"></div>
            
            {/* Writing hand movement effect */}
            <div className="absolute top-[55%] left-[52%] w-4 h-2 bg-white/20 rounded animate-writing"></div>
            
            {/* Overall warm study glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/10 via-yellow-200/5 to-pink-200/10 animate-gentle-glow" style={{ animationDuration: '5s' }}></div>
            
            {/* Focus aura around the character */}
            <div className="absolute top-[30%] left-[35%] w-24 h-32 border-2 border-blue-300/30 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          </>
        )}
        
        {/* Language-specific color overlays */}
        {(() => {
          switch (language) {
            case 'ko':
              return <div className="absolute inset-0 bg-gradient-to-br from-pink-200/10 to-purple-200/10 rounded-3xl"></div>;
            case 'zh':
              return <div className="absolute inset-0 bg-gradient-to-br from-red-200/10 to-yellow-200/10 rounded-3xl"></div>;
            default:
              return <div className="absolute inset-0 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded-3xl"></div>;
          }
        })()}
      </div>
      
      {/* Shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-8 bg-black/20 rounded-full blur-md"></div>
    </div>
  );
};
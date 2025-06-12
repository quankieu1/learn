import React from 'react';

interface CountdownDisplayProps {
  timeRemaining: number;
  isRunning: boolean;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  timeRemaining,
  isRunning
}) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRunning && timeRemaining === 0) {
    return null;
  }

  return (
    <div className="text-center mb-8">
      <div className={`
        inline-block px-8 py-4 rounded-2xl font-mono text-4xl font-bold
        transition-all duration-300
        ${isRunning 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg animate-pulse' 
          : 'bg-white/80 text-gray-700 border-2 border-gray-200'
        }
      `}>
        {formatTime(timeRemaining)}
      </div>
      {isRunning && (
        <p className="text-gray-600 mt-2 animate-fade-in">Time remaining</p>
      )}
    </div>
  );
};
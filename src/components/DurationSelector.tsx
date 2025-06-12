import React from 'react';
import { StudyDuration } from '../types';
import { Clock } from 'lucide-react';

interface DurationSelectorProps {
  selectedDuration: number;
  onDurationChange: (minutes: number) => void;
  disabled?: boolean;
}

const durations: StudyDuration[] = [
  { minutes: 30, label: '30 min' },
  { minutes: 60, label: '1 hour' },
  { minutes: 120, label: '2 hours' },
  { minutes: 240, label: '4 hours' }
];

export const DurationSelector: React.FC<DurationSelectorProps> = ({
  selectedDuration,
  onDurationChange,
  disabled = false
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-700">Study Duration</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {durations.map((duration) => (
          <button
            key={duration.minutes}
            onClick={() => onDurationChange(duration.minutes)}
            disabled={disabled}
            className={`
              py-4 px-6 rounded-xl font-medium transition-all duration-300
              border-2 text-center min-h-[80px] flex flex-col justify-center
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:scale-105'}
              ${selectedDuration === duration.minutes
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white border-transparent shadow-lg'
                : 'bg-white/80 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-white'
              }
            `}
          >
            <div className="text-2xl font-bold">{duration.minutes < 60 ? duration.minutes : duration.minutes / 60}</div>
            <div className="text-sm opacity-80">{duration.minutes < 60 ? 'minutes' : 'hour' + (duration.minutes > 60 ? 's' : '')}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
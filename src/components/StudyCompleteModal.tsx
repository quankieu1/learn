import React, { useEffect } from 'react';
import { CheckCircle, Trophy, Star } from 'lucide-react';
import { Language } from '../types';

interface StudyCompleteModalProps {
  isVisible: boolean;
  language: Language;
  duration: number;
  onClose: () => void;
}

const congratulationMessages = {
  en: {
    title: "Study Complete! 🎉",
    message: "Excellent work! You've completed your study session.",
    duration: "Duration"
  },
  ko: {
    title: "공부 완료! 🎉",
    message: "훌륭합니다! 학습 세션을 완료했습니다.",
    duration: "학습 시간"
  },
  zh: {
    title: "学习完成！🎉",
    message: "太棒了！您已完成学习任务。",
    duration: "学习时长"
  }
};

export const StudyCompleteModal: React.FC<StudyCompleteModalProps> = ({
  isVisible,
  language,
  duration,
  onClose
}) => {
  const messages = congratulationMessages[language];

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} ${language === 'ko' ? '분' : language === 'zh' ? '分钟' : 'minutes'}`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours} ${language === 'ko' ? '시간' : language === 'zh' ? '小时' : 'hour' + (hours > 1 ? 's' : '')}`;
  };

  useEffect(() => {
    if (isVisible) {
      // Play congratulatory sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgc');
      audio.play().catch(() => {
        // Ignore audio play errors
      });

      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scale-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
            <div className="absolute -top-2 -right-2">
              <Star className="w-6 h-6 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {messages.title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {messages.message}
        </p>
        
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-700">
              {messages.duration}: {formatDuration(duration)}
            </span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
        >
          {language === 'ko' ? '확인' : language === 'zh' ? '确定' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
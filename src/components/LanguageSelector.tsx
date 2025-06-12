import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' }
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
        <div className="flex space-x-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`
                px-6 py-3 rounded-xl font-medium transition-all duration-300
                flex items-center space-x-2 min-w-[120px] justify-center
                ${selectedLanguage === lang.code
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-white/20 hover:text-gray-800'
                }
              `}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
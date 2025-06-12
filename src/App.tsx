import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { useTimer } from './hooks/useTimer';
import { LanguageSelector } from './components/LanguageSelector';
import { StudyAnimation } from './components/StudyAnimation';
import { DurationSelector } from './components/DurationSelector';
import { CountdownDisplay } from './components/CountdownDisplay';
import { YouTubePlayer } from './components/YouTubePlayer';
import { StudyCompleteModal } from './components/StudyCompleteModal';
import { Play, Square, Pause } from 'lucide-react';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completedDuration, setCompletedDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const { isRunning, timeRemaining, startTimer, stopTimer, resetTimer } = useTimer();

  const handleStartStudy = () => {
    const durationInSeconds = selectedDuration * 60;
    startTimer(durationInSeconds);
    setIsPaused(false);
  };

  const handlePauseStudy = () => {
    setIsPaused(true);
    stopTimer();
  };

  const handleResumeStudy = () => {
    setIsPaused(false);
    startTimer(timeRemaining);
  };

  const handleStopStudy = () => {
    stopTimer();
    resetTimer();
    setIsPaused(false);
  };

  const handleReset = () => {
    setShowCompleteModal(false);
    resetTimer();
    setIsPaused(false);
  };

  // Check if study session is complete
  useEffect(() => {
    if (isRunning && timeRemaining === 0) {
      setCompletedDuration(selectedDuration);
      setShowCompleteModal(true);
      stopTimer();
      setIsPaused(false);
    }
  }, [isRunning, timeRemaining, selectedDuration, stopTimer]);

  const getPageTitle = () => {
    switch (selectedLanguage) {
      case 'ko':
        return '언어 학습 타이머';
      case 'zh':
        return '语言学习计时器';
      default:
        return 'Language Study Timer';
    }
  };

  const getButtonText = (type: 'start' | 'pause' | 'resume' | 'stop') => {
    switch (selectedLanguage) {
      case 'ko':
        return {
          start: '학습 시작',
          pause: '일시정지',
          resume: '계속하기',
          stop: '중지'
        }[type];
      case 'zh':
        return {
          start: '开始学习',
          pause: '暂停',
          resume: '继续',
          stop: '停止'
        }[type];
      default:
        return {
          start: 'Start Studying',
          pause: 'Pause',
          resume: 'Resume',
          stop: 'Stop'
        }[type];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600 text-lg">
            {selectedLanguage === 'ko' 
              ? '집중해서 공부하고 목표를 달성하세요'
              : selectedLanguage === 'zh'
              ? '专注学习，实现目标'
              : 'Focus, study, and achieve your goals'
            }
          </p>
        </div>

        {/* Language Selector */}
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        {/* YouTube Player */}
        <YouTubePlayer
          onUrlChange={setYoutubeUrl}
          disabled={isRunning}
        />

        {/* Study Animation */}
        <StudyAnimation
          language={selectedLanguage}
          isStudying={isRunning}
        />

        {/* Countdown Display */}
        <CountdownDisplay
          timeRemaining={timeRemaining}
          isRunning={isRunning}
        />

        {/* Duration Selector */}
        {!isRunning && !isPaused && (
          <DurationSelector
            selectedDuration={selectedDuration}
            onDurationChange={setSelectedDuration}
          />
        )}

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          {!isRunning && !isPaused && (
            <button
              onClick={handleStartStudy}
              disabled={selectedDuration === 0}
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 min-w-[160px] justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:scale-105 bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              <span>{getButtonText('start')}</span>
            </button>
          )}

          {isRunning && (
            <>
              <button
                onClick={handlePauseStudy}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 min-w-[160px] justify-center hover:transform hover:scale-105 bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg hover:shadow-xl"
              >
                <Pause className="w-5 h-5" />
                <span>{getButtonText('pause')}</span>
              </button>
              
              <button
                onClick={handleStopStudy}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 min-w-[160px] justify-center hover:transform hover:scale-105 bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl"
              >
                <Square className="w-5 h-5" />
                <span>{getButtonText('stop')}</span>
              </button>
            </>
          )}

          {isPaused && (
            <>
              <button
                onClick={handleResumeStudy}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 min-w-[160px] justify-center hover:transform hover:scale-105 bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span>{getButtonText('resume')}</span>
              </button>
              
              <button
                onClick={handleStopStudy}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 min-w-[160px] justify-center hover:transform hover:scale-105 bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl"
              >
                <Square className="w-5 h-5" />
                <span>{getButtonText('stop')}</span>
              </button>
            </>
          )}
        </div>

        {/* Study Complete Modal */}
        <StudyCompleteModal
          isVisible={showCompleteModal}
          language={selectedLanguage}
          duration={completedDuration}
          onClose={handleReset}
        />
      </div>
    </div>
  );
}

export default App;
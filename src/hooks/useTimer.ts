import { useState, useEffect, useCallback } from 'react';
import { TimerState } from '../types';

export const useTimer = (initialDuration: number = 0) => {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    timeRemaining: initialDuration,
    selectedDuration: initialDuration
  });

  const startTimer = useCallback((duration: number) => {
    setTimerState({
      isRunning: true,
      timeRemaining: duration,
      selectedDuration: duration
    });
  }, []);

  const stopTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimerState({
      isRunning: false,
      timeRemaining: 0,
      selectedDuration: 0
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState.isRunning && timerState.timeRemaining > 0) {
      interval = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerState.isRunning, timerState.timeRemaining]);

  return {
    ...timerState,
    startTimer,
    stopTimer,
    resetTimer
  };
};
import { useState, useEffect, useRef } from 'react';

interface UseCustomStopwatchProps {
  offsetTimestamp?: Date;
  autoStart?: boolean;
}

interface UseCustomStopwatchReturn {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  reset: () => void;
}

export const useCustomStopwatch = ({ 
  offsetTimestamp = new Date(), 
  autoStart = true 
}: UseCustomStopwatchProps = {}): UseCustomStopwatchReturn => {
  const startTimeRef = useRef(offsetTimestamp);
  const [time, setTime] = useState(0);

  // Update ref when offsetTimestamp changes
  useEffect(() => {
    startTimeRef.current = offsetTimestamp;
  }, [offsetTimestamp]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateTime = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startTimeRef.current.getTime()) / 1000);
      setTime(diff);
    };

    if (autoStart) {
      updateTime();
      intervalId = setInterval(updateTime, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoStart]);

  const reset = () => {
    startTimeRef.current = offsetTimestamp;
    setTime(0);
  };

  const totalSeconds = time;
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    reset
  };
}; 
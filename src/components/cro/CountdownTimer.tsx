'use client';

import { useState, useEffect, memo } from 'react';

function getWeeklyDeadline() {
  const now = new Date();
  const deadline = new Date(now);
  const day = deadline.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  deadline.setDate(deadline.getDate() + diff);
  deadline.setHours(0, 0, 0, 0);
  return deadline;
}

function formatNumber(n: number) {
  return n.toString().padStart(2, '0');
}

const CountdownTimer = memo(function CountdownTimer() {
  const [deadline] = useState(() => getWeeklyDeadline());
  const [timeLeft, setTimeLeft] = useState(() => deadline.getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(deadline.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.max(0, Math.floor((timeLeft % (1000 * 60)) / 1000));

  const units = [
    { label: 'DAYS', value: days },
    { label: 'HOURS', value: hours },
    { label: 'MINUTES', value: minutes },
    { label: 'SECONDS', value: seconds },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-sm border border-ember/30 bg-charcoal md:h-16 md:w-16"
              style={{ boxShadow: '0 0 20px rgba(255,107,53,0.15)' }}
            >
              <span className="font-mono text-xl font-bold text-ember md:text-2xl">
                {formatNumber(unit.value)}
              </span>
            </div>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-ash">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-xl font-bold text-ember animate-pulse">:</span>
          )}
        </div>
      ))}
    </div>
  );
});

export default CountdownTimer;

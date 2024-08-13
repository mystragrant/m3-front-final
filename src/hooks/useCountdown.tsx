import { useEffect, useState } from "react";

// Hook
export const useCountdown = (
  targetYear: number,
  targetMonth: number,
  targetDay: number,
  targetHour = 0,
  targetMinute = 0,
  targetSecond = 0,
) => {
  // Tworzenie daty docelowej w UTC
  // Miesiące są liczone od 0, więc odjęcie 1 od podanego miesiąca jest konieczne
  const countDownDate = Date.UTC(
    targetYear,
    targetMonth - 1,
    targetDay,
    targetHour,
    targetMinute,
    targetSecond,
  );

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [passed, setPassed] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      // Obliczanie różnicy między teraz (w UTC) a datą docelową
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        setPassed(true);
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    targetYear,
    targetMonth,
    targetDay,
    targetHour,
    targetMinute,
    targetSecond,
    countDownDate,
  ]);

  return { ...countdown, passed };
};

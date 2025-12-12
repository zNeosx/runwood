'use client';
import Lottie from 'lottie-react';
import React, { useEffect } from 'react';
import confettiLottieAnimation from '@/assets/lottie/confetti.json';
import confetti from 'canvas-confetti';

const ConfettiLottie = () => {
  useEffect(() => {
    let interval: number;
    const handleClick = () => {
      interval = window.setInterval(() => {}, 250);
    };
    handleClick();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <Lottie
      animationData={confettiLottieAnimation}
      loop={true}
      width={100}
      height={100}
      className="cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default ConfettiLottie;

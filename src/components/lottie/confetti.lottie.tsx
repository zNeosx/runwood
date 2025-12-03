'use client';
import Lottie from 'lottie-react';
import React from 'react';
import confettiLottieAnimation from '@/assets/lottie/confetti.json';

const ConfettiLottie = () => {
  return (
    <Lottie
      animationData={confettiLottieAnimation}
      loop={true}
      width={100}
      height={100}
    />
  );
};

export default ConfettiLottie;

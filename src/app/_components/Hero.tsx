'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HomepageData } from '@/sanity/queries';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type Props = {
  data: HomepageData['hero'];
};

const ANIMATION_CONFIG = {
  reverseAt: 12,
  loopThreshold: 0.5, // Seuil pour détecter le loop
};

const Hero = ({ data }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  const mainTimeline = useRef<gsap.core.Timeline | null>(null);
  const lastTimeRef = useRef<number>(0);
  const hasReversedRef = useRef<boolean>(false);

  useGSAP(
    () => {
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const buttons = buttonsRef.current;
      const scrollIndicator = scrollIndicatorRef.current;
      const video = videoRef.current;

      if (!title || !subtitle || !buttons || !scrollIndicator || !video) return;

      // Timeline d'entrée
      mainTimeline.current = gsap
        .timeline({ paused: true })
        .to(title, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        })
        .to(
          subtitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          buttons,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          scrollIndicator,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        );

      // Set initial state
      gsap.set([title, subtitle, buttons, scrollIndicator], {
        opacity: 0,
        y: 30,
      });

      // Play intro
      mainTimeline.current.play();

      // Sync avec la vidéo
      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;

        // Détecter le loop (temps actuel < dernier temps - seuil)
        if (
          currentTime <
          lastTimeRef.current - ANIMATION_CONFIG.loopThreshold
        ) {
          hasReversedRef.current = false;
          // Rejouer l'animation
          mainTimeline.current?.restart();
        }

        // Reverse à 6 secondes
        if (
          !hasReversedRef.current &&
          currentTime >= ANIMATION_CONFIG.reverseAt
        ) {
          hasReversedRef.current = true;
          mainTimeline.current?.reverse();
        }

        lastTimeRef.current = currentTime;
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    },
    { scope: container }
  );

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/IMG-20251201-WA0008.jpg"
          className="size-full object-cover"
        >
          <source src={'/videos/hero-2.mp4'} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content */}
      <div
        ref={container}
        className="relative z-10 container mx-auto px-4 py-32 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl xl:text-8xl font-bold text-foreground leading-tight text-balance opacity-0"
          >
            {data?.title}
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl xl:text-3xl text-foreground max-w-2xl mx-auto text-balance opacity-0"
          >
            {data?.description}
          </p>
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 opacity-0"
          >
            <Link
              href={'/galerie'}
              className={cn(
                buttonVariants({
                  size: 'xl',
                })
              )}
            >
              Voir les créations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href={'/galerie'}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'xl',
                })
              )}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Apprendre à fabriquer
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

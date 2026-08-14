import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Phase 1 Wrapper & Word Refs
  const phase1WrapperRef = useRef<HTMLDivElement>(null);
  const pioneeringRef = useRef<HTMLSpanElement>(null);
  const creativeRef = useRef<HTMLSpanElement>(null);
  const excellenceRef = useRef<HTMLSpanElement>(null);

  // Phase 2 Wrapper & Element Refs
  const phase2WrapperRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Prevent scrolling while preloader sequence is active
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'auto';
          if (onComplete) onComplete();
        }
      });

      // -------------------------------------------------------------
      // GSAP TIMELINE INITIAL STATES SETUP
      // -------------------------------------------------------------
      gsap.set(phase1WrapperRef.current, {
        opacity: 1,
        visibility: 'visible'
      });

      gsap.set([pioneeringRef.current, creativeRef.current, excellenceRef.current], {
        opacity: 0,
        y: 8
      });

      gsap.set(phase2WrapperRef.current, {
        opacity: 0,
        visibility: 'hidden'
      });

      // Blue-cyan rectangle starts scaleX: 0 layered on top
      gsap.set(rectRef.current, {
        scaleX: 0,
        scaleY: 1,
        opacity: 1,
        x: 0,
        transformOrigin: 'left center'
      });

      // Final text starts at opacity: 0 layered at bottom
      gsap.set(finalTextRef.current, {
        opacity: 0
      });

      // -------------------------------------------------------------
      // GSAP TIMELINE SEQUENCE (~4.2 SECONDS TOTAL)
      // -------------------------------------------------------------

      // 1. Initial Reveal (FASTER): Fade in 'Pioneering' (font-weight: 100)
      tl.to(pioneeringRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: 'power3.out'
      })

      // 2. Phrase Completion (FASTER): Fade in 'Creative' & 'Excellence' (font-weight: 400)
      .to(creativeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: 'power3.out'
      }, '+=0.04')
      .to(excellenceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: 'power3.out'
      }, '+=0.04')

      // 3. The Cut (FASTER): Drop opacity of Phase 1 Wrapper to 0
      .to(phase1WrapperRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in'
      }, '+=0.22')
      .set(phase1WrapperRef.current, { visibility: 'hidden' })

      // Unhide Phase 2 Wrapper
      .set(phase2WrapperRef.current, { visibility: 'visible', opacity: 1 })

      // 4. Bar Creation: Animate scaleX from 0 to 1 with transformOrigin: "left center"
      .to(rectRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: 'expo.inOut'
      })

      // 5. Shift Right (x: 25)
      .to(rectRef.current, {
        x: 25,
        duration: 0.38,
        ease: 'sine.inOut'
      })

      // 6. As bar moves from right back toward center (x: 0), overlap the right-to-left unrevealing wipe!
      .to(rectRef.current, {
        x: 0,
        duration: 0.38,
        ease: 'sine.inOut'
      })
      .set(rectRef.current, { transformOrigin: 'right center' }, '-=0.25')
      .to(rectRef.current, {
        scaleX: 0,
        duration: 0.65,
        ease: 'expo.inOut'
      }, '<')
      .to(finalTextRef.current, {
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out'
      }, '<')

      .to({}, { duration: 0.6 })

      // 7. Smooth curtain slide reveal to main portfolio
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut'
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-black text-white flex items-center justify-center select-none overflow-hidden"
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontStyle: 'normal',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '42px',
        lineHeight: '50px'
      }}
    >
      {/* PHASE 1 WRAPPER: Absolute positioned container holding initial phrase inline */}
      <div
        ref={phase1WrapperRef}
        className="absolute inset-0 m-auto flex items-center justify-center gap-3 whitespace-nowrap text-[42px] leading-[50px]"
      >
        <span
          ref={pioneeringRef}
          className="font-[100] inline-block tracking-normal"
        >
          Pioneering
        </span>
        <span
          ref={creativeRef}
          className="font-[400] inline-block tracking-normal text-white"
        >
          Creative
        </span>
        <span
          ref={excellenceRef}
          className="font-[400] inline-block tracking-normal"
        >
          Excellence
        </span>
      </div>

      {/* PHASE 2 WRAPPER: Absolute positioned container sized to fit final text */}
      <div
        ref={phase2WrapperRef}
        className="absolute inset-0 m-auto flex items-center justify-center w-fit h-fit text-[42px] leading-[50px]"
      >
        {/* Blue-Cyan Gradient Rectangle placed ABSOLUTELY OVER TEXT (z-index 10) */}
        <div
          ref={rectRef}
          className="absolute inset-0 bg-gradient-to-r from-[#0284c7] via-[#0284c7] to-[#06b6d4] z-10 rounded-sm shadow-md shadow-cyan-500/20 pointer-events-none"
        />

        {/* Final Text: Yogeshwaran.Dev (Opacity 0 initially, layered at bottom z-0) */}
        <h1
          ref={finalTextRef}
          className="relative z-0 font-[100] tracking-[0.25em] text-white uppercase whitespace-nowrap text-[42px] leading-[50px]"
        >
          Yogeshwaran<span className="text-[#06b6d4] font-normal">.Dev</span>
        </h1>
      </div>
    </div>
  );
};

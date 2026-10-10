"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  depth: number; // parallax factor
}

export const HeroBackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle colors matching cyber theme
    const colors = [
      'rgba(99, 102, 241, ',   // indigo-500
      'rgba(6, 182, 212, ',    // cyan-500
      'rgba(168, 85, 247, ',   // purple-500
      'rgba(56, 189, 248, ',   // sky-400
    ];

    const particleCount = Math.min(100, Math.floor(width / 14));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 0.8,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45 - 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.25,
        targetAlpha: Math.random() * 0.8 + 0.2,
        depth: Math.random() * 1.5 + 0.5, // 0.5 to 2.0 depth speed
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Scroll tracking physics
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Impart velocity impulse to particles based on scroll speed & direction
      scrollVelocity = delta * 0.85;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth dampening of scroll velocity (inertia physics)
      scrollVelocity *= 0.92;

      // 1. Connect nearby particles with subtle glowing constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 115) * 0.18;
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Draw and animate particles with Scroll Motion + Ambient Motion
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient gentle drift
        p.x += p.speedX;
        // Natural speed + Dynamic Parallax Scroll response
        p.y += p.speedY - (scrollVelocity * p.depth * 0.6);

        // When scrolling fast, also add slight dynamic sideways swirl
        p.x += Math.sin(p.y * 0.01) * (scrollVelocity * 0.1);

        // Wrap around screen boundaries seamlessly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive mouse push effect
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 130 && mDist > 0) {
          const force = (130 - mDist) / 130;
          p.x += (mdx / mDist) * force * 1.8;
          p.y += (mdy / mDist) * force * 1.8;
        }

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = p.size * 6;
        ctx.shadowColor = 'rgba(99, 102, 241, 0.7)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Cyber Digital Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#818cf8_1px,transparent_1px),linear-gradient(to_bottom,#818cf8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 2. Floating Animated Glowing Nebulas / Orbs */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[130px] animate-pulse duration-1000" />
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse duration-700" />
      <div className="absolute top-80 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/10 rounded-full blur-[140px]" />

      {/* 3. High Performance Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

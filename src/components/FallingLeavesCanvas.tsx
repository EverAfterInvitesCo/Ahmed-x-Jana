import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  oscillationOffset: number;
  type: 'velvet-petal' | 'sage-leaf' | 'blush-petal' | 'candle-mote';
  color: string;
  opacity: number;
  scaleX: number;
}

export const FallingLeavesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollVelocityRef = useRef(0);
  const lastScrollY = useRef(0);

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

    window.addEventListener('resize', handleResize, { passive: true });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      scrollVelocityRef.current = Math.min(Math.max(delta * 0.15, -4), 8);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = prefersReducedMotion ? 6 : width < 768 ? 20 : 38;

    const particles: Particle[] = [];

    const types: Particle['type'][] = [
      'velvet-petal',
      'velvet-petal',
      'sage-leaf',
      'sage-leaf',
      'blush-petal',
      'candle-mote',
    ];

    const velvetPinkColors = ['#c98e8a', '#b37874', '#d8a6a2', '#dfbab6'];
    const sageGreenColors = ['#51665c', '#697e74', '#3d5148', '#798b82'];
    const blushColors = ['#f0d6d3', '#e7c5c1', '#f7e6e4', '#e4b7b3'];

    const createParticle = (initialY = -30): Particle => {
      const type = types[Math.floor(Math.random() * types.length)];
      let color = '#c98e8a';

      if (type === 'velvet-petal') {
        color = velvetPinkColors[Math.floor(Math.random() * velvetPinkColors.length)];
      } else if (type === 'sage-leaf') {
        color = sageGreenColors[Math.floor(Math.random() * sageGreenColors.length)];
      } else if (type === 'blush-petal') {
        color = blushColors[Math.floor(Math.random() * blushColors.length)];
      } else {
        color = '#f5e2c4';
      }

      return {
        x: Math.random() * width,
        y: initialY === -30 ? Math.random() * -height * 0.5 : initialY,
        size: type === 'candle-mote' ? 1.4 + Math.random() * 1.8 : 9 + Math.random() * 12,
        speedY: 0.55 + Math.random() * 1.1,
        speedX: (Math.random() - 0.5) * 0.75,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        oscillationSpeed: 0.01 + Math.random() * 0.02,
        oscillationDistance: 20 + Math.random() * 36,
        oscillationOffset: Math.random() * Math.PI * 2,
        type,
        color,
        opacity: type === 'candle-mote' ? 0.35 + Math.random() * 0.45 : 0.45 + Math.random() * 0.35,
        scaleX: 1,
      };
    };

    for (let i = 0; i < count; i++) {
      particles.push(createParticle(Math.random() * height));
    }

    let time = 0;

    const drawLeaf = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(p.scaleX, 1);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'candle-mote') {
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#e6c99b';
        ctx.shadowBlur = 7;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'blush-petal' || p.type === 'velvet-petal') {
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(179, 120, 116, 0.22)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.bezierCurveTo(p.size * 0.62, -p.size * 0.58, p.size * 0.72, p.size * 0.42, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.72, p.size * 0.42, -p.size * 0.62, -p.size * 0.58, 0, -p.size * 0.7);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.85);
        ctx.quadraticCurveTo(p.size * 0.36, 0, 0, p.size * 0.85);
        ctx.quadraticCurveTo(-p.size * 0.36, 0, 0, -p.size * 0.85);
        ctx.fill();

        ctx.strokeStyle = 'rgba(248, 243, 240, 0.35)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.lineTo(0, p.size * 0.7);
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      scrollVelocityRef.current *= 0.94;
      const extraSpeedY = scrollVelocityRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.scaleX = Math.cos(time * 2 + p.oscillationOffset);
        p.rotation += p.rotationSpeed;

        const sway = Math.sin(time + p.oscillationOffset) * 0.8;
        p.x += p.speedX + sway;
        p.y += p.speedY + extraSpeedY;

        drawLeaf(p);

        if (p.y > height + 40 || p.x < -40 || p.x > width + 40) {
          particles[i] = createParticle(-20);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="falling-leaves-canvas"
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      aria-hidden="true"
    />
  );
};

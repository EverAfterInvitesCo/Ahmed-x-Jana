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
  type: 'gold-leaf' | 'olive-leaf' | 'rose-petal' | 'stardust';
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

    // Track scroll velocity for breeze effect
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      scrollVelocityRef.current = Math.min(Math.max(delta * 0.15, -4), 8);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = prefersReducedMotion ? 6 : width < 768 ? 22 : 42;

    const particles: Particle[] = [];

    const types: ('gold-leaf' | 'olive-leaf' | 'rose-petal' | 'stardust')[] = [
      'gold-leaf',
      'gold-leaf',
      'olive-leaf',
      'rose-petal',
      'rose-petal',
      'stardust',
    ];

    const goldColors = ['#d4af37', '#e6cb89', '#f3d99d', '#c59b27', '#e1be6c'];
    const oliveColors = ['#8a9a5b', '#a3b18a', '#588157', '#6b705c'];
    const petalColors = ['#f7d1cd', '#e8c2ca', '#f8edeb', '#ffcad4', '#fae1dd'];

    const createParticle = (initialY = -30): Particle => {
      const type = types[Math.floor(Math.random() * types.length)];
      let color = '#d4af37';

      if (type === 'gold-leaf') {
        color = goldColors[Math.floor(Math.random() * goldColors.length)];
      } else if (type === 'olive-leaf') {
        color = oliveColors[Math.floor(Math.random() * oliveColors.length)];
      } else if (type === 'rose-petal') {
        color = petalColors[Math.floor(Math.random() * petalColors.length)];
      } else {
        color = '#fff6d6';
      }

      return {
        x: Math.random() * width,
        y: initialY === -30 ? Math.random() * -height * 0.5 : initialY,
        size: type === 'stardust' ? 1.5 + Math.random() * 2 : 10 + Math.random() * 14,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        oscillationSpeed: 0.01 + Math.random() * 0.02,
        oscillationDistance: 20 + Math.random() * 40,
        oscillationOffset: Math.random() * Math.PI * 2,
        type,
        color,
        opacity: type === 'stardust' ? 0.3 + Math.random() * 0.7 : 0.6 + Math.random() * 0.35,
        scaleX: 1,
      };
    };

    // Populate initial particles spread across the viewport
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

      if (p.type === 'stardust') {
        // Glowing stardust particle
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#f3d99d';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'rose-petal') {
        // Soft rounded rose petal
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(232, 194, 202, 0.3)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.6, p.size * 0.7, p.size * 0.4, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.4, -p.size * 0.6, -p.size * 0.6, 0, -p.size * 0.7);
        ctx.fill();
      } else if (p.type === 'olive-leaf') {
        // Slender olive leaf
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.quadraticCurveTo(p.size * 0.35, 0, 0, p.size * 0.8);
        ctx.quadraticCurveTo(-p.size * 0.35, 0, 0, -p.size * 0.8);
        ctx.fill();

        // Subtle gold-green vein
        ctx.strokeStyle = 'rgba(255, 240, 200, 0.4)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.lineTo(0, p.size * 0.7);
        ctx.stroke();
      } else {
        // Royal golden leaf
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.4, p.size * 0.5, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.5, -p.size * 0.5, -p.size * 0.4, 0, -p.size);
        ctx.fill();

        // Delicate central vein
        ctx.strokeStyle = 'rgba(255, 255, 230, 0.5)';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.85);
        ctx.lineTo(0, p.size * 0.85);
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Dampen scroll velocity smoothly
      scrollVelocityRef.current *= 0.94;
      const extraSpeedY = scrollVelocityRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D-like fluttering effect
        p.scaleX = Math.cos(time * 2 + p.oscillationOffset);
        p.rotation += p.rotationSpeed;

        // Oscillate horizontally
        const sway = Math.sin(time + p.oscillationOffset) * 0.8;
        p.x += p.speedX + sway;
        p.y += p.speedY + extraSpeedY;

        drawLeaf(p);

        // Reset particle if it leaves viewport
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

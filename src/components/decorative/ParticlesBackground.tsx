'use client';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { incrementExplosion } from '../EasterEggManager';

interface ParticlesBackgroundProps {
  color?: string;
  opacity?: number;
  count?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  interactive?: boolean;
  zIndex?: number;
}

const shouldDisableParticles = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
};

class Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  opacity: number;
  angle: number;

  constructor(x: number, y: number, size: number, speedX: number, speedY: number, opacity: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseSize = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.opacity = opacity;
    this.angle = Math.random() * Math.PI * 2;
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;

    this.angle += 0.01;
    this.size = this.baseSize + Math.sin(this.angle) * 0.5;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = color;
    ctx.shadowBlur = Math.max(3, this.size * 0.85);
    ctx.shadowColor = toRgba(color, Math.min(this.opacity * 1.4, 0.28));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

const toRgba = (color: string, alpha: number) => {
  if (color.startsWith('#')) {
    const normalized = color.length === 4
      ? color.split('').map((char, index) => (index === 0 ? '' : char + char)).join('')
      : color.slice(1);

    const safeHex = normalized.padEnd(6, '0').slice(0, 6);
    const r = parseInt(safeHex.slice(0, 2), 16);
    const g = parseInt(safeHex.slice(2, 4), 16);
    const b = parseInt(safeHex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return color;
};

class ExplosionParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.size = 2 + Math.random() * 4;
    this.opacity = 1;
    this.color = color;
    this.life = 0;
    this.maxLife = 30 + Math.random() * 20;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.life++;
    this.opacity = 1 - (this.life / this.maxLife);
    this.size *= 0.96;
    return this.life < this.maxLife;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default function ParticlesBackground({
  color = '#2d6a4f',
  opacity = 0.2,
  count = 30,
  minSize = 2,
  maxSize = 8,
  minSpeed = 0.2,
  maxSpeed = 0.6,
  interactive = false,
  zIndex = 0
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const explosionsRef = useRef<ExplosionParticle[]>([]);
  const animationIdRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const [isTouch, setIsTouch] = useState(() => shouldDisableParticles());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateIsTouch = () => setIsTouch(mediaQuery.matches);

    updateIsTouch();
    mediaQuery.addEventListener('change', updateIsTouch);

    return () => {
      mediaQuery.removeEventListener('change', updateIsTouch);
    };
  }, []);

  const createParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const size = minSize + Math.random() * (maxSize - minSize);
      let x = ((i + Math.random()) / count) * width;
      let y = Math.random() * height;

      const isInsideQuietZone =
        x > width * 0.39 &&
        x < width * 0.61 &&
        y > height * 0.24 &&
        y < height * 0.62;

      if (isInsideQuietZone) {
        y = Math.random() > 0.5
          ? height * (0.08 + Math.random() * 0.14)
          : height * (0.7 + Math.random() * 0.18);
      }

      const speedX = (Math.random() - 0.5) * (maxSpeed - minSpeed) + (Math.random() > 0.5 ? minSpeed : -minSpeed);
      const speedY = (Math.random() - 0.5) * (maxSpeed - minSpeed) + (Math.random() > 0.5 ? minSpeed : -minSpeed);
      const particleOpacity = (Math.random() * 0.24 + 0.58) * opacity;
      particles.push(new Particle(x, y, size, speedX, speedY, particleOpacity));
    }

    return particles;
  }, [count, minSize, maxSize, minSpeed, maxSpeed, opacity]);

  useEffect(() => {
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const target = canvas.parentElement ?? canvas;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const updateCanvasSize = (attempt = 0) => {
      const rect = target.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(rect.width);
      const displayHeight = Math.floor(rect.height);

      if ((!displayWidth || !displayHeight) && attempt < 8) {
        requestAnimationFrame(() => updateCanvasSize(attempt + 1));
        return;
      }

      if (!displayWidth || !displayHeight) {
        return;
      }

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
      }

      if (!particlesRef.current.length || attempt === 0) {
        particlesRef.current = createParticles(displayWidth, displayHeight);
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        particlesRef.current = [];
        updateCanvasSize();
      }, 100);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === target) {
          handleResize();
        }
      }
    });

    updateCanvasSize();
    requestAnimationFrame(() => updateCanvasSize());
    window.addEventListener('load', handleResize, { once: true });
    resizeObserver.observe(target);
    isActiveRef.current = true;

    const animate = () => {
      if (!isActiveRef.current || !ctx || !canvas) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx, color);
      });

      explosionsRef.current = explosionsRef.current.filter((particle) => {
        const alive = particle.update();
        if (alive) {
          particle.draw(ctx);
        }
        return alive;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const createExplosion = (x: number, y: number) => {
      const particleCount = 8 + Math.random() * 8;
      for (let i = 0; i < particleCount; i++) {
        explosionsRef.current.push(new ExplosionParticle(x, y, color));
      }
      incrementExplosion();
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      particlesRef.current.forEach((particle) => {
        const dx = clickX - particle.x;
        const dy = clickY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < particle.size + 10) {
          createExplosion(particle.x, particle.y);
          particle.x = Math.random() * rect.width;
          particle.y = Math.random() * rect.height;
        }
      });
    };

    if (interactive) {
      canvas.addEventListener('click', handleClick);
    }

    return () => {
      isActiveRef.current = false;
      resizeObserver.disconnect();
      window.removeEventListener('load', handleResize);
      clearTimeout(resizeTimeout);
      canvas.removeEventListener('click', handleClick);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [color, interactive, createParticles, isTouch]);

  if (isTouch) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 hidden md:block w-full h-full pointer-events-auto cursor-pointer"
      style={{ zIndex }}
    />
  );
}

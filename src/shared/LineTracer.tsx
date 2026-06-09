import React, { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
};

class Tracer {
  x: number;
  y: number;
  angle: number;
  speed: number;
  turnSpeed: number;
  target: Point;
  path: Point[];

  constructor(width: number, height: number) {
    this.x = width / 2;
    this.y = height / 2;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 2;
    this.turnSpeed = 0.08;
    this.target = this.randomPoint(width, height);
    this.path = [{ x: this.x, y: this.y }];
  }

  randomPoint(width: number, height: number): Point {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
    };
  }

  update(width: number, height: number) {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;

    const targetAngle = Math.atan2(dy, dx);

    let delta = targetAngle - this.angle;

    while (delta > Math.PI) delta -= Math.PI * 2;
    while (delta < -Math.PI) delta += Math.PI * 2;

    this.angle += delta * this.turnSpeed;

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    this.path.push({ x: this.x, y: this.y });

    // Limit trail length
    if (this.path.length > 500) {
      this.path.shift();
    }

    // Pick new target if close enough
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 20) {
      this.target = this.randomPoint(width, height);
    }

    // Wrap around edges
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.path.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(this.path[0].x, this.path[0].y);

    for (let i = 1; i < this.path.length; i++) {
      ctx.lineTo(this.path[i].x, this.path[i].y);
    }

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Head point
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'cyan';
    ctx.fill();
  }
}

const RandomTracer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const tracer = new Tracer(canvas.width, canvas.height);

    let animationFrame: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      tracer.update(canvas.width, canvas.height);
      tracer.draw(ctx);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block',
        background: 'black',
      }}
    />
  );
};

export default RandomTracer;
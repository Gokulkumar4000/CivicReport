import { useEffect, useRef } from 'react';
import './ParticleEffect.css';

const ParticleEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const shapes = ['building', 'shield', 'star', 'pin', 'people'];
    
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.12 + 0.04;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = Math.random() * 0.4 + 0.15;
        this.size = Math.random() * 8 + 6;
        this.drift = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.12 + 0.04;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.color = Math.random() > 0.5 ? '#137fec' : '#22c55e';
      }

      update() {
        this.y += this.speed;
        this.x += this.drift;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20) {
          this.reset();
        }

        if (this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        switch(this.shape) {
          case 'building':
            ctx.fillRect(-this.size/2, -this.size, this.size, this.size * 2);
            ctx.fillRect(-this.size/3, -this.size * 0.8, this.size * 0.2, this.size * 0.3);
            ctx.fillRect(this.size/6, -this.size * 0.8, this.size * 0.2, this.size * 0.3);
            break;
          case 'shield':
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size * 0.7, -this.size * 0.5);
            ctx.lineTo(this.size * 0.7, this.size * 0.5);
            ctx.lineTo(0, this.size);
            ctx.lineTo(-this.size * 0.7, this.size * 0.5);
            ctx.lineTo(-this.size * 0.7, -this.size * 0.5);
            ctx.closePath();
            ctx.fill();
            break;
          case 'star':
            ctx.beginPath();
            for(let i = 0; i < 5; i++) {
              const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
              const x = Math.cos(angle) * this.size;
              const y = Math.sin(angle) * this.size;
              if(i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
          case 'pin':
            ctx.beginPath();
            ctx.arc(0, -this.size * 0.3, this.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-this.size * 0.3, this.size);
            ctx.lineTo(this.size * 0.3, this.size);
            ctx.closePath();
            ctx.fill();
            break;
          case 'people':
            ctx.beginPath();
            ctx.arc(0, -this.size * 0.5, this.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(-this.size * 0.4, 0, this.size * 0.8, this.size);
            break;
        }
        
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 35 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleEffect;

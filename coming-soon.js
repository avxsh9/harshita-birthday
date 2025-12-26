
document.addEventListener('DOMContentLoaded', () => {
    // Target Date: Feb 12, 2026 00:00:00
    const targetDate = new Date('February 12, 2026 00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            document.querySelector('.main-title').innerText = "The Moment Is Here";
            document.querySelector('.sub-title').innerText = "Feb 12, 2026";
            document.getElementById('countdown').style.display = 'none';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ADVANCED PARTICLE SYSTEM
    const container = document.body;
    // Reduce particles on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 60;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'star-particle';

        // Random properties
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.3;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${startX}vw;
            top: ${startY}vh;
            filter: blur(${size > 2 ? 1 : 0}px);
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
            animation: twinkle ${Math.random() * 3 + 2}s infinite alternate, float ${duration}s infinite linear;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;

        container.appendChild(particle);
    }

    // Inject styles for particles dynamic keyframes if needed, 
    // but here we use inline styles with standard CSS keyframes defined below
    const style = document.createElement('style');
    style.textContent = `
        @keyframes customFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 50 - 25}px); opacity: 0; }
        }
        @keyframes starFloat {
            0% { transform: translateY(0); }
            100% { transform: translateY(-20px); }
        }
        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

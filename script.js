// 1. Dynamic Preloader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1800);
});

// 2. Custom Glowing Mouse Trail
const cursor = document.querySelector('.custom-cursor');
const trail = document.querySelector('.cursor-trail');

if (window.innerWidth > 991) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
        }, 30);
    });

    document.querySelectorAll('a, button, .glass-card').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '2px solid #00f3ff';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.backgroundColor = '#00f3ff';
            cursor.style.border = 'none';
        });
    });
}

// 3. Transparent Navbar Scroll Transform & Global Progress Bar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.dynamic-navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressProgress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progressProgress}%`;
});

// 4. Hero Background Particle Grid Generation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];
for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 243, 255, 0.4)';
    
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 5. 3D Card Interactive Tilt Physics Calculations (Loops smoothly over all 9 grid items)
const tiltCards = document.querySelectorAll('.tilt-element');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardX = e.clientX - cardRect.left - cardRect.width / 2;
        const cardY = e.clientY - cardRect.top - cardRect.height / 2;
        
        const rotateX = -(cardY / cardRect.height) * 20; 
        const rotateY = (cardX / cardRect.width) * 20;

        card.style.transform = `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `scale(1) rotateX(0deg) rotateY(0deg)`;
    });
});

// 6. Interactive Virtual Showroom Platform Controller
let currentRotation = 0;
let autoRotateActive = true;
const showroomCar = document.querySelector('.rotating-car');
const autoRotateBtn = document.getElementById('auto-rotate-btn');

function rotateShowroom(degrees) {
    autoRotateActive = false;
    autoRotateBtn.classList.remove('neon-active');
    currentRotation += degrees;
    showroomCar.style.transform = `translateX(-50%) rotateY(${currentRotation}deg)`;
}

function showroomTicker() {
    if (autoRotateActive) {
        currentRotation += 0.3;
        showroomCar.style.transform = `translateX(-50%) rotateY(${currentRotation}deg) rotateX(10deg)`;
    }
    requestAnimationFrame(showroomTicker);
}
showroomTicker();

autoRotateBtn.addEventListener('click', () => {
    autoRotateActive = !autoRotateActive;
    autoRotateBtn.classList.toggle('neon-active', autoRotateActive);
});

// 7. Optimized Scroll Reveal Animation Framework
const revealSections = document.querySelectorAll('.reveal-fade');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => revealObserver.observe(section));

// Form processing confirmation interceptor
document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('System Signal Transmitted: Your high-performance test track reservation is being mapped!');
});
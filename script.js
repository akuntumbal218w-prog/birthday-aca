// ACAA's Birthday Information
const BIRTHDAY_DATE = new Date('2006-08-03');
const SECRET_KEY = '0803'; // August (08) 3rd (03)

// Login functionality
const loginForm = document.getElementById('loginForm');
const keyInput = document.getElementById('keyInput');
const errorMessage = document.getElementById('errorMessage');
const loginContainer = document.getElementById('loginContainer');
const birthdayContainer = document.getElementById('birthdayContainer');

// Check if already logged in
window.addEventListener('load', function() {
    const isLoggedIn = sessionStorage.getItem('acaaUnlocked');
    if (isLoggedIn === 'true') {
        showBirthdayPage();
    }
});

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredKey = keyInput.value.trim();
    
    if (enteredKey === SECRET_KEY) {
        // Correct key
        sessionStorage.setItem('acaaUnlocked', 'true');
        errorMessage.textContent = '';
        showBirthdayPage();
    } else {
        // Wrong key
        errorMessage.textContent = '❌ Wrong key! Try again.';
        keyInput.value = '';
        keyInput.focus();
        
        // Add shake animation to error message
        errorMessage.style.animation = 'none';
        setTimeout(() => {
            errorMessage.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
    }
});

// Show birthday page
function showBirthdayPage() {
    loginContainer.style.display = 'none';
    birthdayContainer.style.display = 'block';
    initBirthdayPage();
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function() {
    sessionStorage.removeItem('acaaUnlocked');
    loginContainer.style.display = 'flex';
    birthdayContainer.style.display = 'none';
    keyInput.value = '';
    errorMessage.textContent = '';
});

// Initialize birthday page
function initBirthdayPage() {
    const celebrateBtn = document.getElementById('celebrateBtn');
    celebrateBtn.addEventListener('click', celebrate);

    // Update age and countdown
    updateAge();
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);

    // Generate stars
    generateStars();

    // Balloon click effects
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        balloon.addEventListener('click', (e) => {
            e.stopPropagation();
            createBurstEffect(e.clientX, e.clientY);
            balloon.style.opacity = '0';
            setTimeout(() => {
                balloon.style.opacity = '0.8';
            }, 1000);
        });
    });

    // Mouse move 3D effect
    document.addEventListener('mousemove', (e) => {
        const content = document.querySelector('.content');
        const rect = content.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleX = (e.clientY - centerY) * 0.01;
        const angleY = (e.clientX - centerX) * 0.01;
        
        content.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        const content = document.querySelector('.content');
        content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            celebrate();
        }
    });

    console.log('🎉 Welcome to ACAA\'s Birthday Website! 🎉');
    console.log('Birthday: Monday, August 3, 2006');
}

// Calculate and display age
function updateAge() {
    const ageDisplay = document.getElementById('ageDisplay');
    const today = new Date();
    let age = today.getFullYear() - BIRTHDAY_DATE.getFullYear();
    const monthDiff = today.getMonth() - BIRTHDAY_DATE.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < BIRTHDAY_DATE.getDate())) {
        age--;
    }
    
    ageDisplay.textContent = `Age: ${age} years old 🎉`;
}

// Update countdown timer
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    const now = new Date();
    
    // Check if today is her birthday
    const today = new Date();
    const thisBirthdayYear = today.getFullYear();
    const thisYearBirthday = new Date(thisBirthdayYear, 7, 3); // August 3
    
    if (today.toDateString() === thisYearBirthday.toDateString()) {
        countdownElement.textContent = '🎂 Today is ACAA\'s Birthday! 🎂';
    } else {
        // Calculate next birthday
        const nextBirthday = new Date(thisBirthdayYear + 1, 7, 3);
        const timeDiff = nextBirthday - now;
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        
        countdownElement.textContent = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s until next birthday!`;
    }
}

// Celebration functions
function celebrate() {
    createConfetti();
    createHearts();
    createShakeEffect();
    playSound();
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#FFD700', '#FF69B4', '#4ECDC4', '#FF6B6B', '#FFE66D', '#95E1D3'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 2 + Math.random() * 1;
        
        confetti.style.left = randomX + 'px';
        confetti.style.top = '-10px';
        confetti.style.background = randomColor;
        confetti.style.animation = `fall ${randomDuration}s linear ${randomDelay}s forwards`;
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), (randomDuration + randomDelay) * 1000);
    }
}

function createHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 2 + Math.random() * 1;
        
        heart.style.left = randomX + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.animation = `heartFloat ${randomDuration}s ease-in ${randomDelay}s forwards`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), (randomDuration + randomDelay) * 1000);
    }
}

function createShakeEffect() {
    const content = document.querySelector('.content');
    content.style.animation = 'none';
    
    setTimeout(() => {
        content.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        10% { transform: translateX(-10px) rotate(-1deg); }
        20% { transform: translateX(10px) rotate(1deg); }
        30% { transform: translateX(-10px) rotate(-1deg); }
        40% { transform: translateX(10px) rotate(1deg); }
        50% { transform: translateX(-10px) rotate(-1deg); }
        60% { transform: translateX(10px) rotate(1deg); }
        70% { transform: translateX(-10px) rotate(-1deg); }
        80% { transform: translateX(10px) rotate(1deg); }
        90% { transform: translateX(-10px) rotate(-1deg); }
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not available');
    }
}

function createBurstEffect(x, y) {
    const colors = ['#FFD700', '#FF69B4', '#4ECDC4', '#FF6B6B', '#FFE66D'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('confetti');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i / 30) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const tx = Math.cos(angle) * velocity * 10;
        const ty = Math.sin(angle) * velocity * 10;
        
        particle.style.animation = `burst 0.8s ease-out forwards`;
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        
        document.getElementById('confetti-container').appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
    }
}

const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burst {
        to {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

function generateStars() {
    const starsContainer = document.querySelector('.stars');
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5 + 0.5;
        star.style.animation = `twinkle ${2 + Math.random() * 2}s infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
    }
}
// DOM Elements
const timer = document.getElementById('timer');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const relapseBtn = document.getElementById('relapse-btn');
const modal = document.getElementById('relapse-modal');
const closeBtn = document.querySelector('.close-btn');
const submitRelapse = document.getElementById('submit-relapse');
const reasonText = document.getElementById('reason-text');
const streakDays = document.getElementById('streak-days');
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const motivationText = document.getElementById('motivation-text');

// App State
let startTime = localStorage.getItem('nofapStartTime') || Date.now();
let lastRelapseTime = localStorage.getItem('nofapLastRelapseTime') || null;
let relapseReasons = JSON.parse(localStorage.getItem('nofapRelapseReasons')) || [];
let currentStreak = calculateCurrentStreak();

// Motivational messages
const motivations = [
    "You're stronger than your urges!",
    "Every moment counts!",
    "You're building discipline!",
    "Stay focused on your goals!",
    "Your future self will thank you!",
    "You're in control!",
    "One day at a time!",
    "The benefits are worth it!"
];

// Initialize
updateTimer();
updateStreakDisplay();
setInterval(updateTimer, 1000);
setInterval(updateMotivation, 10000);

// Event Listeners
menuBtn.addEventListener('click', toggleSidebar);
relapseBtn.addEventListener('click', () => modal.style.display = 'block');
closeBtn.addEventListener('click', () => modal.style.display = 'none');
submitRelapse.addEventListener('click', handleRelapse);

// Click outside modal to close
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Functions
function toggleSidebar() {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
}

function updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;
    
    const seconds = Math.floor(elapsed / 1000) % 60;
    const minutes = Math.floor(elapsed / (1000 * 60)) % 60;
    const hours = Math.floor(elapsed / (1000 * 60 * 60)) % 24;
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function calculateCurrentStreak() {
    if (!lastRelapseTime) return Math.floor((Date.now() - startTime) / (1000 * 60 * 60 * 24));
    
    const lastRelapseDate = new Date(parseInt(lastRelapseTime));
    const today = new Date();
    
    // Reset time parts to compare just dates
    lastRelapseDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return Math.floor((today - lastRelapseDate) / (1000 * 60 * 60 * 24));
}

function updateStreakDisplay() {
    streakDays.textContent = currentStreak;
    checkForBadges();
}

function updateMotivation() {
    motivationText.textContent = motivations[Math.floor(Math.random() * motivations.length)];
}

function handleRelapse() {
    const reason = reasonText.value.trim();
    if (!reason) {
        alert("Please provide a reason for your relapse");
        return;
    }
    
    // Save relapse data
    lastRelapseTime = Date.now();
    relapseReasons.push({
        date: new Date().toISOString(),
        reason: reason,
        streak: currentStreak
    });
    
    localStorage.setItem('nofapLastRelapseTime', lastRelapseTime);
    localStorage.setItem('nofapRelapseReasons', JSON.stringify(relapseReasons));
    
    // Reset timer but keep original start time for historical data
    startTime = Date.now();
    localStorage.setItem('nofapStartTime', startTime);
    
    // Update UI
    modal.style.display = 'none';
    reasonText.value = '';
    currentStreak = 0;
    updateStreakDisplay();
}

function checkForBadges() {
    // This would be expanded in badges.js
    if (currentStreak >= 3) {
        // Award badge
    }
    if (currentStreak >= 7) {
        // Award next badge
    }
    // And so on...
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

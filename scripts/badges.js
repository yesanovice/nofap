document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const badgesContainer = document.getElementById('badges-container');
    
    menuBtn.addEventListener('click', toggleSidebar);
    
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('shifted');
    }
    
    // Badge system
    const badges = [
        {
            name: "Noob",
            description: "3-day streak",
            image: "../assets/badge-noob.png",
            threshold: 3
        },
        {
            name: "Pro",
            description: "7-day streak",
            image: "../assets/badge-pro.png",
            threshold: 7
        },
        {
            name: "Chad",
            description: "14-day streak",
            image: "../assets/badge-chad.png",
            threshold: 14
        },
        {
            name: "Sigma",
            description: "30-day streak",
            image: "../assets/badge-sigma.png",
            threshold: 30
        },
        {
            name: "GigaChad",
            description: "90-day streak",
            image: "../assets/badge-gigachad.png",
            threshold: 90
        }
    ];
    
    // Get current streak from localStorage
    const currentStreak = localStorage.getItem('nofapCurrentStreak') || 0;
    
    // Display badges
    badges.forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge';
        
        if (currentStreak >= badge.threshold) {
            badgeElement.innerHTML = `
                <img src="${badge.image}" alt="${badge.name}">
                <h3>${badge.name}</h3>
                <p>${badge.description}</p>
                <span class="unlocked">Unlocked!</span>
            `;
        } else {
            badgeElement.innerHTML = `
                <img src="../assets/badge-locked.png" alt="Locked">
                <h3>${badge.name}</h3>
                <p>${badge.description}</p>
                <span class="locked">Locked (${badge.threshold - currentStreak} more days)</span>
            `;
        }
        
        badgesContainer.appendChild(badgeElement);
    });
});

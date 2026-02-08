// VARIABLES
const btnNo = document.getElementById('btn-no');
const overlay = document.getElementById('overlay');
const cardSad = document.getElementById('card-sad');
const cardHappy = document.getElementById('card-happy');
const musicSad = document.getElementById('music-sad');
const musicHappy = document.getElementById('music-happy');
const rainContainer = document.getElementById('rain-container');
let rainInterval;

// 1. START EXPERIENCE (Plays Sad Music Immediately)
function startExperience() {
    // Hide Overlay
    overlay.style.display = 'none';

    // PLAY SAD MUSIC INSTANTLY
    musicSad.volume = 0.5; // Set volume (0.0 to 1.0)
    musicSad.play().catch(e => console.log("Audio error: ", e));

    // START RAIN
    rainInterval = setInterval(createRain, 300);
}


// 2. RAIN ENGINE
function createRain() {
    const emojis = ['🌹', '💖', '✨', '🌸'];
    const item = document.createElement('div');
    item.classList.add('falling-item');
    item.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    item.style.left = Math.random() * 100 + 'vw';
    item.style.fontSize = (Math.random() * 20 + 15) + 'px';
    const duration = Math.random() * 3 + 2; 
    item.style.animationDuration = duration + 's';
    rainContainer.appendChild(item);
    setTimeout(() => { item.remove(); }, duration * 1000);
}


// 3. RUNAWAY BUTTON LOGIC
function runAway() {
    // No need to trigger music here anymore, it's already playing!
    
    // Make button jump
    btnNo.style.position = 'fixed'; 
    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

// Triggers
btnNo.addEventListener('mouseover', runAway);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    runAway();
});


// 4. ACCEPT LOGIC (Switches to Happy Music)
function acceptApology() {
    // Stop Sad Music
    musicSad.pause();
    musicSad.currentTime = 0; // Reset it

    // Play Happy Music
    musicHappy.volume = 1.0; 
    musicHappy.play();

    // Switch Cards
    cardSad.style.display = 'none';
    cardHappy.classList.remove('hidden');

    // Blast Rain (10x Speed)
    clearInterval(rainInterval);
    rainInterval = setInterval(createRain, 30); 
}
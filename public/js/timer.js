const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const socket = io();

let seconds = 1500; // 25 minutes
let timer;

// Socket.io listener
socket.on('liveTimer', (data) => {
  timerDisplay.textContent = formatTime(data.remaining);
});

function startTimer() {
  timer = setInterval(() => {
    seconds--;
    socket.emit('timerUpdate', { remaining: seconds });
    
    if (seconds <= 0) {
      clearInterval(timer);
      alert('Session complete!');
    }
  }, 1000);
}

function formatTime(secs) {
  const mins = Math.floor(secs / 60);
  const remainingSecs = secs % 60;
  return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', startTimer);

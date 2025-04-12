let timer;
let isRunning = false;
let elapsedTime = 0; // in seconds
let lapTimes = [];

function startStop() {
    const startStopBtn = document.getElementById('startStopBtn');
    if (!isRunning) {
        startStopBtn.textContent = 'Stop';
        isRunning = true;
        timer = setInterval(updateDisplay, 1000);
    } else {
        clearInterval(timer);
        isRunning = false;
        startStopBtn.textContent = 'Start';
        document.getElementById('stopSound').play(); // Play sound effect
        showPopup("WOHOO!!! Your Stopwatch has been Stopped."); // Show popup message
    }
}

function updateDisplay() {
    elapsedTime++;
    const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');
    document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}`;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStopBtn').textContent = 'Start';
    lapTimes = [];
    document.getElementById('lapTimesList').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(elapsedTime);
        const lapTime = formatTime(elapsedTime);
        const lapTimesList = document.getElementById('lapTimesList');
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapTimesList.appendChild(li);
    }
}

function formatTime(timeInSeconds) {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 5000); // Popup will disappear after 5 seconds
}
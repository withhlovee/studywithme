let countdownInterval;
let isPaused = false;
let remainingSeconds = 0;

// Update display as user types hours or minutes
document.getElementById("hoursInput").addEventListener("input", updatePreview);
document.getElementById("minutesInput").addEventListener("input", updatePreview);

document.getElementById("startButton").addEventListener("click", function () {
    clearInterval(countdownInterval); // Stop previous countdown

    let hours = parseInt(document.getElementById("hoursInput").value) || 0;
    let minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    
    remainingSeconds = (hours * 3600) + (minutes * 60);

    if (remainingSeconds <= 0) {
        document.getElementById("countdown").innerText = "00:00:00";
        alert("Please enter a valid time.");
        return;
    }

    startCountdown();
});

document.getElementById("pauseButton").addEventListener("click", function () {
    if (isPaused) {
        startCountdown();
        this.innerText = "Pause";
    } else {
        clearInterval(countdownInterval);
        this.innerText = "Resume";
    }
    isPaused = !isPaused;
});

// Live update function (does not start countdown)
function updatePreview() {
    let hours = parseInt(document.getElementById("hoursInput").value) || 0;
    let minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    updateDisplay((hours * 3600) + (minutes * 60));
}

function startCountdown() {
  clearInterval(countdownInterval);

  if (remainingSeconds <= 0) {
      document.getElementById("countdown").innerText = "00:00:00";
      alert("Time's up! ⏳");
      return;
  }

  // Immediately update the display before the interval starts
  updateDisplay(remainingSeconds);

  countdownInterval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds < 0) {
          clearInterval(countdownInterval);
          alert("Time's up! ⏳");
          return;
      }
      updateDisplay(remainingSeconds);
  }, 1000);
}

function updateDisplay(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    document.getElementById("countdown").innerText = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


// Part 2
document.getElementById("fullscreen-btn").addEventListener("click", function() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
      // If already in fullscreen, exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    } else {
      // If not in fullscreen, request fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    }
  });

// Part 3


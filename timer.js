const setTimerBtn = document.getElementById("set-timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const resetBtn = document.getElementById("reset");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const timerInputs = document.getElementsByClassName("timer-inputs");

pauseBtn.disabled = true;
resumeBtn.disabled = true;
resetBtn.disabled = true;
startBtn.disabled = true;

function setInputsReadonly(state) {
    hours.readOnly = state;
    minutes.readOnly = state;
    seconds.readOnly = state;
}

// Pad input helper
function padInput(input) {
    if (input.value.length === 1) input.value = input.value.padStart(2,'0');
}

// Event listeners for padding
[hours, minutes, seconds].forEach(input => {
    input.addEventListener("blur", () => padInput(input));
    input.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });
});

let totalSeconds;
let timerInterval = null;
let isRunning = false;
let isEditing = false;

setTimerBtn.addEventListener("click", ()=>{
  
    if (!isEditing) {
        hours.style.border = "solid";
        minutes.style.border = "solid";
        seconds.style.border = "solid";
        setInputsReadonly(false);
        startBtn.disabled = false;
        isEditing = true;
        setTimerBtn.classList.add("active");
    } else {
        setInputsReadonly(true);
        startBtn.disabled = true;
        isEditing = false;
        setTimerBtn.classList.remove("active");
    }
});

// Start
startBtn.onclick = function(){
    totalSeconds = calculateTotalSeconds();
    if (!isRunning && totalSeconds > 0) {
        hours.style.border = "none";
        minutes.style.border = "none";
        seconds.style.border = "none";
        isRunning = true;
        isEditing = false;        // Fix: reset editing
        setInputsReadonly(true);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        setTimerBtn.disabled = true;
        runTimer();
    }
}

// Run Timer
function runTimer(){
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            finishTimer();
            return;
        }

        totalSeconds--;
        updateTimer();
    }, 1000);
}

function finishTimer() {
    clearInterval(timerInterval);
    isRunning = false;

    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    resetBtn.disabled = true;

    isEditing = false;
    setTimerBtn.disabled = false;
    setTimerBtn.classList.remove("active");
    setInputsReadonly(false);

    totalSeconds = 0;
    updateTimer();
}

function calculateTotalSeconds(){
    const h = Math.max(0, parseInt(hours.value) || 0);
    const m = Math.min(59, Math.max(0, parseInt(minutes.value) || 0));
    const s = Math.min(59, Math.max(0, parseInt(seconds.value) || 0));

    return h * 3600 + m * 60 + s;
}

function updateTimer(){
  if (totalSeconds <= 0) {
      // Clear inputs instead of writing "00"
      hours.value = "";
      minutes.value = "";
      seconds.value = "";
      setInputsReadonly(true);
      return;
  }
    let newHours = Math.floor(totalSeconds / 3600);
    let newMinutes = Math.floor((totalSeconds - (newHours * 3600)) / 60);
    let newSeconds = totalSeconds - (newHours * 3600) - (newMinutes * 60);

    hours.value = newHours.toString().padStart(2, '0');
    minutes.value = newMinutes.toString().padStart(2, '0');
    seconds.value = newSeconds.toString().padStart(2, '0');
}

// Pause Button
pauseBtn.onclick = function(){
    clearInterval(timerInterval);
    isRunning = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
}

// Reset Button
resetBtn.onclick = function(){
    clearInterval(timerInterval);
    isRunning = false;
    isEditing = false;          // reset editing state
    totalSeconds = 0;
    hours.value = "";
    minutes.value = "";
    seconds.value = "";            // reset inputs to 00:00:00
    setInputsReadonly(true);

    startBtn.disabled = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    resetBtn.disabled = true;
    setTimerBtn.disabled = false;
    setTimerBtn.classList.remove("active");
}

// Resume Button
resumeBtn.onclick = function(){
    if (!isRunning && totalSeconds > 0) {
        isRunning = true;
        pauseBtn.disabled = false;
        resumeBtn.disabled = true;
        runTimer();
    }
}
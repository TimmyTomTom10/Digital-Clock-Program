const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("lap");
const stopBtn = document.getElementById("stop");
const resumeBtn = document.getElementById("resume");
const resetBtn = document.getElementById("reset");

const stopwatch = document.getElementById("stopwatch");

const lapTable = document.getElementById("lap-table");
    lapBtn.disabled = true;
    stopBtn.disabled = true;
    resumeBtn.disabled = true;
    resetBtn.disabled = true;

//Start
startBtn.onclick = function(){
    runTimer();
    startBtn.disabled = true;
    lapBtn.disabled = false;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
}

let counter = 0;
let timerInterval = null;

//Run Timer
function runTimer(){
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        counter++;
        updateTimer();
    }, 1000);
}

function updateTimer(){

    let newHours = Math.floor(counter / 3600);
    let newMinutes = Math.floor((counter - (newHours * 3600)) / 60);
    let newSeconds = counter - (newHours * 3600) - (newMinutes * 60);

    let hours = newHours.toString().padStart(2, '0');
    let minutes = newMinutes.toString().padStart(2, '0');
    let seconds = newSeconds.toString().padStart(2, '0');
    stopwatch.textContent = `${hours}:${minutes}:${seconds}`;
}
let lapNumRows = 0;
let lastLap = 0;
//Lap
lapBtn.onclick = function() {
    // Create a new row
    const newRow = lapTable.insertRow(); // inserts at the end by default
    lapNumRows++;

    newRow.classList.add("lap-row");
    // Create new cells
    const lapCell = newRow.insertCell(0);
    const lapTimesCell = newRow.insertCell(1);
    const overallTimeCell = newRow.insertCell(2);

    // Fill the cells with content
    let lapTime = counter - lastLap;
    lastLap = counter;
    
    let newHours = Math.floor(counter / 3600);
    let newMinutes = Math.floor((counter - (newHours * 3600)) / 60);
    let newSeconds = counter - (newHours * 3600) - (newMinutes * 60);

    let hours = newHours.toString().padStart(2, '0');
    let minutes = newMinutes.toString().padStart(2, '0');
    let seconds = newSeconds.toString().padStart(2, '0');

    let lapHours = Math.floor(lapTime / 3600);
    let lapMinutes = Math.floor((lapTime - (lapHours * 3600)) / 60);
    let lapSeconds = lapTime - (lapHours * 3600) - (lapMinutes * 60);

    let laphours = lapHours.toString().padStart(2, '0');
    let lapminutes = lapMinutes.toString().padStart(2, '0');
    let lapseconds = lapSeconds.toString().padStart(2, '0');
    
    lapCell.textContent = lapNumRows;
    lapTimesCell.textContent = `${laphours}:${lapminutes}:${lapseconds}`;
    overallTimeCell.textContent = `${hours}:${minutes}:${seconds}`;

};

//Stop
stopBtn.onclick = function(){
    clearInterval(timerInterval);
    stopBtn.disabled = true;
    resumeBtn.disabled = false;
}

//Resume
resumeBtn.onclick = function(){
        stopBtn.disabled = false;
        resumeBtn.disabled = true;
        runTimer();
}

// Reset Button
resetBtn.onclick = function(){
    clearInterval(timerInterval);
    counter = 0;
    lastLap = 0;
    updateTimer();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resumeBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    let tablelength = lapTable.rows.length
    for(let i = 0; i < tablelength - 1; i++){
        lapTable.deleteRow(lapTable.rows.length - 1);
    }
}
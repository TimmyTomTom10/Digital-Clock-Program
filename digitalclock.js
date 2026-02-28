
//Set Alarm Button
const dialogSetAlarm = document.getElementById("popupSetAlarm");
const openBtn = document.getElementById("openBtnSetAlarm");
const closeBtn = document.getElementById("closeBtnSetAlarm");

openBtn.addEventListener("click", () => {
  dialogSetAlarm.showModal();
});

closeBtn.addEventListener("click", () => {
  dialogSetAlarm.close();
});

const dateInputSetAlarm = document.getElementById("dateSetterSetAlarm");

const today = new Date().toISOString().split("T")[0];
dateInputSetAlarm.min = today;
dateInputSetAlarm.addEventListener("input", () => {
  if (dateInputSetAlarm.value < dateInputSetAlarm.min) {
    dateInputSetAlarm.value = dateInputSetAlarm.min;
  }
});
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
dateInputSetAlarm.min = now.toISOString().slice(0,16);

const submitSetAlarm = document.getElementById("submitSetAlarm");
const dateSetterSetAlarm = document.getElementById("dateSetterSetAlarm");

submitSetAlarm.onclick = function(){
    alarmCounter++;
    
    const newAlarm = displayAlarm(new Date(dateSetterSetAlarm.value));
    alarmArray.push({
    id: `alarm${alarmCounter}`,
    date: new Date(dateSetterSetAlarm.value)
    });
    addAlarmToList(newAlarm);
    function addAlarmToList(newAlarm) {
        const span = document.createElement("span");
        span.id = `alarm${alarmCounter}`;
        span.textContent = newAlarm;
        alarmList.appendChild(span);
    }
}
let alarmCounter = 0;
function displayAlarm(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    let stringdate;
    let stringMonth;
    let stringDayOfWeek;
    switch(day){
        case 1,21,31:
            stringdate = day + "st";
            break;
        case 2,22:
            stringdate = day + "nd";
            break;
        case 3,23:
            stringdate = day + "rd";
            break;
        default:
            stringdate = day + "th";
    }
    switch(month){
        case 0:
            stringMonth = "January";
            break;
        case 1:
            stringMonth = "February";
            break;
        case 2:
            stringMonth = "March";
            break;
        case 3:
            stringMonth = "April";
            break;
        case 4:
            stringMonth = "May";
            break;
        case 5:
            stringMonth = "June";
            break;
        case 6:
            stringMonth = "July";
            break;
        case 7:
            stringMonth = "August";
            break;
        case 8:
            stringMonth = "September";
            break;
        case 9:
            stringMonth = "October";
            break;
        case 10:
            stringMonth = "November";
            break;
        case 11:
            stringMonth = "December";
            break;
    }
    switch(dayOfWeek){
        case 0:
            stringDayOfWeek = "Sunday";
            break;
        case 1:
            stringDayOfWeek = "Monday";
            break;
        case 2:
            stringDayOfWeek = "Tuesday";
            break;
        case 3:
            stringDayOfWeek = "Wednesday";
            break;
        case 4:
            stringDayOfWeek = "Thursday";
            break;
        case 5:
            stringDayOfWeek = "Friday";
            break;
        case 6:
            stringDayOfWeek = "Saturday";
            break;
    }
    return `Alarm ${alarmCounter.toString().padStart(2,"0")}: 
    ${stringDayOfWeek} ${stringMonth} ${stringdate} ${year} ${hour}:${minutes}:${seconds}`;
}
let alarmArray = [];

function checkAlarms(alarmArray, dateNow){
    for(let i = 0; i < alarmArray.length; i++){
        if(alarmArray[i].date.getTime() <= dateNow.getTime()){
            alert("⏰ Alarm! It's time!");
            const div = document.getElementById(alarmArray[i].id);
             if (div) div.remove();
            alarmArray.splice(i,1);
            i--;
        }
    }
}


//Set Clock Button

const dialogSetClock = document.getElementById("popupSetClock");
const openBtnSetClock = document.getElementById("openBtnSetClock");
const closeBtnSetClock = document.getElementById("closeBtnSetClock");

openBtnSetClock.addEventListener("click", () => {
  dialogSetClock.showModal();
});

closeBtnSetClock.addEventListener("click", () => {
  dialogSetClock.close();
});

const submitSetClock = document.getElementById("submitSetClock");
const dateSetterSetClock = document.getElementById("dateSetterSetClock");
let clockInterval = null;
let customDate = null;

submitSetClock.onclick = function(){
    clearInterval(clockInterval);
    customDate = new Date(dateSetterSetClock.value);

    clockInterval = setInterval(() => tickClock(customDate), 1000);
    updateClock(customDate);
    
}

function tickClock(customDate){

    customDate.setSeconds(customDate.getSeconds() + 1);

    checkAlarms(alarmArray, getCurrentTime());
    updateClock(customDate);
}

function getCurrentTime() {
    return customDate ? customDate : new Date();
}

//Sync Time Button
const syncTimeBtn = document.getElementById("syncTime");
const currentDateDisplay = document.getElementById("currentDate");
const currentTimeDisplay = document.getElementById("clock");





function updateClock(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    currentTimeDisplay.textContent = `${hour}:${minutes}:${seconds}`;

    let stringdate;
    let stringMonth;
    let stringDayOfWeek;
    switch(day){
        case 1,21,31:
            stringdate = day + "st";
            break;
        case 2,22:
            stringdate = day + "nd";
            break;
        case 3,23:
            stringdate = day + "rd";
            break;
        default:
            stringdate = day + "th";
    }
    switch(month){
        case 0:
            stringMonth = "January";
            break;
        case 1:
            stringMonth = "February";
            break;
        case 2:
            stringMonth = "March";
            break;
        case 3:
            stringMonth = "April";
            break;
        case 4:
            stringMonth = "May";
            break;
        case 5:
            stringMonth = "June";
            break;
        case 6:
            stringMonth = "July";
            break;
        case 7:
            stringMonth = "August";
            break;
        case 8:
            stringMonth = "September";
            break;
        case 9:
            stringMonth = "October";
            break;
        case 10:
            stringMonth = "November";
            break;
        case 11:
            stringMonth = "December";
            break;
    }
    switch(dayOfWeek){
        case 0:
            stringDayOfWeek = "Sunday";
            break;
        case 1:
            stringDayOfWeek = "Monday";
            break;
        case 2:
            stringDayOfWeek = "Tuesday";
            break;
        case 3:
            stringDayOfWeek = "Wednesday";
            break;
        case 4:
            stringDayOfWeek = "Thursday";
            break;
        case 5:
            stringDayOfWeek = "Friday";
            break;
        case 6:
            stringDayOfWeek = "Saturday";
            break;
    }

    
    currentDateDisplay.textContent = `${stringDayOfWeek} ${stringMonth} ${stringdate} ${year}`;
}
synctheTime();
function synctheTime(){
    clearInterval(clockInterval);

    customDate = null;
    clockInterval = setInterval(() => {
        const now = getCurrentTime();
        updateClock(now);
        checkAlarms(alarmArray, now);
    }, 1000);
}

syncTimeBtn.onclick = function(){
    synctheTime();
    
}

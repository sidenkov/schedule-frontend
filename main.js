const Parse = require('parse/node');

Parse.serverURL = 'https://schedule.back4app.io'; // This is your Server URL
Parse.initialize(
    'TmOSA86376clw7ZRIl5YSuSQbrh6Ty5JjZbFxCLP', // This is your Application ID
    'lUECwfyAVQSBo8NfVo2k2jrxGzYFVYGpAFghIQhY', // This is your Javascript key
);

window.onload=function() {
    if (typeof document !== 'undefined') {
        document.getElementById("change-week-button").addEventListener("click", changeWeek);
    }
}

const schedule = Parse.Object.extend('schedule');
const query = new Parse.Query(schedule);

function checkWeek() {
    // 27 days between 7.09 and 3.10. 7.10 was even, 3.10 is odd, 5.10 is even.
    const oneDay = 24*60*60*1000;
    const firstWeekEven = true;
    
    var schedFirstDay = new Date(2020, 8, 7); // console.log(schedFirstDay.toLocaleDateString());
    var today = new Date(); // console.log(today.toLocaleDateString());
    // var today = new Date(2020, 9, 3); // console.log(today.toLocaleDateString());
    const weeks = Math.floor( (today - schedFirstDay) / oneDay / 7);
    
    if (Math.floor(weeks%2) == 0) {
        console.log("Week is even");
        return true;
    } else {
        console.log("Week is odd");
        return false;
    }
}

function updateSchedule() {
    query.equalTo("weekEven", isWeekEven);
    query.find().then(
        (results) => {
            if (typeof document !== 'undefined') {
                // console.log(`${JSON.stringify(results)}`);

                for (let i = 0; i < results.length; i++) {
                    // console.log(results[i].get('name'));
                    const num = results[i].get('num');
                    const day = results[i].get('day');
                    // console.log(`name-day${day}-para${num+1}`);
                    // console.log(`type-day${day}-para${num+1}`);

                    document.getElementById(`name-day${day}-para${num+1}`).innerText = results[i].get('name');
                    document.getElementById(`type-day${day}-para${num+1}`).innerText = results[i].get('type');
                }

            }
        }, 
        (error) => {
            if (typeof document !== 'undefined') document.write(`Error while fetching schedule: ${JSON.stringify(error)}`);
            console.error('Error while fetching schedule', error);
        }
    );
}

export function clearSchedule() {
    const paraTypes = document.getElementsByClassName("paraType");
    const paraNames = document.getElementsByClassName("paraName");

    Array.from(paraTypes).forEach((paraType) => {
        paraType.innerText = "-"        
    });
    Array.from(paraNames).forEach((paraName) => {
        paraName.innerText = "-"        
    });
}

export function changeWeek() {
    isWeekEven = !isWeekEven;
    console.log(isWeekEven);
    const weekStatus = document.getElementById("week-status");

    clearSchedule();
    
    if (isWeekEven) {
        weekStatus.innerText = "Неделя Четная";
        console.log("Неделя Четная");
    } else {
        weekStatus.innerText = "Неделя Нечетная";
        console.log("Неделя Нечетная");
    }

    updateSchedule();
}

var isWeekEven = checkWeek();

updateSchedule();
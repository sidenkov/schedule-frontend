const Parse = require('parse/node');

Parse.serverURL = 'https://schedule.back4app.io'; // This is your Server URL
Parse.initialize(
    'TmOSA86376clw7ZRIl5YSuSQbrh6Ty5JjZbFxCLP', // This is your Application ID
    'lUECwfyAVQSBo8NfVo2k2jrxGzYFVYGpAFghIQhY', // This is your Javascript key
);


var isWeekEven = false;

const schedule = Parse.Object.extend('schedule');
const query = new Parse.Query(schedule);
// query.equalTo("day", 4);
query.equalTo("weekEven", isWeekEven);

query.find().then(
    (results) => {
        if (typeof document !== 'undefined') {
            // console.log(`${JSON.stringify(results)}`);

            for (let i = 0; i < results.length; i++) {
                // console.log(results[i].get('name'));
                const num = results[i].get('num');
                const day = results[i].get('day');
                console.log(`name-day${day}-para${num+1}`);
                console.log(`type-day${day}-para${num+1}`);
                
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


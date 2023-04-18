const { push, pushFirestore1, pushFirestore2, pushReports1, pushReports2, pushVisMaintenance1, pushVisMaintenance2, pushOhMaintenance1, pushOhMaintenance2 } = require('./utils.js');
const { sendEmailVisual, sendEmailOverhaul } = require('./email')
const { getDatabase, ref, set, onValue } = require('firebase/database');

let pushEnabled = true;

let lastPushReportsTime1 = null;
let lastPushReportsTime2 = null;
let lastPushMaintenance1 = null;
let lastPushMaintenance2 = null;
const cooldown = 30 * 60 * 1000; // cooldown period in milliseconds

  const db = getDatabase();
  const starCountRef = ref(db, "/");

  let timeToFailure1 = 9000000;
  let timeToFailure2 = 9000000;
  
  function setTimeToFailure1(newValue) {
    timeToFailure1 = newValue;
  }
  
  function setTimeToFailure2(newValue) {
    timeToFailure2 = newValue;
  }
  
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    setTimeToFailure1(parseInt(data.next_maintenance.sootblower));
    setTimeToFailure2(parseInt(data.next_maintenance.boiler));
  });

function start() {
  console.log('Server is Running!');

  setInterval(() => {
    let d = new Date();
    let timestamp = d.toLocaleString("id-ID");
    let hours = d.getHours();
    let minutes = d.getHours();
    let seconds = d.getSeconds();

    // get vibration data
    let value1 = 0;
    let value2 = 0;

    function setValue1(newValue) {
      value1 = newValue;
    }
    
    function setValue2(newValue) {
      value1 = newValue;
    }
    
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setValue1(parseInt(data.engine1.data));
      setValue2(parseInt(data.engine2.data));
    });

    // push to db on 4 hours    
    if (((hours == 0) || (hours == 4) || (hours == 8) || (hours == 12) || (hours == 16) || (hours == 20)) && minutes == 0 && seconds == 0 ) {
      pushFirestore1(value1, timestamp);
      pushFirestore2(value2, timestamp);
    }
    
    // decrement ttf
    if (value1 < 0.9 && value1 > 0.3) {
      timeToFailure1 -= 1;
    }
    
    if (value2 < 0.9 && value2 > 0.3) {
      timeToFailure2 -= 1;
    }
    
    if (value1 < 0.3 ) {
      timeToFailure1 -= 0.5;
    }
    
    if (value2 < 0.3 ) {
      timeToFailure2 -= 0.5;
    }
    
    // decrement ttf and request maintenance
    if (value1 >= 0.9) {
      timeToFailure1 -= 5;
      const now = new Date();
      if (!lastPushReportsTime1 || now - lastPushReportsTime1 >= cooldown) {
        lastPushReportsTime1 = now;
        pushReports1(value1, timestamp);
        console.log(timestamp);
        sendEmailVisual(value1, "Sootblower", timestamp, "18220013@std.stei.itb.ac.id");
        sendEmailVisual(value1, "Sootblower", timestamp, "18220087@std.stei.itb.ac.id");
        sendEmailVisual(value1, "Sootblower", timestamp, "18220041@std.stei.itb.ac.id");
      }

      if (!lastPushMaintenance1 || now - lastPushMaintenance1 >= (cooldown + 260000)) {
        lastPushMaintenance1 = now;
        pushVisMaintenance1(timestamp);
      }
    }
    
    if (value2 >= 0.9) {
      timeToFailure2 -= 5;
      const now = new Date();
      if (!lastPushReportsTime2 || now - lastPushReportsTime2 >= cooldown) {
        lastPushReportsTime2 = now;
        pushReports2(value2, timestamp);
        sendEmailVisual(value2, "Boiler", timestamp, "18220013@std.stei.itb.ac.id");
        sendEmailVisual(value2, "Boiler", timestamp, "18220087@std.stei.itb.ac.id");
        sendEmailVisual(value2, "Boiler", timestamp, "18220041@std.stei.itb.ac.id");
      }

      if (!lastPushMaintenance2 || now - lastPushMaintenance2 >= (cooldown + 260000)) {
        lastPushMaintenance2 = now;
        pushVisMaintenance2(timestamp);
      }
    }
    
    if (pushEnabled) {
      if (timeToFailure1 <= 1) {
        // reset ke 4 bulan
        timeToFailure1 = 10368000;
      }

      if (timeToFailure2 <= 1) {
        // reset ke 4 bulan
        timeToFailure2 = 10368000;
      }

      let pushke1 = timeToFailure1;
      let pushke2 = timeToFailure2;

      push(pushke1, pushke2);
    }

    if ( timeToFailure1 <= 259200 ) {
      const now = new Date();
      if (!lastPushMaintenance1 || now - lastPushMaintenance1 >= (cooldown + 260000)) {
        lastPushMaintenance1 = now;
        pushOhMaintenance1(timestamp);
        sendEmailOverhaul("Sootblower", timestamp, "18220013@std.stei.itb.ac.id");
        sendEmailOverhaul("Sootblower", timestamp, "18220087@std.stei.itb.ac.id");
        sendEmailOverhaul("Sootblower", timestamp, "18220041@std.stei.itb.ac.id");
      }
    }

    if ( timeToFailure2 <= 259200 ) {
      const now = new Date();
      if (!lastPushMaintenance2 || now - lastPushMaintenance2 >= (cooldown + 260000)) {
        lastPushMaintenance2 = now;
        pushOhMaintenance2(timestamp);
        sendEmailOverhaul("Boiler", timestamp, "18220013@std.stei.itb.ac.id");
        sendEmailOverhaul("Boiler", timestamp, "18220087@std.stei.itb.ac.id");
        sendEmailOverhaul("Boiler", timestamp, "18220041@std.stei.itb.ac.id");
      }
    }
    
    
  }, 1000);
}

module.exports = { start, pushEnabled };
const { push1, push2, pushFirestore1, pushFirestore2 } = require('./utils.js');

let chanceOfProblem = 0.9
let prevValue = 0.5; // nilai awal

function randomizer() {
  const delta = Math.random() - 0.5; // nilai random antara -0.5 hingga 0.5
  const newValue = prevValue + delta / 10; // nilai baru dengan jarak yang tidak terlalu jauh dari nilai sebelumnya

  if (newValue < 0) {
    prevValue = 0; // batas bawah adalah 0
  } else if (newValue > 1.2) {
    prevValue = 1.2; // batas atas adalah 1.2
  } else {
    prevValue = newValue;
  }

  if (prevValue >= 0.3 && prevValue <= 0.9) {
    // nilai baru memiliki peluang 70% berada di range 0.3-0.9
    if (Math.random() <= chanceOfProblem) {
      return prevValue.toFixed(3); // hasil return dengan 3 angka di belakang koma
    }
  }

  return prevValue.toFixed(3); // hasil return dengan 3 angka di belakang koma
}

// contoh penggunaan fungsi randomizer dengan interval 1 detik

function start() {
  console.log('Server is Running!');
  setInterval(() => {
    const value1 = randomizer();
    let d = new Date();
    let timestamp = d.toLocaleString("id-ID");
    let minutes = d.getSeconds();
    push1(value1, timestamp);
    const value2 = randomizer();
    push2(value2, timestamp);
    console.log(minutes);
    if (minutes==0) {
      pushFirestore1(value1, timestamp);
      pushFirestore2(value2, timestamp);
    }
  }, 1000);
}

start();
const nodemailer = require('nodemailer');

async function sendEmailVisual(value, engine, timestamp, recipients) {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: 'plnsmartmaintenance@gmail.com', // your email address
                pass: 'keabcincccamkirx' // your email password
            }
        });

        let info = await transporter.sendMail({
            from: '"PLN Smart Maintenance System" <plnsmartmaintenance@example.com>', // sender name and address
            to: recipients, // recipient email address
            subject: `Vibration Alert Triggered on ${engine}`, // email subject
            html: `<p>Dear Engineers,</p>
            <p>This email is to inform you that there has been a vibration alert triggered due to the engine vibration value exceeding the predefined threshold.</p>
            <p>Engine: ${engine}</p>
            <p>Value: ${value} t/h</p>
            <p>Timestamp: ${timestamp}</p>
            <p>Please take appropriate action as soon as possible to investigate and resolve the issue. If necessary, please refer to the engine's manual or contact our technical support team for assistance.</p>
            <p>Thank you for your attention.</p>

            `
        });

        console.log('Message sent: %s', info.messageId);
    } catch (err) {
        console.log(err);
    }
}

async function sendEmailOverhaul(engine, timestamp, recipients) {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: 'plnsmartmaintenance@gmail.com', // your email address
                pass: 'keabcincccamkirx' // your email password
            }
        });

        let info = await transporter.sendMail({
            from: '"PLN Smart Maintenance System" <plnsmartmaintenance@example.com>', // sender name and address
            to: recipients, // recipient email address
            subject: `Scheduled ${engine} Overhaul Maintenance`, // email subject
            html: `<p>Dear Engineers,</p>
            <p>This email is to inform you that scheduled overhaul maintenance has been planned for the following engine:</p>
            <p>Engine: ${engine}</p>
            <p>Date: ${getDate(timestamp)}</p>
            <p>Time: ${getTime(timestamp)}:00:00 WIB</p>
            <p>Please ensure that all necessary preparations are made to facilitate the maintenance procedure. Kindly refer to the engine's manual for further information on the overhaul process.</p>
            <p>Thank you for your attention.</p>

            `
        });

        console.log('Message sent: %s', info.messageId);
    } catch (err) {
        console.log(err);
    }
}

function getDate(dateTimeString) {
    const dateArray = dateTimeString.split(', ')[0].split('/');
    const day = parseInt(dateArray[0]) + 3;
    const month = dateArray[1];
    const year = dateArray[2];
  
    return `${day}/${month}/${year}`;
}

function getTime(dateTimeString) {
    if (!dateTimeString || typeof dateTimeString !== 'string') {
      return '';
    }
    
    const dateTimeArray = dateTimeString.split(', ');
    if (dateTimeArray.length !== 2) {
      return '';
    }
    
    const [date, time] = dateTimeArray;
    const [day, month, year] = date.split('/');
    const [hour, minute, second] = time.split('.');
    
    return (hour);
  }

module.exports = { sendEmailVisual, sendEmailOverhaul }
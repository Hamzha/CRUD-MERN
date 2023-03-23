require('dotenv').config();
const Agenda = require('agenda');
const Number = require('../models/number');

module.exports = () => {
  try {
    const agenda = new Agenda({ db: { address: process.env.MONGOURI } });

    agenda.define('saving number', async () => {
      const number = new Number({
        number: 1,
      });
      await number.save();
    });

    (async function () {
      // IIFE to give access to async/await
      try {
        await agenda.start();
        console.log('start --');

        await agenda.on('ready', async () => {
          console.log('connected');
        });

        await agenda.schedule('1 minutes', 'saving number');
        agenda.on('start', () => {
          console.log('start');
        });
        agenda.on('complete', () => {
          console.log('Complete');
        });
        agenda.on('success', () => {
          console.log('success');
        });
        agenda.on('fail', (err) => {
          console.log('fail', err.message);
        });
      } catch (err) { console.log(err); }
    }());
  } catch (err) {
    console.log('error', err);
  }
};

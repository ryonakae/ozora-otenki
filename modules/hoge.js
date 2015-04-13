var app = require('../app');
var cronJob = require('cron').CronJob;

new cronJob({
  cronTime: '1-59/2 * * * * *',
  onTick: function() {
    console.log(app.get('options').test);
  },
  start: true,
  timeZone: 'Asia/Tokyo'
});
console.log('cron job is running.');
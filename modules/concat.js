var sox = require('sox-audio');
var soxCommand = sox();
var outputFile = './source/audio.wav';

var fileList = [
  './source/01.wav',
  './source/02.wav',
  './source/03.wav'
];

fileList.forEach(function addInput(fileName) {
  soxCommand.input(fileName);
});
soxCommand
  .output(outputFile)
  .concat()
  .run();
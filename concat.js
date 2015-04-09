var sox = require('sox-audio');
var soxCommand = sox();

// concat
var concatAudio = function(fileList, outputFile) {
  fileList.forEach(function addInput(fileName) {
    soxCommand.input(fileName);
  });
  soxCommand.output(outputFile).concat();
  addStandardListeners(soxCommand);
  soxCommand.run();
  return soxCommand;
}

// mix
var mixAudio = function(fileList, outputFile) {
  fileList.forEach(function addInput(fileName) {
    soxCommand.input(fileName);
  });
  soxCommand.output(outputFile).combine('mix');
  addStandardListeners(soxCommand);
  soxCommand.run();
  return soxCommand;
}

// job
var job = function() {
  var fileList = [
    './source/01.wav',
    './source/02.wav',
    './source/03.wav'
  ];
  var outputFile = './source/audio.wav';
  console.log('\nConcatenate example ');
  concatAudio(fileList, outputFile);
};

// event listener
var addStandardListeners = function(soxCommand) {
  soxCommand.on('start', function(soxCommandLine) {
    console.log('Spawned sox with soxCommand ' + soxCommandLine);
  });
  soxCommand.on('progress', function(progress) {
    console.log('Processing progress: ', progress);
  });
  soxCommand.on('error', function(err, stdout, stderr) {
    console.log('Cannot process audio: ' + err.message);
    console.log('Sox soxCommand Stdout: ', stdout);
    console.log('Sox soxCommand Stderr: ', stderr)
  });
  soxCommand.on('end', function() {
    console.log('Sox soxCommand succeeded!');
  });
};

// run job
job();
// var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var ffmpegCommand = ffmpeg();
var sox = require('sox-audio');
var soxCommand = sox();
var async = require('async');

var videoFile = './source/video.mp4';
var audioFile = './source/audio.wav';
var outputFile = './source/output.mp4';
var stream;


async.waterfall([
  // concat audio
  function(callback){
    var fileList = [
      './source/01.wav',
      './source/02.wav',
      './source/03.wav'
    ];

    fileList.forEach(function addInput(fileName) {
      soxCommand.input(fileName);
    });
    soxCommand
      .output(audioFile)
      .concat()
      .run();

    callback(null);
  },
  // movie encode
  function(){
    ffmpegCommand
      .addInput(videoFile)
      .addInput(audioFile)
      .outputOptions(
        '-y',
        '-vcodec', 'copy',
        '-acodec', 'aac',
        '-strict', 'experimental',
        '-ac', 2,
        '-ab', '64k',
        '-ar', 44100,
        '-map', '0:0',
        '-map', '1:0'
      )
      .saveToFile(outputFile)
      .on('end', function(){
        console.log('success!');
      });
  }
]);
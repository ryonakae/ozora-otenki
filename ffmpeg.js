// var express = require('express');
// var spawn = require('child_process').spawn;
// var app = express();


// app.get('/', function(req, res, next) {
//   ffmpeg = spawn('ffmpeg', [
//     '-y',
//     '-i', './source/video.mp4',
//     '-i', './source/bgm.mp3',
//     '-map', '0:0',
//     '-map', '1:0',
//     '-vf','scale=320:240',
//     '-f', 'mp4',
//     '-movflags', 'frag_keyframe+empty_moov',
//     'pipe:1'
//   ]);

//   res.set('Content-Type', 'video/mp4');
//   ffmpeg.stdout.pipe(res);
// });

// app.listen(3000);


// ffmpeg = spawn('ffmpeg', [
//   '-y',
//   '-i', './source/video.mp4',
//   '-i', './source/bgm.mp3',
//   './source/output.mp4'
// ]);


var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();

command
  .outputOptions(
    '-y',
    '-i', './source/video.mp4',
    '-i', './source/bgm.mp3',
    '-vcodec', 'copy',
    '-acodec', 'aac',
    '-strict', 'experimental',
    '-ac', 2,
    '-ab', '64k',
    '-ar', 44100,
    '-map', '0:0',
    '-map', '1:0'
  )
  .save('./source/output.mp4');
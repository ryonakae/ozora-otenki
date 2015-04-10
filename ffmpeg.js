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
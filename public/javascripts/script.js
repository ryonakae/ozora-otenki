$(document).ready(function(){
  // 初期化
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var video = document.getElementById("video");
  var w = canvas.width;
  var h = canvas.height;

  // 画像オブジェクト作るなど
  var img = new Image();
  img.src = 'http://f.cl.ly/items/1d1G2Y1F3D3U1I2C0P2B/37598705.jpeg';

  // 画像ロード後の処理
  img.onload = function(){
    // 文字
    // フォントサイズとか
    ctx.font = "Bold 200px 'Avenir Next'";
    // 文字描画
    ctx.fillText("OZORA OTENKI", 10, 150);

    // 画像描画
    // 描画モード(文字でくり抜く)
    ctx.globalCompositeOperation = 'source-atop';
    // ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(video,0,0,w,h);
    video.play();
  };
});
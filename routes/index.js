exports.index = function(request, response){
  response.render('index', {
    title: 'Ozora Otenki',
    description: '今日のお空はどんな空〜❓ 大空お天気の時間です✨'
  });
}
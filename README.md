# 大空お天気
今日のお空はどんな空〜❓ 大空お天気の時間です✨


## セットアップ
### npm packageをインストールする

    $ npm install


### Bower packageをインストールする

    $ bower install


### local_run.shを作成する

    $ touch local_run.sh


### local_run.shの編集
`xxxxx`にKEYなどを入力して保存、commitしないように  
TwitterのAPI Keyは開発用アカウントのもの

    #!/bin/sh

    export TWITTER_KEY=xxxxx
    export TWITTER_SECRET=xxxxx
    export TWITTER_TOKEN=xxxxx
    export TWITTER_TOKEN_SECRET=xxxxx
    export OPENWEATHERMAP_API_KEY=xxxxx

    npm start


### 開発スタート

    $ sh local_run.sh


### ローカルにPostgreSQLの環境構築
#### HomebrewでPostgreSQLインストールする

    $ brew install postgresql
    
    # 初期化？
    $ initdb /usr/local/var/postgres -E utf8
    
    # PostgreSQL起動
    $ pg_ctl start
    
    # PostgreSQL停止
    $ pg_ctl stop
    
#### HerokuのDBをローカルにPull

    $ heroku pg:pull HEROKU_POSTGRESQL_ROSE_URL mylocaldb
    
`mylocaldb`というDBを作成&そこにPull  
`HEROKU_POSTGRESQL_ROSE_URL`の`ROSE`は時と場合によって異なる

#### DB一覧

    $ psql -l
    
#### DBに接続

    $ psql -d mylocaldb
    
#### PostgreSQLコマンド
##### ユーザー一覧

    # \du
    
##### DB一覧

    # \l
    
##### テーブル一覧

    # \d
    
##### テーブルの項目一覧

    # \d テーブル名
    
##### 一番最近の天気情報を取り出す(1日分)

    # select * from weather_logs order by id desc offset 0 limit 1;
    
##### DBから切断

    # \q


### Herokuに環境変数を追加する
TwitterのAPI Keyは本番用アカウントのもの

    $ heroku config:add TWITTER_KEY=xxxxx --app ozora-otenki
    $ heroku config:add TWITTER_SECRET=xxxxx --app ozora-otenki
    $ heroku config:add TWITTER_TOKEN=xxxxx --app ozora-otenki
    $ heroku config:add TWITTER_TOKEN_SECRET=xxxxx --app ozora-otenki
    $ heroku config:add OPENWEATHERMAP_API_KEY=xxxxx --app ozora-otenki
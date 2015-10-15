# 大空お天気
今日のお空はどんな空〜❓ 大空お天気の時間です✨

## setup
Install npm package.

    $ npm install

Install Bower package.

    $ bower install

Create `local_run.sh`.

    $ touch local_run.sh

Then, edit `local_run.sh`.  
※ TwitterのAPI Keyは開発用アカウントのもの

    #!/bin/sh

    export TWITTER_KEY=xxxxx
    export TWITTER_SECRET=xxxxx
    export TWITTER_TOKEN=xxxxx
    export TWITTER_TOKEN_SECRET=xxxxx
    export OPENWEATHERMAP_API_KEY=xxxxx

    npm start

Start development.

    $ sh local_run.sh

Add environment variable to Heroku.  
※ TwitterのAPI Keyは本番用アカウントのもの

    $ heroku config:add TWITTER_KEY=xxxxx --app ozora-otenki
    $ heroku config:add TWITTER_SECRET=xxxxx --app ozora-otenki
    $ heroku config:add TWITTER_TOKEN=xxxxx --app ozora-otenki
    $ heroku config:add TWITTER_TOKEN_SECRET=xxxxx --app ozora-otenki
    $ heroku config:add OPENWEATHERMAP_API_KEY=xxxxx --app ozora-otenki
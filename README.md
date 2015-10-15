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

    #!/bin/sh

    export TWITTER_KEY=xxxxx
    export TWITTER_SECRET=xxxxx
    export TWITTER_TOKEN=xxxxx
    export TWITTER_TOKEN_SECRET=xxxxx
    export OPENWEATHERMAP_API_KEY=xxxxx

    npm start

Add environment variable to Heroku.

    $ heroku config:add TWITTER_KEY=xxxxx
    $ heroku config:add TWITTER_SECRET=xxxxx
    $ heroku config:add TWITTER_TOKEN=xxxxx
    $ heroku config:add TWITTER_TOKEN_SECRET=xxxxx
    $ heroku config:add OPENWEATHERMAP_API_KEY=xxxxx
const config = require('./config');
const twit = require('twit');
const tweeter = new twit(config);

const retweet = () => {
  let params = {
    q: '#javascript',
    result_type: 'recent',
    count: 100,
  };

  tweeter.get('search/tweets', params, (err, data, res) => {
    let tweets = data.statuses;
    if (!err) {
      for (let tweet of tweets) {
        let retweetId = tweet.id_str;
        tweeter.post(
          'statuses/retweet/:id',
          { id: retweetId },
          (err, response) => {
            if (response) {
              console.info('RETWEETED:', retweetId, tweet.text);
            }
            if (err) {
              console.info('ERROR: Something went wrong. No retweet.');
            }
          }
        );
      }
    }
  });
};

setInterval(retweet, 15000);

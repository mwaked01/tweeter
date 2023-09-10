/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  }

  const createTweetElement = function (tweet) {
    const $tweet = $(`<article class="tweet">
  <header>
  <p><img src="${tweet['user'].avatars}">${tweet['user'].name}</p>
          <p style ="color:#c9d0dc; font-weight:600" >${tweet['user'].handle}</p>
        </header>
        ${tweet['content'].text}
        <footer>
        ${tweet['created_at']}
          <div class="icons">
            <i class="fa-solid fa-flag " ></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart" ></i>
          </div>
        </footer>
        </article>
        <br>`);
    return $tweet;
  };

  renderTweets(data);

  // const $tweet = createTweetElement(tweetData);

  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet);
});
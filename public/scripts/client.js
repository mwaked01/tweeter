$(document).ready(function () {
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };

  const createTweetElement = function (tweet) {
    const $tweet = $(`<article class="tweet">
  <header>
  <p><img src="${tweet['user'].avatars}">${tweet['user'].name}</p>
          <p style ="color:#c9d0dc; font-weight:600" >${tweet['user'].handle}</p>
        </header>
        ${tweet['content'].text}
        <footer>
        ${timeago.format(tweet['created_at'])}
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

  const $form = $('#tweet-form');
  
  $form.submit((event) => {
    let $tweetText = $("#tweet-text").val();
    //stop default submit from refreshing the page
    event.preventDefault();
    if ($tweetText === "" || $tweetText === null) {
      alert("Invalid Entry!");
    } else if ($tweetText.length > 140) {
      alert("Tweet Exceeds limit of 140 characters.");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $form.serialize(),
      });

    }
  });

  const loadTweets = function () {
    const tweetsPage = 'http://localhost:8080/tweets';
    $.ajax(tweetsPage, { method: 'GET' })
      .then(function (tweets) {
        console.log('Success: ', tweets);
        renderTweets(tweets);
      });
  };

  loadTweets();

});
$(document).ready(function() {
  const renderTweets = function(tweet) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const safeHTML = `<p>${escape(tweet['content'].text)}</p>`;
    const $tweet = $(`<article class="tweet">
  <header>
  <p><img src="${tweet['user'].avatars}">${tweet['user'].name}</p>
          <p style ="color:#c9d0dc; font-weight:600" >${tweet['user'].handle}</p>
        </header>
        ${safeHTML}
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

  $form.submit(function(event) {

    let $tweetText = $("#tweet-text").val();
    
    //stop default submit from refreshing the page
    event.preventDefault();

    const $errorMessage = $("#error-message");
    const $errorText = $(".error-text");

    if ($tweetText === "" || $tweetText === null) {
      $errorText.text("Invalid Entry!"); // Set error message text
      $errorMessage.slideDown();
    } else if ($tweetText.length > 140) {
      $errorText.text("Tweet Exceeds limit of 140 characters.");
      $errorMessage.slideDown();
    } else {
      
      $errorMessage.slideUp();
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $form.serialize(),
      })
        .then(function(newTweet) {
          $("#tweets-container").empty();
          loadTweets();
        });
        
    }
  });

  const loadTweets = function() {
    const tweetsPage = 'http://localhost:8080/tweets';
    $.ajax(tweetsPage, { method: 'GET' })
      .then(function(tweets) {
        console.log('Success: ', tweets);
        for (let tweet of tweets) {
          renderTweets(tweet);
        }
      });
  };

  loadTweets();

});
/*eslint-env jquery*/
'use strict';

function getQuote() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      headers: {
        'X-Mashape-Key':
        'v4XBsTKlggmshcAwzc9yuSpHSiq9p1mhaG7jsnf7RrE8wAGNlU',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url:
      'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
      success: function(response) {
        resolve(response);
      },
      error: function(error) {
        reject(error);
      }

    });
  });
}

function displayQuote() {
  getQuote().then(function(response) {
    var data = JSON.parse(response);
    console.log(data.quote);
    $('blockquote p').html(JSON.stringify(data.quote));
    $('blockquote footer').html(data.author);
    $('.twitter-share-button').show();
    $('#getMessage span').removeClass('fa-pulse');
    $('.twitter-share-button').attr( 'href', 'https://twitter.com/intent/tweet?text=' + encodeURI(data.quote + ' - ' + data.author) );
  }).catch(function(error) {
       //   var data = JSON.parse(error);
       $('blockquote').html('Erreur : ' + error.statusText);
       $('#getMessage span').removeClass('fa-pulse');
       $('.twitter-share-button').hide();
     });
}

$(document).ready(function() {
  $('.twitter-share-button').hide();
  displayQuote();
  $('#getMessage').on('click', function() {
    $('#getMessage span').addClass('fa-pulse');
    displayQuote();
  });

});




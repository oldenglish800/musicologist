const musicInfo = [];

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}

$('#getPlaylistBtn').click(function (event) {
  var itunesURL = 'https://itunes.apple.com/search'
  for (var i = 0; i < musicInfo.length; i++) {
    var musicKeyword = musicInfo[i];
    let itunesKeys = { 
      term: musicKeyword,
      limit: 10,
      format: "json"
    };

// JSON call for API + data function
    $.getJSON( itunesURL, itunesKeys, function(data){
        $.each(data.results, function(i,result) {
         // console.log("Music Genie Working...");
          var newItem = "<p>";
          newItem += result.artistName + ": " + result.trackName + "</p>";
          $("#results").append(newItem);
        })
})
  };
  // You may use anything from musicInfo.
  console.log('Testing Music Call');
});
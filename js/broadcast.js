$('.broadcast > div').click((e) => {
    var gameDiv = $(this); // Get which div was clicked here
    $('#twitch').children().fadeOut(500).promise().then(function() {
        $('#twitch').empty();
       
            var broadcastName = $(e.target).text(); // Get the game name
            console.log(broadcastName);
            var twitchApi = "https://api.twitch.tv/kraken/streams?" +broadcastName; // Build the URL here
            $.getJSON(twitchApi, function(json) {
                setData(json.streams)
        });

        function setData(twitchData) {
			var i = 0;
            var j = twitchData.length > (i + 9) ? (i + 9) : twitchData.length; for
				(; i < j; i++) {
                var streamGame = twitchData[i].game;
                var streamThumb = twitchData[i].preview.medium;
                var streamVideo = twitchData[i].channel.name;
                var img = $('<img style="width: 250px; height: 250px;" src="' + streamThumb + '"/>');
                $('#twitch').append(img);
                img.click(function() {
                    $('#twitch iframe').remove()
                    $('#twitchframe').append( '<iframe frameborder="0" style="overflow:hidden; margin-left: 25px; width:400px; height:250px; position: fixed; top: 0; margin-top: 23.33%;" src="http://player.twitch.tv/?channel=' + streamVideo + '"></iframe>');
                });
            }
        }
            $('#load').click(function() {
        setData();
    }); 
            });
            
});


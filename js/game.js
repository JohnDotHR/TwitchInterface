$('.games > div').click((e) => {
    var gameDiv = $(this); 
    $('#twitch').children().fadeOut(500).promise().then(function() {
        $('#twitch').empty();
       
            var gameName = $(e.target).text().replace(' ', '%20');
            console.log(gameName);
            var twitchApi = "https://api.twitch.tv/kraken/streams?game=" +gameName; // Build the URL here
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

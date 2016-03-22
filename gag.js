var request = require.safe("request"),querystring = require.safe("querystring");

exports.match = function(text, commandPrefix) {
    return text.startsWith(commandPrefix + 'gag');
};

exports.help = function() {
    return [[this.commandPrefix + 'gag','9GAG ! <3','Displays random image from HOT list on 9ga']];
};


exports.run = function(api, event) {
	api.sendTyping(event.thread_id);	

	request.post(
	        {uri:"http://infinigag.k3min.eu/hot"},
	        function(error, response){
        	if (error || response.statusCode !== 200) {
        	    sendMessage("Dafuq? What was I supposed to do?",event.thread_id);
        	    return;
        	}
        	var json_r = JSON.parse(response.body)['data'];
		var rnd = json_r[Math.floor(Math.random() * json_r.length) + 0];
		
       		var img_url=(rnd['media']?rnd['media']['mp4']:rnd['images']['large']);
		api.sendImage("url",img_url,rnd['caption'],event.thread_id);    
	});

};

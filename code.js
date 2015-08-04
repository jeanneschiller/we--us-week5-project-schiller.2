var textApp= {};

textApp.lines = [
	"It's been really fun hanging out! I just don't think that we are in the same place right now.",
	"You should be with someone who can give you the attention that you deserve.",
	"I'm in a place right now where I need to focus on myself.",
	"I think it would be best if we see other people.",
	"You are really fun and smart and I’ve had a great time with you.  I’m just not looking for something serious right now.",
]; //END OF LINES

textApp.lineDisplay = function(){
	$(".help").on("click", function(e){
		e.preventDefault();
		$(".query").empty();
		$("body").removeClass("green");
		$("body").removeClass("red");
		$(".tone_container").removeClass("visible");
		var random = Math.floor(Math.random() * $(textApp.lines).length);
		console.log(random);
		$("textarea").html(textApp.lines[random]);
	});
};//END OF DISPLAY LINES
//if you start to type in textare and then remove text and the click help
//it doesn't work?

textApp.verify = function(userInput){
	$.ajax({
		url:"http://access.alchemyapi.com/calls/text/TextGetTextSentiment",
		type: "GET",
		dataType: "json",
		data : {
			apikey: "7e2803e3acd21310835a5d657f7df588d9967286",
			text: userInput,
			outputMode: "json",
			docSentiment:[],
		},
		success: function(res){
			console.log(res);
			textApp.displayTone(res.docSentiment);
		}
	});
}; //END OF VERIFY

textApp.displayTone = function(data){
	$(".tone_container").addClass("visible");
	var tone = data.type;
	$(".tone_container p").text(tone);
	console.log(data.type)
	var score = data.score;
	console.log(data.score)
	if(score > 0){
		$("body").removeClass("red").addClass("green");
	}else if(score < 0){
		$("body").removeClass("green").addClass("red");
	}else {
		$("body").removeClass("green");
		$("body").removeClass("red"); //find out why they work when separated but not linked.
	}
}; //END OF DISPLAY TONE
//*******hold on this section********
//need to get the keyword array
//inside the object the 2nd item is sentiment - it is also an object
//retrieve the value in the sentiment object
// the 3rd object is text.  retrieve the value string and apply a class to it.
//**Text document content (must be uri-argument encoded) 
//**(required parameter)
// textApp.boldKey = function(data){
// }; //END OF BOLD KEY WORK ON GETTING THIS RUNNING

textApp.submitText = function(){
	$(".test").on("click", function(evnt){
		evnt.preventDefault();
		var userInput = $(".query").val();
		textApp.verify(userInput);
	});
};
textApp.init = function(){
	textApp.submitText();
	textApp.lineDisplay();

};
$(document).ready(function(){
	textApp.init();
});
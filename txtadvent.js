// to do:
// link n <-> north, e <-> east, w <-> west, s <-> south
// make use of typed.js and create occasional typos

/* Map
      ___ 
      |4|
      ���
       |
___   ___   ___      ___
|0| - |1| - |2|      |E|
���   ���   ���      ���
             |
            ___	
            |3|	
            ���			
0: colon
1: starting area
2: engineer
3: bug					
4: expansion?	
*/

// possible items: beard, semicolon
var inventory = {};

var room = 1; // which room
var numBlurb = 0; // number of blurbs

var map = new Array ();

err = "Inconceivable! My brilliant mind can't understand what you're trying to do! Maybe you mistyped, or maybe the item you're using doesn't exist.";

convo0 = "You ask if there are any cookies for you to eat. You hear some frenzied chomping noises in response, then a concise \"Nope!\"";
convo1 = "The bug seems to shiver even more violently when you reach out for its teddybear. It doesn't seem willing to give up its only companion."
convo2 = "The sign reads, \"LOST PET<br>looking for semicolon<br>very lonely, much sad, wow\"";
convo3 = "The bug shivers uncontrollably as you try to calm it down.";
convo4 = "You walk into a wall. Ouch.";
convo5 = "The bug bats the beard away.";
convo6 = "Don't be silly, colons don't have mouths!";
convo7 = "The fireflies scatter when you attempt to capture one.";
convo8 = "\"Guess what that colon's called now? <i>A \'semi\'colon.</i> Haha, get it? Because it's only halfway a colon now...\" The voice trails off as it notices you aren't impressed by the pun.";
convo9 = "O-oh, how rude!! Are you insinuating I can't grow a magnificent beard of my own?!";
convo10 = "The ghost\'s eyes gloss over, but its hands continue to tippity tap away at the keyboard.";
convo11 = "There seems to be a forcefield around the engineer that prevents you from giving the beard back.";

act0 = "As you approach, it stares at you with blood-shot eyes... err, ghostly blood-shot eyes. Then it finally squeaks out, \"It's dangerous to go alone! Take this.\"";
act1 = "You are suddenly inspired and stick the beard on the colon. It looks somewhat like a semicolon now. It seems absolutely delighted. You decide to take it along for a ride. Maybe it\'ll come in handy.";

map[0] = {
  visits: 0,
	// if semicolon in inventory, display b2, else b0
	b0: "You trudge westward. Illuminated by the faint glow of fireflies, a colon stares at you solemnly, stroking an imaginary beard.",
	b1: "A vast emptiness stretche before you. A colon wearing a fake beard beams at you from your hand.",
	conversation: [{"talk", convo6},
								 {"north", convo4},
								 {"west", convo4},
								 {"south", convo4},
								 {"firefly", convo7},
								 {"fireflies", convo7}
								],
	actions: [{"beard", null}
					 ], // function to push colon into inventory
	exits: [{"east", "1"}
				 ]
};

map[1] = {
  visits: 0,
	// if visits = 0, display b0, else if visits = 1, display b1, else display b2
	b0: "It is very dark. If you continue, you are likely to be eaten by a bug." +
			"<br/><br/>Suddenly, a voice booms out from above. \"<b><i>H-E-L-L-O</i></b>!! It's been a while since someone visited. I'm the ruler of this domain, and rules dictate that I must send unsuspecting travelers on a quest to save my kingdom. Here's your mission of the day - defeat the malevolent wandering bug in the dark! Aaany questions?\"",
	b1: "You're about to say something when the voice butts in. \"Right, I forgot to mention... since 		there's no light in here, I set down some cookies so that you can find your way arou� why cookies?! Uh, it's definitely not because I accidentally spilled them when I turned the lights off... yeah, no way...\"" +
			"<br/><br/>True to the voice's word, you sniff out three trails of cookies leading north, west, and east. <b>If you'd rather not be here, however, you can probably intimidate the voice into turning on the lights immediately to navigate the site.</b>",
	b2: "You\'re in the room where you started. The three trails of cookies leading north, west, and east are still there, getting staler by the second. Somewhere above you, the voice is happily humming. You could intimidate it into letting you navigate the site immediately.",
	conversation: [{"cookies", convo0}, // if input string contains the string, then accept
								 {"cookie", convo0},
								 {"eat", convo0},
								 {"talk", convo0},
								 {"south", convo4},
								 {"semicolon", convo8},
								 {"colon", convo8},
								 {"beard", convo9}
								],
	actions: [],
	exits: [{"west", "0"},
					{"north", "4"},
			   	{"east", "2"},
					{"intimidate", "E"}
				 ]
};

map[2] = {
  visits: 0,
	b0: "To the east, you find the ghost of an engineer feverishly working on its laptop.",
	conversation: [{"talk", convo10},
								 {"north", convo4},
								 {"east", convo4},
								 {"beard",},
								 {"semicolon", convo10},
								 {"colon", convo10}
								],
	actions: [{"talk", null}
					 ], // check actions for matching word first, function to push beard into inventory
	exits: [{"west", "1"},
					{"south", "3"}
				 ]
};

map[3] = {
  visits: 0,
	b0: "In your haste to follow the trail of delicious cookies, you stumble into a shivering bug. A Malevolent Wandering Bug has appeared! ...or not. Contrary to what you heard before, the bug really seems quite harmless. It's carrying a teddybear in one arm and a crudely painted sign in the other.",
	conversation: [{"teddybear", convo1},
								 {"bear", convo1},
								 {"sign", convo2},
								 {"talk", convo3},
								 {"west", convo4},
								 {"south", convo4},
								 {"east", convo4},
								 {"beard", convo5}
								],
	actions: [],
	exits: [{"north", "2"},
					{"semicolon", "E"},
					{"colon", "E"}
				 ]
};

map[4] = {
  visits: 0,
	b0: "You saunter north to find a huge \"UNDER CONSTRUCTION\" sign blocking your way.",
	conversation: [{"north", convo4},
								 {"west", convo4},
								 {"east", convo4}
								],
	actions: [],
	exits: [{"south", "1"}
				 ]
};

function getItem() {
	if (current = 2) inventory.append ("beard");
	else if (current = 0) inventory.append ("semicolon");
}

/* Every time the viewer enters a new action, this function is called. First, the current
   blurb is found, then a new blurb is created. The caption is set to the current one and
   appended to the created blurb.
*/
function advance() {
	createBlurb();
	caption = map[0].b;
	$(function(){
		$("#blurb" + j).typed({
			strings: [caption],
			typeSpeed: 5,
			showCursor: true
		});
	});
}

/* A blurb is created.
*/
function createBlurb () {
  var area = document.getElementById("stuff");
	var para = document.createElement("p");
  para.id = "blurbc" + numBlurb; // blurb container
	area.appendChild(para);
  var span = document.createElement("span");
  span.id = "blurb" + numBlurb;
  para.appendChild(span);
	// remove previous cursor
	if (numBlurb != 0) $( "#blurbc" + (numBlurb-1) + " > span[class='typed-cursor']" ).remove();
}

function process() {
  var action = "";
  action = $("input#aLine").val();
}
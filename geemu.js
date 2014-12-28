/* background will be a room
   room should serve as an about me with the interactable objects
	 
	 --- 
	 
	 IMPORTANT: HAVE A TINY TOP BAR SEPARATE FROM CANVAS WITH QUICK LINKS TO THE OTHER "PAGES"
	 
	 must have clear instructions on how to navigate when first going to the homepage
	 
	 go near interactable object with popup:
	                      jk ignore: interactable objects must be clearly labeled FOR CONVENIENCE
	 cabinet should have [!]
	                        \__resume__
	 laptop should have [!]
												 \__portfolio__
	 mailbox with little bird should have [!]
													                 \__contact__
	 calendar should have [!]
													 \__goals__
													 
	 add a credits page with stuff - need to figure out what item to make it though
	 - money? HAHA puns... better not
													
	 insert goals: build own computer, build own browser, try building my own version of anything i see, learn better japanese
	 
	 keywords: energetic, inquisitive, dedicated
													
	 overlay popups deserve their own html, don't clutter the home code up
	 
	 ---
													
	 design thoughts: window has ocean graphics
	 transparent white curtain should be blowing in wind; light beams
	 
	 canvas should be big-ish possibly 800 x 800 because i have no idea what to do for the background behind canvas
*/

$( document ).ready( function () {
	var c = document.getElementById("can");
	var ctx = c.getContext("2d");

	var player = {
		speed: 100,
		x: c.width/2,
		y: c.height/2
	};
	
	var playerReady = false;
	var pImage = new Image();
	pImage.onload = function () {
		playerReady = true;
	};
	pImage.src = "k.png";
	
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "bg.png";

	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	/*

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);*/

	var update = function (modifier) {
		if (38 in keysDown) { // Player holding up
			player.y -= player.speed * modifier;
		}
		if (40 in keysDown) { // Player holding down
			player.y += player.speed * modifier;
		}
		if (37 in keysDown) { // Player holding left
			player.x -= player.speed * modifier;
		}
		if (39 in keysDown) { // Player holding right
			player.x += player.speed * modifier;
		}
	}

	var render = function () {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}

		if (playerReady) {
			ctx.drawImage(pImage, player.x, player.y);
		}
	};

	var main = function () {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		render();

		then = now;

		// Request to do this again ASAP
		requestAnimationFrame(main);
	};

	// Cross-browser support for requestAnimationFrame
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	var then = Date.now();
	main();
});
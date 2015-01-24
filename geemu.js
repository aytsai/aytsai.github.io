/* IMPORTANT: HAVE A TINY TOP BAR SEPARATE FROM CANVAS WITH QUICK LINKS TO THE OTHER "PAGES"
	 - hey hey use bootstrap? maybe after i get something working
	 
	 go near interactable object with popup:
	 laptop should have [!]
	                        \__resume__
	 mailbox with little bird should have [!]
													                 \__contact__
	^ it's just a letter on the bed now																				 
																					 
	 calendar should have [!]
													 \__goals__
													 
	 add a credits page with stuff 
	 insert goals: build own computer, build own browser, try building my own version of anything i see, learn better japanese, learn italian
	 
	 keywords: energetic, inquisitive, dedicated
													
	 overlay popups deserve their own html, don't clutter the home code up
	 ---
													
	 
	 is 2.5d possible? just have to change tile map? yes --- should transformed with css
	 
	 better collision detection
	 creation an invisible image of stuff you can't walk on
	 every time player character overlaps, stop
	 
	 layer the front stuff on another canvas
*/
/*
(function(){
	var canvas = document.getElementById("canvas");   // the canvas where game will be drawn
	var context = canvas.getContext("2d");            // canvas context
	var levelCols=43;							// level width, in tiles
	var levelRows=33;							// level height, in tiles
	var tileSize=15;  						// tile size, in pixels
	var playerCol=6;                                  // player starting column
	var playerRow=25;                                  // player starting row
	var leftPressed=false;                            // are we pressing LEFT arrow key?
	var rightPressed=false;                           // are we pressing RIGHT arrow key?
	var upPressed=false;                              // are we pressing UP arrow key?
	var downPressed=false;                            // are we pressing DOWN arrow ky?
	var playerXSpeed=0;                               // player horizontal speed, in pixels per frame
	var playerYSpeed=0;                               // player vertical speed, in pixels per frame
	var playerSizeX=tileSize*2;
	var playerSizeY=tileSize*4;
	
	
	// set different tiles with animation
	// set some tiles with interaction
	var level = [
	//                    |                   |                   |                   |
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,3,3,3,3,3,3,3,3,3,3,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,3,3,3,3,3,3,3,3,3,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,1,3,3,3,3,3,3,3,3,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,3,3,3,3,3,3,3,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,3,3,3,3,3,3,1,1,1,1],
		[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,3,3,3,3,3,1,1,1,1],
		[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1], //////
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1], 
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,1,1],
		[1,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1], //////
		[1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1],
		[3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
		[3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
		[3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
		[3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,3,1,1,1,1],
		[3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,3,3,3,3,3,1,1,1,1],
		[3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,3,3,3,3,3,3,3,3,3,1,1,1,1],
		[3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1],
		[3,3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1], //////
		[3,3,3,3,3,3,3,3,3,1,0,0,0,0,0,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1],
		[3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1],
		[3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1]
	];
	
	var playerYPos=playerRow*tileSize;				// this is the beginning of the tile of where player is
	var playerXPos=playerCol*tileSize;               // converting X player position from tiles to pixels

	canvas.width=tileSize*levelCols;                   // canvas width. Won't work without it even if you style it from CSS
	canvas.height=tileSize*levelRows;                   // canvas height. Same as before

	// simple WASD listeners
	document.addEventListener("keydown", function(e){
		switch(e.keyCode){
			case 37:
				leftPressed=true;
				break;

			case 38:
				upPressed=true;
				break;

			case 39:
				rightPressed=true;
				break;

			case 40:
				downPressed=true;
				break;
			
			default:
				break;
		}
	}, false);

	document.addEventListener("keyup", function(e){
		switch(e.keyCode){
			case 37:
				leftPressed=false;
				break;

			case 38:
				upPressed=false;
				break;

			case 39:
				rightPressed=false;
				break;

			case 40:
				downPressed=false;
				break;
				
			default:
				break;
		}
	}, false);

	// function to display the level
	function renderLevel(){
		// clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		// walls = red boxes
		/*
		context.fillStyle = "#0000ff";
		for(i=0;i<levelRows;i++){
			for(j=0;j<levelCols;j++){
				if(level[i][j]==1){
					context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);	
				}
			}
		}
		// walls = black spaces
		context.fillStyle = "#000000";
		for(i=0;i<levelRows;i++){
			for(j=0;j<levelCols;j++){
				if(level[i][j]==3){
					context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);	
				}
			}
		}
		// player = green box
		context.fillStyle = "#00ff00";
		context.fillRect(playerXPos,playerYPos-3*tileSize,playerSizeX,playerSizeY);
	}

	// fps function
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000/60);
		};
	})();
	

	// function to handle the game itself
	function updateGame() {
		// no friction or inertia at the moment, so at every frame initial speed is set to zero
		playerXSpeed=0;
		playerYSpeed=0;

		// updating speed according to key pressed
		if(rightPressed){
			playerXSpeed=tileSize/6;
		}

		else{
			if(leftPressed){
				playerXSpeed=-tileSize/6;
			}

			else{
				if(upPressed){
					playerYSpeed=-tileSize/6;
				}
				else{
					if(downPressed){
						playerYSpeed=tileSize/6;
					}         
				}          
			}         
		}

		// updating player position
		playerXPos+=playerXSpeed; // remember: position tracks the leftmost bottom tile
		playerYPos+=playerYSpeed;
		
		
		// check for horizontal collisions: need to check for left and right tile collision
		var baseCol = Math.floor(playerXPos/tileSize);                // left of player, current tile
		var midCol = Math.floor((playerXPos+playerSizeX/2)/tileSize); // middle of the player
		var endCol = Math.floor((playerXPos+playerSizeX)/tileSize);   // right of player, current tile
		var baseRow = Math.floor(playerYPos/tileSize);           // upper edge, lower value
		var endRow = Math.floor((playerYPos+tileSize)/tileSize); // lower edge, higher value
		var colOverlap = playerXPos%tileSize;
		var rowOverlap = playerYPos%tileSize;

		// 1. not at edge, going right -> no problem
		// 2. at edge, going right -> problem
		if(playerXSpeed>0) { // going right
			if (level[baseRow][endCol] || level[baseRow][midCol] || (level[endRow][endCol] && rowOverlap)) {
				playerXPos=baseCol*tileSize;
			}
		}
		
		// some problems with the overlap
		if(playerXSpeed<0) { // going left
			if (level[baseRow][baseCol] || level[baseRow][midCol] || (level[endRow][baseCol] && rowOverlap)) {
				playerXPos=(baseCol+1)*tileSize;
			}
		}
		
		baseCol = Math.floor(playerXPos/tileSize);
		endCol = Math.floor((playerXPos+playerSizeX)/tileSize);
		rowOverlap = playerYPos%tileSize;
		colOverlap = playerXPos%tileSize;
		
		if(playerYSpeed>0) { // going down, value higher, remember the coordinates
			if (level[endRow][baseCol] || level[endRow][midCol] || (level[endRow][endCol] && colOverlap)) {
				playerYPos=baseRow*tileSize;
			}
		}
		
		if(playerYSpeed<0) { // going up, value lower
			if (level[baseRow][baseCol] || level[baseRow][midCol] || (level[baseRow][endCol] && colOverlap)) { // no overlap, possibl
				playerYPos=(baseRow+1)*tileSize;
			}
		}
		
		// rendering level
		renderLevel();

		requestAnimFrame(function() {
			updateGame();
		});
	}
	updateGame();
})();
*/

$( document ).ready( function () {
	var c = document.getElementById("can");
	var ctx = c.getContext("2d");
	c.width = 770;
	c.height = 626;
	
	var i = 0;

	var player = {
		speed: 80,
		x: c.width/2,
		y: (c.height+100)/2
	};
	
	var playerReady = false;
	var pImage = new Image();
	pImage.onload = function () {
		playerReady = true;
	};
	pImage.src = "k.png";
	
	var pImage = new Image();
	pImage.onload = function () {
		playerReady = true;
	};
	pImage.src = "k.png";
	
	var bimg = new Image();
	bimg.src = "b.png";
	
	var bed = new Image();
	bed.src = "bed.png";
	
	var calendar0 = new Image();
	var calendar1 = new Image();
	var calendar2 = new Image();
	var calendar3 = new Image();
	var calendar4 = new Image();
	
	calendar0.src = "gf0.png";
	calendar1.src = "gf1.png";
	calendar2.src = "gf2.png";
	calendar3.src = "gf3.png";
	calendar4.src = "gf4.png";
	
	var contact0 = new Image();
	var contact1 = new Image();
	
	contact0.src = "cf0.png";
	contact1.src = "cf1.png";
	
	var resume0 = new Image();
	var resume1 = new Image();
	var resume2 = new Image();
	var resume3 = new Image();
	
	resume0.src = "rf0.png";
	resume1.src = "rf1.png";
	resume2.src = "rf2.png";
	resume3.src = "rf3.png";

	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

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
		ctx.clearRect(0, 0, c.width, c.height);
		if (playerReady) {
			ctx.drawImage(bimg, 0, 0);
			if (i >= 0 && i <= 20) {
				ctx.drawImage(contact0,548,403);
				if (i <= 12) ctx.drawImage(calendar0,134,282);
				else ctx.drawImage(calendar1,134,282);
				ctx.drawImage(resume0,426,227);
			}
			else if (i > 20 && i <= 40) {
				ctx.drawImage(contact0,548,403);
				if (i <= 24) ctx.drawImage(calendar1,134,282);
				else if (i > 24 && i <= 36) ctx.drawImage(calendar2,134,282);
				else ctx.drawImage(calendar3,134,282);
				ctx.drawImage(resume1,426,227);
			}
			else if (i > 40 && i <= 60) {
				ctx.drawImage(contact0,548,403);
				if (i <= 48) ctx.drawImage(calendar3,134,282);
				else ctx.drawImage(calendar4,134,282);
				ctx.drawImage(resume2,426,227);
			}
			else if (i > 60 && i <= 80) {
				ctx.drawImage(contact1,548,403);
				if (i <= 72) ctx.drawImage(calendar4,134,282);
				else ctx.drawImage(calendar3,134,282);
				ctx.drawImage(resume3,426,227);
			}
			else if (i > 80 && i <= 100) {
				ctx.drawImage(contact1,548,403);
				if (i <= 84) ctx.drawImage(calendar3,134,282);
				else if (i > 84 && i <= 96) ctx.drawImage(calendar2,134,282);
				else ctx.drawImage(calendar1,134,282);
				ctx.drawImage(resume2,426,227);
			}
			else if (i > 100 && i <= 120) {
				ctx.drawImage(contact1,548,403);
				if (i <= 108) ctx.drawImage(calendar1,134,282);
				else ctx.drawImage(calendar0,134,282);
				ctx.drawImage(resume1,426,227);
			}
			ctx.drawImage(pImage, player.x, player.y);
			ctx.drawImage(bed, 346, 353);
		}
		if (i < 120) i++;
		else i = 0;
	};

	var main = function () {
		var now = Date.now();
		var delta = now - then;
		update(delta / 1000);
		render();
		then = now;
		requestAnimationFrame(main);
	};
	
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	var then = Date.now();
	main();
});
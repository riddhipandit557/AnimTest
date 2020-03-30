
// Extra Variables for Features
var gamePlaying = true;


	var imgBackground = new Image();
	var imgPatty = new Image();
	
	// TESTING
	var x = 1260;
	var y = 730;
	var destX = 660;
	var destY = 600;
	var dx = (destX - x)/30;
	var dy = (destY - y)/30;

	// Keyboard Constants (separate file?)
	var KEY_SPACE       = 32;
	var KEY_ARROW_LEFT  = 37;
	var KEY_ARROW_UP    = 38;
	var KEY_ARROW_RIGHT = 39;
	var KEY_ARROW_DOWN  = 40;
	
	// "Engine" parts
	var canvas = document.getElementById("gameCanvas");
	var context = canvas.getContext("2d");

	// Game objects
	var stateMessage = new StateMessage();

	function setDebugText(message)
	{
		document.getElementById("debug").innerHTML = message;
	}
	
	function fourDigitFormat(n)
	{
		var pad = "";
		if (n < 1000)
			pad += "0";
		if (n < 100)
			pad += "0"		
		if (n < 10)
			pad += "0";

		return pad + n;
	}

	function initializeImages() 
	{
		imgBackground.src = "images/Back_ground.jpg";
		imgPatty.src = "images/Patty1.png";
		draw();
	}
	initializeImages();

	function draw() 
	{
		var output = "";
		
	
	
		// update phase
		x += dx;
		y += dy;
		
		if (Math.abs(x - destX) < 30) x = destX;
		if (Math.abs(y - destY) < 30) y = destY;

		// render phase
		context.drawImage(imgBackground, 0, 0);
		context.drawImage(imgPatty, x, y);

		setDebugText(output);
			
		if(gamePlaying)
			timeOut = setTimeout(draw, 50);
	}

	
	
	function StateMessage()
	{
		this.message = "";
		this.visible = false;
		
		this.draw = function()
		{
			if (this.visible)
			{
				context.font = "30px Arial";
				context.fillStyle = "black";
				context.fillText(this.message, 10, GRID_SIZE * GRID_SPACE_SIZE - 10);
			}
		}
	}
	
	
	document.onkeydown = keyDown;
	document.onkeyup = keyUp;
	document.onmousedown = keyDown;
	document.onmouseup = keyUp;

	
	function keyDown(e) 
	{

		e = e || window.event;
		
		if (e.keyCode == KEY_ARROW_UP)
		{
			frameDelay--;
			
			if (frameDelay < 0)
				frameDelay = 0;
		}
		else if (e.keyCode == KEY_ARROW_DOWN)
		{
			frameDelay++;
		}
		else if (e.keyCode == KEY_ARROW_LEFT)
		{
			floorIndex--;
			
			if (floorIndex < 0)
				floorIndex = imgFloor.length - 1;
		}
		else if (e.keyCode == KEY_ARROW_RIGHT)
		{
			floorIndex++;

			if (floorIndex >= imgFloor.length)
				floorIndex = 0;
		}
	}

	function keyUp(e) 
	{
		e = e || window.event;

		if (e.keyCode == KEY_SPACE)
		{
			paused = !paused;
		}
	}
	
	function mouseDown(e)
	{
		e = e || window.event;
		var center = canvas.width/2;
		if (e.clientX < center) 
		{
			player.action = ACTION_MOVE;	
			player.direction = DIRECTION_LEFT;
		}
		else
		{
			player.action = ACTION_MOVE;
			player.direction = DIRECTION_RIGHT;
		}
	}

	function mouseUp(e)
	{
		e = e || window.event;
		player.action = ACTION_IDLE;
	}

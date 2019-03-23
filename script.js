window.onload = function () { //Window.onload is for loading this function when the page load.
	var canvas = document.getElementById("crayon"); //crayon is the canvas id in HTML page.
	var ctx = canvas.getContext("2d");
	var erasing = false;
	var line = false; //canvas.getContext is for returning drawing context on the canvas. The ("2d") is for rendering the canvas as a 2d image.
	resize(); //Calling the resize function for initializing the height and width of the drawing panel.

	function resize() { //here's the resize() function  
  		ctx.canvas.width = window.innerWidth; //auto adjustement of the width as the width of the window.
  		ctx.canvas.height = window.innerHeight; //auto adjustement of the height as the height of the window.
	}

	// add event listeners is the action $WATCHER. Can't be more simple as that.
	// [target].addEventListener([type]->case sensitive, [listener]);
	window.addEventListener("resize", resize); //watch the window when it resize.
	document.addEventListener("mousemove", crayon); //watch the canvas on mouse movement.
	document.addEventListener("mousedown", setPosition); //set position is for capturing user’s mouse current position on clicking.
	document.addEventListener("mouseenter", setPosition); //same but when mouse is moving over the canvas function.

	var pos = { x: 0, y: 0 }; //mouse current position.

	// new position from mouse events
	function setPosition(e) {
  		pos.x = e.clientX; //check for new vertical mouse positions.
  		pos.y = e.clientY; //check for new horizontal mouse positions.
	}

	var exLines = [];

	$("#eraser").click(function(e) {
        erasing = true;
	});

	$("#line").click(function(e) {
		line = true;
	});

	function crayon(e) { //Eyes on this function -> document.addEventListener("mousemove", crayon);
  		if (e.buttons !== 1) return; // if mouse is pressed.
		var color = document.getElementById("color").value;
		var size = document.getElementById("size").value;
		ctx.beginPath(); //begin the drawing path
		  
  		if(erasing == true) { //erasing part
  			ctx.globalCompositeOperation = "destination-out";
  		}
  		else {
  			ctx.globalCompositeOperation = "source-over";
  		}

  		if (line = true) { //if line button pressed
  			for (var i = 0 ; i < exLines.lenght; ++i) {
  				var line = exLines[i];
  				ctx.line.moveTo(pos.x , pos.y);
  				ctx.line.lineTo(pos.x, pos.y);
  			}
		  }
		  
  		ctx.lineWidth = size; //width of the line as the size var (id = size in html page).
		ctx.strokeStyle = color; //color of line as the color var (id = color in html page).
		ctx.lineCap = "round";
  		ctx.moveTo(pos.x, pos.y); //from mouse position X to-> Y.
  		setPosition(e); //trace
  		ctx.lineTo(pos.x, pos.y); // to position
		  ctx.stroke(); // draw it!
	}
}
elements.paperclip = {
	color: "#bdbdbd",
	tempHigh: 1538,
	stateHigh: "molten_iron",
	category: "powders",
	state: "solid",
	density: 7860,
	conduct: 0.47,
	hardness: 0.4,
	properties: {
		link1: null,
		link2: null
	},
	tick: function(pixel) {
		
		if (Math.random() < 0.01) {
			let dx = Math.floor(Math.random() * 3) - 1;
			let dy = Math.floor(Math.random() * 3) - 1;
			if(!(dx === 0 || dy === 0) && !isEmpty(pixel.x+dx, pixel.y+dy, true))
			{
				var adjpixel = pixelMap[pixel.x+dx][pixel.y+dy];
				if (adjpixel.element === "paperclip") {
					if (Math.random() < 0.5 && pixel.link1 === null && adjpixel.link1 === null) {
						pixel.link1 = adjpixel;
						adjpixel.link1 = pixel;
					} else if (pixel.link2 === null && adjpixel.link2 === null) {
						pixel.link2 = adjpixel;
						adjpixel.link2 = pixel;
					}
				}
			}
		}
		let prevPosX = pixel.x;
		let prevPosY = pixel.y;
		behaviors.POWDER(pixel);
                if(prevPosX === pixel.x && prevPosY == pixel.Y)
                       return;
		if (Math.random() < 0.5) {
			var adjpixel = pixel.link1;
			if (adjpixel !== null && adjpixel.element === "paperclip") {
				if(!recursiveMove(adjpixel, prevPosX, prevPosY,true,0))
				{
					pixel.link1 = null;
					adjpixel.link1 = null;
				}
			} else {
				pixel.link1 = null;
			}
		} else {
			var adjpixel = pixel.link2;
			if (adjpixel !== null && adjpixel.element === "paperclip") {
				if(!recursiveMove(adjpixel, prevPosX, prevPosY,false,0))
				{
					pixel.link2 = null;
					adjpixel.link2 = null;
				}
			} else {
				pixel.link2 = null;
			}
		} 
	}
}
function recursiveMove(pixel,x,y,left,iters) {
	let prevPosX = pixel.x;
	let prevPosY = pixel.y;
	if(iters > 50 || !tryMove(pixel,x,y)) {
                return false;
        }

        if(!left) {
	        var adjpixel = pixel.link1;
	        if (adjpixel !== null && adjpixel.element === "paperclip") {
			if(!recursiveMove(adjpixel, prevPosX, prevPosY,!left,iters+1))
			{
				pixel.link1 = null;
				adjpixel.link1 = null;
                                
			}
		} else {
			pixel.link1 = null;
		}
	} else {
		var adjpixel = pixel.link2;
		if (adjpixel !== null && adjpixel.element === "paperclip") {
			if(!recursiveMove(adjpixel, prevPosX, prevPosY,!left))
			{
				pixel.link2 = null;
				adjpixel.link2 = null;
			}
		} else {
			pixel.link2 = null;
		}
	} 
return true;
}

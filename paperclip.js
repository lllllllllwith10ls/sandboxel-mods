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
		
		for(let i = 0; i < 4; i++) {
			let dx = Math.floor(Math.random() * 3) - 1;
			let dy = Math.floor(Math.random() * 3) - 1;
			if(!(dx === 0 && dy === 0) && !isEmpty(pixel.x+dx, pixel.y+dy, true))
			{
				let adjpixel = pixelMap[pixel.x+dx][pixel.y+dy];
				if (adjpixel.element === "paperclip" || adjpixel.element === "paper") {
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
		let adjpixel = pixel.link1;
		if (!(adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel))) {
			pixel.link1 = null;
			if (adjpixel !== null && !currentPixels.includes(adjpixel)) {
				delete pixelMap[adjpixel.x][adjpixel.y];
			}
		}
		
		adjpixel = pixel.link2;
		if (!(adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel))) {
			pixel.link2 = null;
			if (adjpixel !== null && !currentPixels.includes(adjpixel)) {
				delete pixelMap[adjpixel.x][adjpixel.y];
			}
		}
		
		if(!(prevPosX === pixel.x && prevPosY === pixel.Y))
		{
			if (Math.random() < 0.5) {
				adjpixel = pixel.link1;
				if (adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel)) {
					if(!recursiveMove(adjpixel, prevPosX, prevPosY,true,0))
					{
						pixel.link1 = null;
						adjpixel.link1 = null;
					}
				} else {
					pixel.link1 = null;
				}
			} else {
				adjpixel = pixel.link2;
				if (adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel)) {
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
}
function recursiveMove(pixel,x,y,left,iters) {
	let prevPosX = pixel.x;
	let prevPosY = pixel.y;
	if(iters > 50 || !tryMove(pixel,x,y)) {
		return false;
	}
	if(!(prevPosX === pixel.x && prevPosY === pixel.Y))
	{	
		if(!left) {
			let adjpixel = pixel.link1;
			if (adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel)) {
				if(!recursiveMove(adjpixel, prevPosX, prevPosY,!left,iters+1))
				{
					pixel.link1 = null;
					adjpixel.link1 = null;
									
				}
			} else {
				pixel.link1 = null;
			}
		} else {
			let adjpixel = pixel.link2;
			if (adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel)) {
				if(!recursiveMove(adjpixel, prevPosX, prevPosY,!left,iters+1))
				{
					pixel.link2 = null;
					adjpixel.link2 = null;
				}
			} else {
				pixel.link2 = null;
			}
		} 
	}
	return true;
}

elements.paper = {
	color: "#f0f0f0",
	tempHigh: 400,
	reactions: {
		"water": { "elem1":"cellulose", "elem2":null },
		"dirty_water": { "elem1":"cellulose", "elem2":null },
		"salt_water": { "elem1":"cellulose", "elem2":null },
		"sugar_water": { "elem1":"cellulose", "elem2":null },
		"seltzer": { "elem1":"cellulose", "elem2":null },
		"soda": { "elem1":"cellulose", "elem2":null },
		"blood": { "elem1":"cellulose", "elem2":null },
		"foam": { "elem1":"cellulose", "elem2":null },
		"bubble": { "elem1":"cellulose", "elem2":null },
		"oil": { "elem1":"cellulose", "elem2":null },
		"alcohol": { "elem1":"cellulose", "elem2":null },
		"vinegar": { "elem1":"cellulose", "elem2":null },
	},
	tempHigh: 248,
	stateHigh: ["fire","fire","fire","fire","fire","ash"],
	burn: 70,
	burnTime: 300,
	burnInto: ["fire","fire","fire","fire","fire","ash"],
	category: "solids",
	state: "solid",
	density: 1201,
	//breakInto: "chad",
	properties: {
		link1: null,
		link2: null,
		linked: false
	},
	tick: function(pixel) {
		
		if(!pixel.linked) {
			for(let i = -1; i <= 1; i++) {
				let dx = i;
				let dy = 0;
				if(!(dx === 0 && dy === 0) && !isEmpty(pixel.x+dx, pixel.y+dy, true))
				{
					let adjpixel = pixelMap[pixel.x+dx][pixel.y+dy];
					if (adjpixel.element === "paper") {
						if (pixel.link1 === null && adjpixel.link1 === null && 
						((pixel.x%2 === 0 && i === -1) || (pixel.x%2 === 1 && i === 1))) {
							pixel.link1 = adjpixel;
							adjpixel.link1 = pixel;
						} else if (pixel.link2 === null && adjpixel.link2 === null && 
						((pixel.x%2 === 1 && i === -1) || (pixel.x%2 === 0 && i === 1))) {
							pixel.link2 = adjpixel;
							adjpixel.link2 = pixel;
						}
					}
				}
			}
			pixel.linked = true;
		}
		let prevPosX = pixel.x;
		let prevPosY = pixel.y;
		behaviors.POWDER(pixel);
		let adjpixel = pixel.link1;
		if (!(adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel))) {
			pixel.link1 = null;
			if (adjpixel !== null && !currentPixels.includes(adjpixel)) {
				delete pixelMap[adjpixel.x][adjpixel.y];
			}
		}
		
		adjpixel = pixel.link2;
		if (!(adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel))) {
			pixel.link2 = null;
			if (adjpixel !== null && !currentPixels.includes(adjpixel)) {
				delete pixelMap[adjpixel.x][adjpixel.y];
			}
		}
		
		if(!(prevPosX === pixel.x && prevPosY === pixel.Y))
		{
			if (Math.random() < 0.5) {
				adjpixel = pixel.link1;
				if (adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel)) {
					if(!recursiveMove(adjpixel, prevPosX, prevPosY,true,0))
					{
						pixel.link1 = null;
						adjpixel.link1 = null;
					}
				} else {
					pixel.link1 = null;
				}
			} else {
				adjpixel = pixel.link2;
				if (adjpixel !== null && (adjpixel.element === "paperclip" || adjpixel.element === "paper") && currentPixels.includes(adjpixel)) {
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
}
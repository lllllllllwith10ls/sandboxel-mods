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
		link1x: -1,
		link1y: -1,
		link2x: -1,
		link2y: -1
	},
	tick: function(pixel) {
		behaviors.POWDER();
	}
}
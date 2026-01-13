// CMPM 120 - rocket patrol tutorial
// amory acosta
// winter 2026

let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	scene: [ Menu, Play, ],
};

let game = new Phaser.Game(config);


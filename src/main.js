// amory acosta
// TODO untitled
// TODO hours

let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	scene: [ Menu, Play, ],
};

let game = new Phaser.Game(config);

// GLOBALS

// UI
let ui_border_size = game.config.height / 15;
let ui_border_padding = ui_border_size / 3;

// KEYBIND NAMES
let key_fire;
let key_reset;
let key_left;
let key_right;


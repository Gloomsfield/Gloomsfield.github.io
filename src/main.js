// amory acosta
// TODO untitled
// TODO hours

let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	antialias: false,
	roundPixels: true,
	scene: [ Menu, Play, ],
};

let game = new Phaser.Game(config);

// GLOBALS

// UI
let ui_border_size = game.config.height / 15;
let ui_border_padding = ui_border_size / 3;

const ui_config = {
	fontFamily: 'Courier',
	fontSize: '24px',
	backgroundColor: '#f3b141',
	color: '#843605',
	align: 'right',
	padding: {
		top: 5,
		bottom: 5,
	},
};

const ui_accent_config = {
	fontFamily: 'Courier',
	fontSize: '24px',
	backgroundColor: '#00ff00',
	color: '#000000',
	align: 'right',
	padding: {
		top: 5,
		bottom: 5,
	},
};

const ui_score_config = {
	fontFamily: 'Courier',
	fontSize: '24px',
	backgroundColor: '#f3b141',
	color: '#843605',
	align: 'right',
	padding: {
		top: 5,
		bottom: 5,
	},
	fixedWidth: 100,
};

// KEYBIND NAMES
let key_fire;
let key_reset;
let key_left;
let key_right;


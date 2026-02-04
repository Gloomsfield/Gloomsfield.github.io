// amory acosta
// rocket patrol 1.5
// TODO hours

// features implemented
// timing/scoring mechanism - 5pts
// new enemy spaceship - 5pts

let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	antialias: false,
	roundPixels: true,
	scene: [ Load, Menu, Play, Border, Background, Game, UserInterface, ],
};

let game = new Phaser.Game(config);

let ui_border_size = game.config.height / 15;
let ui_border_padding = ui_border_size / 3;

const text_config = {
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

const text_accent_config = {
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

const ui_score_text_config = {
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


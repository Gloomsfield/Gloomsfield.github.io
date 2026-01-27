// amory acosta
// TODO untitled
// TODO hours

let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	antialias: false,
	roundPixels: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		},
	},
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

let interpolation_mode = {
	type: 'constant',
	angle_delta: 1.0,
	restrict: true,
};

function mod(n, d) {
	return ((n % d) + d) % d;
}

// sourced from https://stackoverflow.com/a/14498790
function interpolate_angle(target_angle, current_angle, angular_delta) {
	let end = target_angle;
	let start = current_angle;
	
	let shortest_angle = mod(mod(end - start, 2.0 * Math.PI) + 3.0 * Math.PI, 2.0 * Math.PI) - Math.PI;

	return current_angle + angular_delta * shortest_angle;
}


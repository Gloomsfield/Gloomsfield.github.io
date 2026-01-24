// code practice 02 - beyond orthogonal
// amory acosta
// 2026/01/23

// spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
	antialias: false,
	roundPixels: true,
	render: { pixelArt: true, },
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		},
	},
    scene: [ Movement ]
};

let game = new Phaser.Game(config);

let cursors;
let { height, width } = game.config;

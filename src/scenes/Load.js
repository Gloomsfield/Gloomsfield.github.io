class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		this.load.image('rocket', './assets/rocket.png');
		this.load.image('spaceship', './assets/ship.png');
		this.load.image('starfield', './assets/background.png');

		this.load.spritesheet('ship_explosion', './assets/ship_explosion.png', {
			frameWidth: 64,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 10,
		});

		this.load.audio('sfx_select', './assets/select.wav');
		this.load.audio('sfx_explosion', './assets/explosion.wav');
		this.load.audio('sfx_rocket', './assets/rocket.wav');
	}

	create() {
		this.anims.create({
			key: 'ship_explode',
			frames: this.anims.generateFrameNumbers('ship_explosion', {
				start: 0,
				end: 10,
				first: 0,
			}),
			frameRate: 30,
		});

		game.settings = {
			game_time: 45000,
			ship_speed: 3,
		};
		this.scene.start('play_scene');
	}
}

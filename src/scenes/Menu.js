class Menu extends Phaser.Scene {
	constructor() {
		super('menu_scene');
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

		this.load.audio('sfx-select', './assets/select.wav');
		this.load.audio('sfx-explosion', './assets/explosion.wav');
		this.load.audio('sfx-rocket', './assets/rocket.wav');
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

		this.add.text(20, 20, 'ROCKET PATROL MENU');

		this.scene.start("play_scene");
	}
}


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


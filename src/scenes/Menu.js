class Menu extends Phaser.Scene {
	constructor() {
		super('menu_scene');
	}

	preload() {
		this.load.image('rocket', './assets/rocket.png');
		this.load.image('spaceship', './assets/ship.png');
		this.load.image('starfield', './assets/background.png');
	}

	create() {
		this.add.text(20, 20, 'ROCKET PATROL MENU');

		this.scene.start("play_scene");
	}
}


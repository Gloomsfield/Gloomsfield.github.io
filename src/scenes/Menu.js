class Menu extends Phaser.Scene {
	constructor() {
		super('menu_scene');
	}

	create() {
		this.add.text(20, 20, 'ROCKET PATROL MENU');

		this.scene.start("play_scene");
	}
}


class Border extends Phaser.Scene {
	constructor() {
		super('border_scene');
	}

	create() {
		this.cameras.main.setBackgroundColor(0xffffff);
	}
}

class Background extends Phaser.Scene {
	constructor() {
		super('background_scene');
	}

	create() {
		this.cameras.main.setViewport(
			ui_border_size,
			ui_border_size * 3 + ui_border_padding,
			game.config.width - (2 * ui_border_size),
			game.config.height - (4 * ui_border_size) - ui_border_padding
		);

		this.starfield_bottom = this.add.tileSprite(0, -40, 640, 160, 'starfield').setOrigin(0, 0);
		this.starfield_middle = this.add.tileSprite(0, 120, 640, 160, 'starfield').setOrigin(0, 0);
		this.starfield_top = this.add.tileSprite(0, 280, 640, 160, 'starfield').setOrigin(0, 0);
	}

	update() {
		this.starfield_bottom.tilePositionX -= 2;
		this.starfield_middle.tilePositionX -= 1;
		this.starfield_top.tilePositionX -= 3;
	}
}

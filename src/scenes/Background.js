class Background extends Phaser.Scene {
	constructor() {
		super('background_scene');

		this.direction = new Phaser.Math.Vector2(-1.0, 0.0);
	}

	create() {
		this.cameras.main.setViewport(
			ui_border_size,
			ui_border_size * 3 + ui_border_padding,
			game.config.width - (2 * ui_border_size),
			game.config.height - (4 * ui_border_size) - ui_border_padding
		);

		this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
	}

	update() {
		this.starfield.tilePositionX += 2.0 * this.direction.x;
		this.starfield.tilePositionY += 2.0 * this.direction.y;
	}
}

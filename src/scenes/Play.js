class Play extends Phaser.Scene {
	constructor() {
		super('play_scene');
	}

	create() {
		// adds green UI background
		this.add.rectangle(
			0,
			ui_border_size + ui_border_padding,
			game.config.width,
			ui_border_size * 2,
			0x00ff00
		).setOrigin(0, 0);

		// adds white border to the game
		this.add.rectangle(
			0,
			0,
			game.config.width,
			ui_border_size,
			0xffffff
		).setOrigin(0, 0);

		this.add.rectangle(
			0,
			game.config.height - ui_border_size,
			game.config.width,
			ui_border_size,
			0xffffff
		).setOrigin(0, 0);

		this.add.rectangle(
			0,
			0,
			ui_border_size,
			game.config.height,
			0xffffff
		).setOrigin(0, 0);

		this.add.rectangle(
			game.config.width - ui_border_size,
			0,
			ui_border_size,
			game.config.height,
			0xffffff
		).setOrigin(0, 0);
	}
}


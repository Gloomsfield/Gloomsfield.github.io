class Menu extends Phaser.Scene {
	constructor() {
		super('menu_scene');
	}

	create() {
		this.add.text(
			game.config.width / 2,
			game.config.height / 2 - ui_border_size - ui_border_padding,
			'ROCKET PATROL',
			text_config
		).setOrigin(0.5, 0);

		this.add.text(
			game.config.width / 2,
			game.config.height / 2,
			'Use <- -> arrows to move and (F) to fire.',
			text_config
		).setOrigin(0.5, 0);

		this.add.text(
			game.config.width / 2,
			game.config.height / 2 + ui_border_size + ui_border_padding,
			'Press <- for Novice or -> for Expert.',
			text_accent_config
		).setOrigin(0.5, 0);

		let sfx_select = this.sound.add('sfx_select');

		let key_left_input = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		let key_right_input = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		key_left_input.on('down', () => {
			game.settings = {
				ship_speed: 3,
				game_time: 60000,
			};

			sfx_select.play();
			this.scene.start('play_scene');
		});

		key_right_input.on('down', () => {
			game.settings = {
				ship_speed: 4,
				game_time: 45000,
			};

			sfx_select.play();
			this.scene.start('play_scene');
		});
	}
}


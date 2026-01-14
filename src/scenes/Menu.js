class Menu extends Phaser.Scene {
	constructor() {
		super('menu_scene');
	}

	create() {
		this.add.text(
			game.config.width / 2,
			game.config.height / 2 - ui_border_size - ui_border_padding,
			'ROCKET PATROL',
			ui_config
		).setOrigin(0.5, 0);

		this.add.text(
			game.config.width / 2,
			game.config.height / 2,
			'Use <- -> arrows to move and (F) to fire.',
			ui_config
		).setOrigin(0.5, 0);

		this.add.text(
			game.config.width / 2,
			game.config.height / 2 + ui_border_size + ui_border_padding,
			'Press <- for Novice or -> for Expert.',
			ui_accent_config
		).setOrigin(0.5, 0);

		key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
	}

	update() {
		if(Phaser.Input.Keyboard.JustDown(key_left)) {
			game.settings = {
				ship_speed: 3,
				game_time: 60000,
			};

			this.sound.play('sfx-select');
			this.scene.start('play_scene');
		}

		if(Phaser.Input.Keyboard.JustDown(key_right)) {
			game.settings = {
				ship_speed: 4,
				game_time: 45000,
			};

			this.sound.play('sfx-select');
			this.scene.start('play_scene');
		}
	}
}


class UserInterface extends Phaser.Scene {
	constructor() {
		super('user-interface_scene');
	}

	create() {
		this.cameras.main.setViewport(
			ui_border_size,
			ui_border_size + ui_border_padding,
			game.config.width - (2 * ui_border_size),
			ui_border_size * 2
		);

		this.cameras.main.setBackgroundColor(0x00ff00);

		this.score_text = this.add.text(
			ui_border_size + ui_border_padding,
			ui_border_padding,
			'0',
			ui_score_text_config
		);

		this.timer_text = this.add.text(
			this.cameras.main.width - ui_border_size - ui_border_padding - 100,
			ui_border_padding,
			'0',
			ui_score_text_config
		);

		this.gameover_text = this.add.text(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			'GAME OVER!',
			ui_score_text_config
		).setOrigin(0.5, 0).setVisible(false);

		this.restart_text = this.add.text(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2 + 64,
			'PRESS (R) TO RESTART.',
			ui_score_text_config
		).setOrigin(0.5, 0).setVisible(false);
	}

	update_score(new_score) {
		this.score_text.text = new_score;
	}

	update_timer(new_time) {
		this.timer_text.text = Number.parseFloat(new_time / 1000).toFixed(2);
	}

	display_game_over() {
		this.gameover_text.setVisible(true);
		this.restart_text.setVisible(true);
	}
}

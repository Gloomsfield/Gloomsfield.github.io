class Play extends Phaser.Scene {
	constructor() {
		super('play_scene');
	}

	create() {
		let game_viewport_rect = {
			x: ui_border_size,
			y: ui_border_size * 3 + ui_border_padding,
			width: game.config.width - (2 * ui_border_padding),
			height: game.config.height - (4 * ui_border_size) - ui_border_padding,
		};

		this.time_remaining = game.settings.game_time;
		this.score = 0;
		this.game_over = false;

		this.scene.launch('border_scene');

		this.scene.launch('background_scene');

		this.scene.launch('game_scene', game_viewport_rect);

		this.scene.launch('user-interface_scene');

		this.scene.get('game_scene').events.on('alter-score', (delta) => {
			this.score += delta;
			this.scene.get('user-interface_scene').update_score(this.score);
		});

		this.scene.get('game_scene').events.on('alter-timer', (delta) => {
			this.time_remaining += delta;
			this.scene.get('user-interface_scene').update_timer(this.score);
		});

		this.reset_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		this.reset_key.on('down', () => {
			if(this.game_over) {
				this.reset();
			}
		});
	}

	update(time, delta) {
		if(this.game_over) {
			return;
		}

		this.time_remaining -= delta;

		if(this.time_remaining <= 0) {
			this.time_remaining = 0;
			this.game_over = true;

			this.scene.get('user-interface_scene').display_game_over();
			this.scene.pause('game_scene');
		}

		this.scene.get('user-interface_scene').update_timer(this.time_remaining);

		let theta = this.scene.get('game_scene').camera_theta;

		this.scene.get('background_scene').direction.x = Math.cos(theta);
		this.scene.get('background_scene').direction.y = Math.sin(theta);
	}

	reset() {
		this.scene.restart();
	}
}


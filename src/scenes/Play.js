class Play extends Phaser.Scene {
	constructor() {
		super('play_scene');
	}

	create() {
		this.starfield = this.add.tileSprite(
			0,
			0,
			640,
			480,
			'starfield',
		).setOrigin(0, 0);

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

		this.rocket = new Rocket(
			this,
			game.config.width / 2,
			game.config.height - ui_border_size - ui_border_padding,
			'rocket'
		).setOrigin(0.5, 0);

		this.rocket.on('alter-timer', (delta) => {
			this.time_allotted += delta;
		});

		this.ships = [
			this.ship_spawn({ x: game.config.width + ui_border_size * 6, y: ui_border_size * 4 + ui_border_padding * 0 }, 30),
			this.ship_spawn({ x: game.config.width + ui_border_size * 3, y: ui_border_size * 5 + ui_border_padding * 2 }, 20),
			this.ship_spawn({ x: game.config.width + ui_border_size * 0, y: ui_border_size * 6 + ui_border_padding * 4 }, 10),
		];

		for(let ship of this.ships) {
			ship.on('alter-timer', (delta) => {
				this.time_allotted += delta;
			});

			ship.on('increase-score', (points) => {
				this.score += points;
				this.score_text.text = this.score;
			});

			ship.on('play-sound', (sound_key) => {
				this.sound.play(sound_key);
			});
		}

		key_fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		key_reset = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		this.score = 0;

		this.score_text = this.add.text(
			ui_border_size + ui_border_padding,
			ui_border_size + ui_border_padding * 2,
			this.score,
			ui_score_config
		);

		this.time_elapsed = 0;
		this.time_allotted = game.settings.game_time;

		this.timer_text = this.add.text(
			game.config.width - ui_border_size - ui_border_padding - 100,
			ui_border_size + ui_border_padding * 2,
			Number.parseFloat((this.time_allotted - this.time_elapsed) / 1000).toFixed(2),
			ui_score_config
		);

		this.game_over = false;
	}

	update(time, delta) {
		this.time_elapsed += delta;

		if(this.time_elapsed >= this.time_allotted) {
			this.end_game();
		}

		if(this.game_over && Phaser.Input.Keyboard.JustDown(key_reset)) {
			this.scene.restart();
		}

		this.starfield.tilePositionX -= 4;

		if(this.game_over) {
			return;
		}

		this.timer_text.text = Number.parseFloat((this.time_allotted - this.time_elapsed) / 1000).toFixed(2);

		this.rocket.update();

		for(let ship of this.ships) {
			if(ship) {
				ship.update();

				if(this.check_collision(this.rocket, ship)) {
					this.rocket.reset();
					ship.explode();
				}
			}
		}
	}

	ship_spawn(position, points) {
		return new Spaceship(
			this,
			position.x,
			position.y,
			'spaceship',
			0,
			points
		).setOrigin(0, 0);
	}

	check_collision(rocket, ship) {
		if(
			rocket.x < ship.x ||
			rocket.x > ship.x + ship.width ||
			rocket.y < ship.y ||
			rocket.y > ship.y + ship.height
		) {
			return false;
		}

		return true;
	}

	end_game() {
		this.add.text(
			game.config.width / 2,
			game.config.height / 2,
			'GAME OVER',
			ui_config
		).setOrigin(0.5, 0);

		this.add.text(
			game.config.width / 2,
			game.config.height / 2 + 64,
			'PRESS (R) TO RESTART.',
			ui_config
		).setOrigin(0.5, 0);

		this.game_over = true;
	}
}


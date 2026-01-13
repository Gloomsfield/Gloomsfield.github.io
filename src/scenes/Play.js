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

		this.ships = [
			new Spaceship(
				this,
				game.config.width + ui_border_size * 6,
				ui_border_size * 4,
				'spaceship',
				0,
				30
			).setOrigin(0, 0),

			new Spaceship(
				this,
				game.config.width + ui_border_size * 3,
				ui_border_size * 5 + ui_border_padding * 2,
				'spaceship',
				0,
				20
			).setOrigin(0, 0),

			new Spaceship(
				this,
				game.config.width,
				ui_border_size * 6 + ui_border_padding * 4,
				'spaceship',
				0,
				10
			).setOrigin(0, 0),
		];

		key_fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		key_reset = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		this.score = 0;

		let score_config = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#f3b141',
			color: '#843605',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 100,
		};

		this.score_text = this.add.text(
			ui_border_size + ui_border_padding,
			ui_border_size + ui_border_padding * 2,
			this.score,
			score_config
		);

		this.game_over = false;

		score_config.fixedWidth = 0;
		
		this.clock = this.time.delayedCall(1000, () => {
			this.add.text(
				game.config.width / 2,
				game.config.height / 2,
				'GAME OVER',
				score_config
			).setOrigin(0.5, 0);

			this.add.text(
				game.config.width / 2,
				game.config.height / 2 + 64,
				'PRESS (R) TO RESTART.',
				score_config
			).setOrigin(0.5, 0);

			this.game_over = true;
		});
	}

	update() {
		if(this.game_over && Phaser.Input.Keyboard.JustDown(key_reset)) {
			this.scene.restart();
		}

		this.starfield.tilePositionX -= 4;

		if(this.game_over) {
			return;
		}

		this.rocket.update();

		for(let i = 0; i < this.ships.length; i++) {
			if(this.ships[i]) {
				this.ships[i].update();

				if(this.check_collision(this.rocket, this.ships[i])) {
					this.rocket.reset();
					this.ship_explode(this.ships[i]);
				}
			}
		}
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

	ship_explode(ship) {
		ship.alpha = 0;

		let explosion_sprite = this.add.sprite(ship.x, ship.y, 'ship_explosion').setOrigin(0, 0);
		explosion_sprite.anims.play('ship_explode');
		explosion_sprite.on('animationcomplete', () => {
			ship.reset();
			ship.alpha = 1;
			explosion_sprite.destroy();
		});

		this.score += ship.points;
		this.score_text.text = this.score;
	}
}


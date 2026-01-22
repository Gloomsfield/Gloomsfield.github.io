class Game extends Phaser.Scene {
	constructor() {
		super('game_scene');
	}

	create() {
		this.cameras.main.setViewport(
			ui_border_size,
			ui_border_size * 3 + ui_border_padding,
			game.config.width - (2 * ui_border_size),
			game.config.height - (4 * ui_border_size) - ui_border_padding
		);

		this.planet = new Planet(this, 10.0);
		this.planet.setRenderToTexture('planet_texture');

		this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'planet_texture');

		this.rocket = new Rocket(
			this,
			{
				x: this.cameras.main.width / 2,
				y: this.cameras.main.height - ui_border_padding,
			},
		).setOrigin(0.5, 0);

		this.rocket.on('miss', () => {
			this.events.emit('alter-timer', -500);
		});

		this.ships = [
			new Spaceship(this, { x: 0, y: 175 }, 10).setOrigin(0, 0),
			new Spaceship(this, { x: 0, y: 125 }, 20).setOrigin(0, 0),
			new Spaceship(this, { x: 0, y: 75 }, 30).setOrigin(0, 0),
		];

		for(let ship of this.ships) {
			ship.on('explode', () => {
				this.events.emit('alter-timer', ship.points * 500);
				this.events.emit('alter-score', ship.points);
			});
		}
	}

	update(time, delta) {
		this.rocket.update();

		for(let ship of this.ships) {
			ship.update();

			if(this.check_collision(this.rocket, ship)) {
				this.rocket.reset();
				ship.explode();
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
}

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

		this.radius = 50.0;
		this.gravity = 10.0;

		this.camera_theta = 0.0;
		this.camera_goal_theta = 0.0;

		this.planet = new Planet(this, this.radius);
		this.planet.setRenderToTexture('planet_texture');

		this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'planet_texture');

		this.rocket = new Rocket(
			this,
			this.radius + 10,
			0
		).setOrigin(0.5, 0.5);

		this.rocket.on('miss', () => {
			this.events.emit('alter-timer', -500);
		});

		this.rocket.on('reframe', (theta) => {
			this.camera_goal_theta = theta;
		});

		this.ships = [
			new Spaceship(this, { x: 0, y: 175 }, 10).setOrigin(0.5, 0.5),
			new Spaceship(this, { x: 0, y: 125 }, 20).setOrigin(0.5, 0.5),
			new Spaceship(this, { x: 0, y: 75 }, 30).setOrigin(0.5, 0.5),
		];

		for(let ship of this.ships) {
			ship.on('explode', () => {
				this.events.emit('alter-timer', ship.points * 500);
				this.events.emit('alter-score', ship.points);

				this.ships.splice(this.ships.indexOf(ship), 1);
			});
		}

		this.last_delta = 16; // assume 60fps for first frame
	}

	update(time, delta) {
		this.last_delta = delta;

		this.rocket.update(time, delta, this.radius);

		for(let ship of this.ships) {
			this.apply_planetary_gravity(ship);
			ship.update();

			if(this.check_collision(this.rocket, ship)) {
				this.rocket.reset();
				ship.explode();
			}
		}

		this.camera_theta = interpolate_angle(this.camera_goal_theta, this.camera_theta, 0.5);
		
		this.cameras.main.setRotation(this.camera_theta);
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

	check_planet_collision(particle_pos) {
		if(particle_pos.x * particle_pos.x + particle_pos.y * particle_pos.y <= this.radius * this.radius) {
			return true;
		}

		return false;
	}

	apply_planetary_gravity(gameobject) {
		let gravity_dir = new Phaser.Math.Vector2(
			gameobject.body.x - this.cameras.main.width / 2,
			gameobject.body.y - this.cameras.main.height / 2,
		).normalize();

		gameobject.body.velocity.x -= gravity_dir.x * this.gravity * this.last_delta / 1000;
		gameobject.body.velocity.y -= gravity_dir.y * this.gravity * this.last_delta / 1000;
	}
}

